import { createClient } from '@supabase/supabase-js';

let _client: ReturnType<typeof createClient> | null = null;
const mockWaitlistEmails = new Set<string>();

function createMockSupabaseClient() {
  return {
    from: (table: string) => ({
      insert: async (row: Record<string, unknown>) => {
        if (table === 'waitlist_signups') {
          const emailNorm = typeof row.email_norm === 'string' ? row.email_norm : '';
          if (emailNorm && mockWaitlistEmails.has(emailNorm)) {
            return { error: { code: '23505', message: 'duplicate key value violates unique constraint' } };
          }
          if (emailNorm) {
            mockWaitlistEmails.add(emailNorm);
          }
        }
        return { error: null };
      },
    }),
  } as unknown as ReturnType<typeof createClient>;
}

export function supabaseAdmin() {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('[AI Studio] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — using in-memory waitlist mock');
    _client = createMockSupabaseClient();
    return _client;
  }

  _client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return _client;
}
