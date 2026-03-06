'use client';

import { useRef, useState } from 'react';
import { PaperclipIcon, CheckCircleIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

export default function GetAQuote() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData();
    formData.append('fullName', (form.elements.namedItem('fullName') as HTMLInputElement).value);
    formData.append('phone', (form.elements.namedItem('phone') as HTMLInputElement).value);
    formData.append('email', (form.elements.namedItem('email') as HTMLInputElement).value);
    formData.append('location', (form.elements.namedItem('location') as HTMLInputElement).value);
    formData.append('projectDetails', (form.elements.namedItem('project') as HTMLTextAreaElement).value);
    files.forEach((file) => formData.append('images', file));

    try {
      const res = await fetch('/api/get-a-quote', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setFiles([]);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

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
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                      name="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="h-auto rounded-md border border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
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
                      name="phone"
                      type="tel"
                      required
                      placeholder="(000) 000-0000"
                      className="h-auto rounded-md border border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
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
                      name="email"
                      type="email"
                      required
                      placeholder="yourname@example.com"
                      className="h-auto rounded-md border border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
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
                      name="location"
                      type="text"
                      required
                      placeholder="City, State"
                      className="h-auto rounded-md border border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
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
                    name="project"
                    required
                    placeholder="Describe your project"
                    className="h-[120px] resize-none sm:h-[150px] lg:h-[192px] rounded-md border-white bg-transparent px-6 py-5 text-lg font-medium text-white placeholder:text-white/65 focus-visible:border-white focus-visible:ring-0"
                  />
                </div>

                {/* File previews */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {files.map((file, i) => (
                      <div
                        key={`${file.name}-${i}`}
                        className="group relative flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-3 py-2"
                      >
                        <PaperclipIcon className="size-4 shrink-0 text-white/70" />
                        <span className="max-w-[120px] truncate text-sm text-white/90">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="ml-1 shrink-0 text-white/50 transition-colors hover:text-white"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      disabled={files.length >= 5}
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full border-white bg-transparent px-5 py-2.5 text-base font-medium text-white hover:bg-white/10 hover:text-white disabled:opacity-40"
                    >
                      <PaperclipIcon className="size-5" />
                      {files.length > 0 ? `${files.length}/5 photos` : 'Attach photos'}
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    {status === 'error' && (
                      <span className="text-sm font-medium text-white/80">Something went wrong. Try again.</span>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-auto rounded-sm bg-white px-10 py-4 text-[15px] font-bold uppercase text-[#C70017] shadow-sm hover:bg-white/90 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Submit'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={status === 'success'} onOpenChange={(open) => !open && setStatus('idle')}>
        <DialogContent className="border-0 bg-[#1E2C32] text-white sm:max-w-md">
          <DialogHeader className="items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#C70017]/10">
              <CheckCircleIcon className="size-8 text-[#C70017]" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold uppercase tracking-tight">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-base text-white/70">
              Your quote request has been sent successfully. Our team will review your project details and get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-center">
            <DialogClose asChild>
              <Button className="bg-[#C70017] px-8 py-3 text-sm font-bold uppercase text-white hover:bg-[#a80014]">
                Got it
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
