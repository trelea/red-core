import Image from 'next/image';
import {
  FocusIcon,
  LayoutGridIcon,
  MapPinIcon,
  MapIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutUs() {
  return (
    <section className="bg-[#1E2C32]">
      <div className="container mx-auto px-4 py-20 lg:px-[120px]">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-[80px]">
          {/* Left Content */}
          <div className="flex w-full flex-col gap-[150px] lg:w-[600px] lg:shrink-0">
            <div className="flex flex-col gap-[90px]">
              {/* Title & Description */}
              <div className="flex flex-col gap-6 text-white">
                <h2 className="text-[24px] font-bold">About us</h2>
                <p className="text-[24px] font-normal leading-normal">
                  Redcore Concrete Services is a reliable team specializing in
                  professional concrete cutting and core drilling across New
                  England.
                </p>
              </div>

              {/* Two Feature Cards */}
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-[38px]">
                <Card className="border-0 bg-transparent shadow-none">
                  <CardContent className="flex gap-4 p-0">
                    <FocusIcon className="size-[21px] shrink-0 text-white" />
                    <p className="text-[16px] font-normal leading-normal text-white">
                      We focus on fast response, clean work, and fair pricing
                      for both residential and commercial projects.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-transparent shadow-none">
                  <CardContent className="flex gap-4 p-0">
                    <LayoutGridIcon className="size-[21px] shrink-0 text-white" />
                    <p className="text-[16px] font-normal leading-normal text-white">
                      Our mission is to deliver precise results and make every
                      project smooth and stress-free for our clients.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="bg-white/10 sm:hidden" />

            {/* Bottom: Location & Service Area */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-[91px]">
              <div className="flex gap-4">
                <MapPinIcon className="size-[15px] shrink-0 text-[#C70017]" />
                <div className="text-[16px] leading-normal text-white">
                  <p>Our location:</p>
                  <p className="font-bold">467 Silver Street, Agawam, WA</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapIcon className="size-[17px] shrink-0 text-[#C70017]" />
                <p className="text-[16px] leading-normal text-white">
                  We proudly serve clients across{' '}
                  <span className="font-bold">MA, CT,</span> and{' '}
                  <span className="font-bold">VT</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative w-full lg:w-[651px] lg:shrink-0">
            <Image
              src="/about-us-img.png"
              alt="Red Core service van with New England map"
              width={651}
              height={577}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
