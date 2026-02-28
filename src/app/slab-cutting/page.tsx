import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';

export const metadata: Metadata = {
  title: 'Slab Cutting',
  description:
    'Cutting concrete slabs and floors to access underground pipes or utilities. Ideal for plumbing repairs, drain replacement, and basement modifications.',
};

export default function SlabCuttingPage() {
  return (
    <>
      <Hero
        variant="simple"
        title={
          <>
            <span className="font-bold">Slab</span>
            <br />
            <span className="font-bold">cutting</span>
          </>
        }
        description={
          <>
            <p>
              Cutting concrete slabs and floors to access underground pipes or
              utilities. Ideal for{' '}
              <strong>plumbing repairs, drain replacement</strong>, and{' '}
              <strong>basement modifications</strong>.
            </p>
            <p className="mt-6">
              <strong>Includes:</strong> trench cutting, pipe access openings,
              and floor removal sections.
            </p>
          </>
        }
        image={{
          src: '/slab-cutting-img.png',
          alt: 'Slab cutting with walk-behind concrete saw',
        }}
      />
      <GetAQuote />
    </>
  );
}
