import { homeFaq } from './faqs';
import { siteConfig } from './siteConfig';
import { tools, toolDownloadUrl } from './toolCatalog';
import { PREVIEW_CHAPTERS, WELCOME_DURATION } from './welcomeVideo';

interface PageInfo {
  name: string;
  description: string;
  path: string;
}

type Questions = readonly { question: string; answer: string }[];

const base = siteConfig.origin;

function faqSection(url: string, questions: Questions) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    isPartOf: { '@id': `${url}#webpage` },
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function generateFeatureSchema({
  name,
  description,
  path,
  questions,
}: PageInfo & { questions?: Questions }) {
  const url = `${base}${path}`;
  const page = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${base}/#website` },
    about: { '@id': `${base}/#software` },
    publisher: { '@id': `${base}/#organization` },
  };
  if (!questions) return { '@context': 'https://schema.org', ...page };

  const breadcrumbs = [
    { name: 'Cosmocrat OS', item: `${base}/` },
    { name: 'Governance architecture', item: `${base}/platform` },
    { name, item: url },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...page,
        hasPart: { '@id': `${url}#faq` },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
      },
      faqSection(url, questions),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          ...item,
        })),
      },
    ],
  };
}

export function generateHomeWebPage({ name, description }: Pick<PageInfo, 'name' | 'description'>) {
  const url = `${base}/`;
  const videoId = `${url}#welcome-video`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { '@id': `${url}#website` },
        about: { '@id': `${url}#organization` },
        publisher: { '@id': `${url}#organization` },
        hasPart: { '@id': `${url}#faq` },
        video: { '@id': videoId },
      },
      faqSection(url, homeFaq),
      {
        '@type': 'VideoObject',
        '@id': videoId,
        name: 'Cosmocrat OS introduction',
        description:
          'A silent introduction to the independent Orion tools, Starter previews, and their operating boundaries.',
        contentUrl: `${base}/media/cosmocrat/cosmocrat-welcome-desktop.mp4`,
        thumbnailUrl: `${base}/media/cosmocrat/cosmocrat-welcome-desktop.jpg`,
        // The published MP4 first entered the public repository in PR #17.
        uploadDate: '2026-10-30T19:57:44-07:00',
        duration: `PT${WELCOME_DURATION}S`,
        inLanguage: 'en',
        hasPart: PREVIEW_CHAPTERS.map(({ title, start, end }) => ({
          '@type': 'Clip',
          name: title,
          startOffset: start,
          endOffset: end,
          url: `${url}?t=${start}`,
        })),
      },
    ],
  };
}

export function generateToolCatalogSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${base}/tools#webpage`,
      url: `${base}/tools`,
      name: 'The Orion tools',
      isPartOf: { '@id': `${base}/#website` },
      about: { '@id': `${base}/#organization` },
      publisher: { '@id': `${base}/#organization` },
      mainEntity: { '@id': `${base}/tools#collection` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${base}/tools#collection`,
      name: 'Independent Orion tools and profiles',
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => {
        const url = `${base}/tools#${tool.id}`;
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url,
          item: {
            '@type': 'SoftwareApplication',
            '@id': url,
            url,
            name: tool.name,
            description: `${tool.status}. ${tool.description} ${tool.boundary}`,
            applicationCategory: 'DeveloperApplication',
            applicationSubCategory: tool.kind,
            softwareRequirements: tool.environment,
            softwareVersion: tool.release ? tool.version : undefined,
            license: tool.license,
            downloadUrl: toolDownloadUrl(tool),
            releaseNotes: tool.release,
            subjectOf: { '@type': 'SoftwareSourceCode', codeRepository: tool.source },
          },
        };
      }),
    },
  ];
}
