import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';

export const metadata: Metadata = {
  title: 'Wall Saw Cutting',
  description:
    'Heavy-duty cutting for doorways, windows, and large structural openings. Provides straight, smooth edges with minimal vibration.',
};

export default function WallSawCuttingPage() {
  return (
    <>
      <Hero
        variant="simple"
        title={
          <>
            <span className="font-bold">Wall saw</span>
            <br />
            <span className="font-bold">cutting</span>
          </>
        }
        description={
          <>
            <p>
              Heavy-duty cutting for doorways, windows, and large structural
              openings. Provides straight, smooth edges with minimal vibration.
            </p>
            <p className="mt-6">
              <strong>Used for:</strong> door openings, window enlargements, wall
              removals, and structural modifications.
            </p>
          </>
        }
        image={{
          src: '/wall-saw-cutting.png',
          alt: 'Wall saw cutting concrete structure',
        }}
      />
      <GetAQuote />
    </>
  );
}
