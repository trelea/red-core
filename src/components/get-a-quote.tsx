
import { PaperclipIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function GetAQuote() {
  return (
    <section id="quote" className="relative overflow-hidden bg-[#C70017]">
      {/* Background image overlay on right side */}
      <div
        className="absolute inset-0 bg-contain bg-right bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('/get-a-qupte-img.png')",
          maskImage:
            'linear-gradient(to left, black 40%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to left, black 40%, transparent 100%)',
        }}
      />
      {/* Gradient overlay: solid red left, fading right */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #C70017 2.4%, rgba(199, 0, 23, 0) 104%)',
        }}
      />

      <div className="container relative mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-[120px] lg:py-20 xl:px-[160px]">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:gap-16 xl:gap-24">
          {/* Left: Heading & Description */}
          <div className="flex w-full flex-col text-white lg:w-[387px] lg:shrink-0">
            <div className="flex flex-col gap-6">
              <h2 className="text-[32px] font-bold uppercase leading-none tracking-tight sm:text-[42px] lg:text-[53px]">
                Get a Quote
              </h2>
              <p className="text-[20px] font-normal sm:text-[24px] lg:text-[27.7px]">
                24/7 Fast Estimate
              </p>
            </div>

            <Separator className="my-8 bg-white/20" />

            <div className="mt-auto text-lg font-medium leading-[28px] text-white">
              <p>
                Project pricing depends on several factors, including concrete
                thickness, type of service required, scope of work, site
                conditions, and overall project complexity.
              </p>
              <br />
              <p>
                Submit your details and receive a quick, accurate calculation
                tailored to your project.
              </p>
            </div>
          </div>

          {/* Right: Form inside Card */}
          <Card className="w-full border-0 bg-transparent shadow-none">
            <CardContent className="p-0">
              <form className="flex flex-col gap-8">
                {/* Input Grid: 2 cols x 2 rows */}
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:gap-x-16 lg:gap-y-10">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="fullName"
                      className="text-base font-bold text-white/90"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="text-base font-bold text-white/90"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(000) 000-0000"
                      className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-base font-bold text-white/90"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="yourname@example.com"
                      className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="location"
                      className="text-base font-bold text-white/90"
                    >
                      Your location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="City, State"
                      className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="project"
                    className="text-base font-bold text-white/90"
                  >
                    Project details
                  </Label>
                  <Textarea
                    id="project"
                    placeholder="Describe your project"
                    className="h-[120px] resize-none sm:h-[150px] lg:h-[192px] rounded-none border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-white bg-transparent px-5 py-2.5 text-base font-medium text-white hover:bg-white/10 hover:text-white"
                  >
                    <PaperclipIcon className="size-5" />
                    Attach a photo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
