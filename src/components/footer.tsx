'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, PhoneIcon, MailIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { scrollToSection } from '@/lib/scroll-to-section';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

const navLinks = [
  { label: 'About us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Cooperations', href: '/#quote' },
  { label: 'Contacts', href: '/#contacts' },
];

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem('contactName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('contactPhone') as HTMLInputElement).value,
      email: (form.elements.namedItem('contactEmail') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
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
    <footer id="contacts" className="bg-[#1E2C32] text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-[120px] lg:py-20 xl:px-[160px]">
        {/* Logo */}
        <Link href="/" className="mb-12 inline-block lg:mb-24">
          <Image
            src="/logo.png"
            alt="Redcore"
            width={308}
            height={58}
            className="h-[40px] w-auto sm:h-[50px] lg:h-[58px]"
          />
        </Link>

        {/* 3-Column Layout */}
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr] lg:gap-12">
          {/* Left: Contact Info */}
          <div className="order-2 flex flex-col gap-6 lg:order-none">
            <div className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 size-[19px] shrink-0 text-[#7BB8D4]" />
              <span className="text-base leading-normal">
                321 Springfield St,
                <br />
                Agawam, MA
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+14136662026"
                className="flex items-center gap-2.5 text-base transition-colors hover:text-white/80"
              >
                <PhoneIcon className="size-4 shrink-0 text-[#7BB8D4]" />
                (413)-666-2026
              </a>
              <a
                href="mailto:redcoreusa@gmail.com"
                className="flex items-center gap-2.5 text-base transition-colors hover:text-white/80"
              >
                <MailIcon className="size-[17px] shrink-0 text-[#7BB8D4]" />
                redcoreusa@gmail.com
              </a>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="order-3 flex flex-col gap-5 lg:order-none lg:pl-16">
            {navLinks.map((link) => {
              const id = link.href.replace('/#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, id)}
                  className="text-base text-white transition-colors hover:text-white/70"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Free Consultation Form */}
          <div className="order-1 flex flex-col gap-6 lg:order-none">
            <p className="text-base">Free consultation:</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="Full Name"
                required
                className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-base text-white placeholder:text-white/50 focus-visible:border-white focus-visible:ring-0"
              />
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                placeholder="Phone"
                required
                className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-base text-white placeholder:text-white/50 focus-visible:border-white focus-visible:ring-0"
              />
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="Email"
                required
                className="h-auto rounded-none border-0 border-b border-white/30 bg-transparent px-0 pb-3 text-base font-medium text-white placeholder:text-white/50 focus-visible:border-white focus-visible:ring-0"
              />
              {status === 'error' && (
                <span className="text-sm font-medium text-red-300">Something went wrong. Try again.</span>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-auto w-full rounded-sm bg-[#3A7A94] px-8 py-4 text-[14.6px] font-bold text-white shadow-sm hover:bg-[#4E96B0] disabled:opacity-50 lg:w-[184px]"
              >
                {loading ? 'SENDING...' : 'SUBMIT'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Row: Social + Submit */}
        <div className="mt-10 flex flex-col items-start gap-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-[15.7px]">Follow us on Social media</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#7BB8D4] transition-colors hover:text-[#A0D4EC]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#7BB8D4] transition-colors hover:text-[#A0D4EC]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-[#7BB8D4] transition-colors hover:text-[#A0D4EC]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#7BB8D4] transition-colors hover:text-[#A0D4EC]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>

      <Separator className="bg-white/10" />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-[120px] xl:px-[160px]">
        <p className="text-center text-base text-[#c9c9c9]">
          Copyrights @ Red Core Company {new Date().getFullYear()}
        </p>
      </div>
      <Dialog open={status === 'success'} onOpenChange={(open) => !open && setStatus('idle')}>
        <DialogContent className="border-0 bg-[#1E2C32] text-white sm:max-w-md">
          <DialogHeader className="items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#3A7A94]/20">
              <CheckCircleIcon className="size-8 text-[#7BB8D4]" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold uppercase tracking-tight">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-base text-white/70">
              Your consultation request has been received. We&apos;ll get in touch with you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-center">
            <DialogClose asChild>
              <Button className="bg-[#3A7A94] px-8 py-3 text-sm font-bold uppercase text-white hover:bg-[#4E96B0]">
                Got it
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
