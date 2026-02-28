import type { Metadata } from 'next';
import Hero from '@/components/hero';
import GetAQuote from '@/components/get-a-quote';

export const metadata: Metadata = {
  title: 'Small Demolition',
  description:
    'Controlled removal of concrete sections without damaging surrounding structures. Clean and safe process for renovations and repairs.',
};

export default function SmallDemolationPage() {
  return (
    <>
      <Hero
        variant="simple"
        title={
          <>
            <span className="font-bold">Small</span>
            <br />
            <span className="font-bold">demolition</span>
          </>
        }
        description={
          <>
            <p>
              Controlled removal of concrete sections without damaging
              surrounding structures. Clean and safe process for renovations and
              repairs.
            </p>
            <p className="mt-6">
              <strong>Includes:</strong> concrete breaking, section removal,
              surface demolition, and debris cleanup options.
            </p>
          </>
        }
        image={{
          src: '/small-demolation-img.png',
          alt: 'Small demolition of concrete structure',
        }}
      />
      <GetAQuote />
    </>
  );
}
