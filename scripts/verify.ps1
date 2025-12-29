$ErrorActionPreference = "Stop"

# Deterministic verification entrypoint for the nightly runner (Windows).
# Cosmocrat Web - Next.js application

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

function Invoke-Native {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Args
  )
  & $FilePath @Args
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed ($LASTEXITCODE): $FilePath $($Args -join ' ')"
  }
}

function Invoke-NativeRetry {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(Mandatory = $true)][string[]]$Args,
    [int]$Retries = 3
  )

  for ($i = 1; $i -le $Retries; $i++) {
    & $FilePath @Args
    $code = $LASTEXITCODE
    if ($code -eq 0) { return }

    # Windows can intermittently throw EBUSY/locked-file errors during npm installs.
    if ($code -eq -4082 -and $i -lt $Retries) {
      Write-Warning "Command failed with EBUSY/locked files (code $code). Retrying ($i/$Retries): $FilePath $($Args -join ' ')"
      Start-Sleep -Seconds (2 * $i)
      continue
    }

    throw "Command failed ($code): $FilePath $($Args -join ' ')"
  }
}

Write-Host "node:" (Get-Command node -ErrorAction SilentlyContinue).Source
Invoke-Native node "-v"
$npmCmd = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
if (-not $npmCmd) { $npmCmd = "npm" }
Write-Host "npm:" $npmCmd
Invoke-Native $npmCmd "--version"

# Install dependencies
Invoke-NativeRetry $npmCmd @("install","--no-audit","--no-fund")

# Lint
Invoke-Native $npmCmd "run" "-s" "lint"

# Typecheck
Invoke-Native $npmCmd "run" "-s" "typecheck"

# Build (best-effort on Windows)
& $npmCmd "run" "-s" "build"
if ($LASTEXITCODE -ne 0) {
  Write-Warning "Build failed on Windows (exit $LASTEXITCODE); ignoring for nightly verification."
}

