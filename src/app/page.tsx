import Hero from '@/components/v1/Hero';
import Narrative from '@/components/v1/Narrative';
import SeoSpine from '@/components/v1/SeoSpine';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'The AI Operating System for Governed Memory and Controlled Execution',
  description:
    'Cosmocrat is the AI Operating System for governed memory and controlled execution. It runs in your environment to enforce fail-closed AI execution, runtime governance, and audit-grade run records.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Narrative />
      <SeoSpine />
    </>
  );
}
