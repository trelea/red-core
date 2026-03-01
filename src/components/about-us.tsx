import Image from 'next/image';
import {
  FocusIcon,
  LayoutGridIcon,
  MapPinIcon,
  MapIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const gridItems = (
  <>
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex gap-4 p-0">
        <FocusIcon className="size-[21px] shrink-0 text-white" />
        <p className="text-[14px] font-normal leading-normal text-white sm:text-[16px] lg:text-[18px] xl:text-[20px]">
          We focus on fast response, clean work, and fair pricing
          for both residential and commercial projects.
        </p>
      </CardContent>
    </Card>
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex gap-4 p-0">
        <LayoutGridIcon className="size-[21px] shrink-0 text-white" />
        <p className="text-[14px] font-normal leading-normal text-white sm:text-[16px] lg:text-[18px] xl:text-[20px]">
          Our mission is to deliver precise results and make every
          project smooth and stress-free for our clients.
        </p>
      </CardContent>
    </Card>
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex gap-4 p-0">
        <MapPinIcon className="size-[15px] shrink-0 text-[#C70017]" />
        <div className="text-[14px] leading-normal text-white sm:text-[16px] lg:text-[18px] xl:text-[20px]">
          <p>Our location:</p>
          <p className="font-bold">467 Silver Street, Agawam, WA</p>
        </div>
      </CardContent>
    </Card>
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex gap-4 p-0">
        <MapIcon className="size-[17px] shrink-0 text-[#C70017]" />
        <p className="text-[14px] leading-normal text-white sm:text-[16px] lg:text-[18px] xl:text-[20px]">
          We proudly serve clients across{' '}
          <span className="font-bold">MA, CT,</span> and{' '}
          <span className="font-bold">VT</span>.
        </p>
      </CardContent>
    </Card>
  </>
);

export default function AboutUs() {
  return (
    <section id="about" className="bg-[#1E2C32]">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-[120px] lg:py-20 xl:px-[160px]">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16 lg:gap-24 xl:gap-[80px]">
          {/* Left Content */}
          <div className="flex w-full flex-col gap-6 text-white md:flex-1 xl:gap-16">
            <h2 className="text-[20px] font-bold sm:text-[24px] lg:text-[28px] xl:text-[32px]">About us</h2>
            <p className="text-[18px] font-normal leading-normal sm:text-[20px] lg:text-[24px] xl:text-[28px]">
              Redcore Concrete Services is a reliable team specializing in
              professional concrete cutting and core drilling across New
              England.
            </p>

            {/* Grid inside left col — visible only on xl+ */}
            <div className="hidden grid-cols-2 gap-12 xl:grid xl:gap-[50px]">
              {gridItems}
            </div>
          </div>

          {/* Right: Image — hidden on small, visible md+ */}
          <div className="relative hidden w-full md:block md:flex-1">
            <Image
              src="/about-us-img.png"
              alt="Red Core service van with New England map"
              width={651}
              height={577}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Grid full width — visible only below xl */}
        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-8 lg:gap-12 xl:hidden">
          {gridItems}
        </div>

        {/* Image at bottom — visible only on small, hidden md+ */}
        <div className="mt-10 md:hidden">
          <Image
            src="/about-us-img.png"
            alt="Red Core service van with New England map"
            width={651}
            height={577}
            className="mx-auto h-auto w-3/4 object-contain sm:w-4/5"
          />
        </div>
      </div>
    </section>
  );
}
