import { renderSocialCard } from '@/lib/socialCardImage';
import { socialCards } from '@/lib/socialCards';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return socialCards.map(({ slug }) => ({ topic: slug }));
}

export async function GET(_request: Request, context: { params: Promise<{ topic: string }> }) {
  const { topic } = await context.params;
  const card = socialCards.find(({ slug }) => slug === topic);
  if (!card) return new Response(null, { status: 404 });
  return renderSocialCard(card.title, card.subtitle);
}
