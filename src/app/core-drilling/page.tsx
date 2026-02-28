import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';

export const metadata: Metadata = {
  title: 'Core Drilling',
  description:
    'Precision drilling of perfectly round holes in concrete, brick, and stone. Used for pipes, cables, ventilation, and utility lines.',
};

export default function CoreDrillingPage() {
  return (
    <>
      <Hero
        variant="simple"
        title={
          <>
            <span className="font-bold">Core</span>
            <br />
            <span className="font-bold">drilling</span>
          </>
        }
        description={
          <>
            <p>
              Precision drilling of perfectly round holes in concrete, brick, and
              stone. Used for pipes, cables, ventilation, and utility lines.
            </p>
            <p className="mt-6">
              <strong>We drill for:</strong> plumbing lines, electrical
              conduits, HVAC openings, exhaust vents, and anchor holes.
            </p>
          </>
        }
        image={{
          src: '/core-drilling-img.png',
          alt: 'Core drilling into concrete wall',
        }}
      />
      <GetAQuote />
    </>
  );
}
