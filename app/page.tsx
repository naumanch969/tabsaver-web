import { MainLayout } from '@/components/layout';
import { Hero, Features, CTA } from '@/components/landing';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <CTA />
    </MainLayout>
  );
}
