'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { inter, orbitron } from '@/lib/fonts';
import { scrollToSection } from '@/lib/scroll-to-section';
import { useQuoteDialog } from '@/components/quote-dialog-provider';
import { trackFormConversion, trackPhoneClick } from '@/lib/gtag';
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

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

type DayMode = 'today' | 'specific';
type TimeMode = 'asap' | 'within_hour' | 'specific';

interface CapturedFields {
  fullName: string;
  phone: string;
  email: string;
}

export default function Footer() {
  const { openQuote } = useQuoteDialog();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);

  const [callbackOpen, setCallbackOpen] = useState(false);
  const [captured, setCaptured] = useState<CapturedFields | null>(null);

  const [dayMode, setDayMode] = useState<DayMode>('today');
  const [specificDate, setSpecificDate] = useState<Date | undefined>(undefined);

  const [timeMode, setTimeMode] = useState<TimeMode>('asap');
  const [specificHour, setSpecificHour] = useState<string>('');
  const [specificMinute, setSpecificMinute] = useState<string>('');
  const [specificPeriod, setSpecificPeriod] = useState<'AM' | 'PM'>('AM');
  const [dateOpen, setDateOpen] = useState(false);

  const [dialogError, setDialogError] = useState<string | null>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  function resetCallbackState() {
    setDayMode('today');
    setSpecificDate(undefined);
    setTimeMode('asap');
    setSpecificHour('');
    setSpecificMinute('');
    setSpecificPeriod('AM');
    setDateOpen(false);
    setDialogError(null);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('idle');

    const form = e.currentTarget;
    setCaptured({
      fullName: (form.elements.namedItem('contactName') as HTMLInputElement)
        .value,
      phone: (form.elements.namedItem('contactPhone') as HTMLInputElement)
        .value,
      email: (form.elements.namedItem('contactEmail') as HTMLInputElement)
        .value,
    });
    setCallbackOpen(true);
  }

  async function submitWithCallback() {
    if (!captured) return;
    setDialogError(null);

    if (dayMode === 'specific' && !specificDate) {
      setDialogError('Please pick a date.');
      return;
    }
    const hourNum = parseInt(specificHour, 10);
    const minuteNum = parseInt(specificMinute, 10);
    if (timeMode === 'specific') {
      if (
        !specificHour ||
        Number.isNaN(hourNum) ||
        hourNum < 1 ||
        hourNum > 12
      ) {
        setDialogError('Please enter a valid hour (1–12).');
        return;
      }
      if (
        !specificMinute ||
        Number.isNaN(minuteNum) ||
        minuteNum < 0 ||
        minuteNum > 59
      ) {
        setDialogError('Please enter a valid minute (00–59).');
        return;
      }
      if (dayMode === 'today') {
        const now = new Date();
        const h24 =
          specificPeriod === 'PM'
            ? hourNum === 12
              ? 12
              : hourNum + 12
            : hourNum === 12
              ? 0
              : hourNum;
        const picked = new Date();
        picked.setHours(h24, minuteNum, 0, 0);
        if (picked.getTime() <= now.getTime()) {
          setDialogError(
            'That time has already passed today. Pick a later time or a different day.',
          );
          return;
        }
      }
    }

    setLoading(true);

    const callbackDay =
      dayMode === 'today'
        ? 'Today'
        : specificDate
          ? format(specificDate, 'PPP')
          : '';
    const callbackTime =
      timeMode === 'asap'
        ? 'As soon as possible'
        : timeMode === 'within_hour'
          ? 'Within the next hour'
          : `${hourNum}:${String(minuteNum).padStart(2, '0')} ${specificPeriod}`;

    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: captured.fullName,
          phone: captured.phone,
          email: captured.email,
          callbackDay,
          callbackTime,
        }),
      });

      if (res.ok) {
        setStatus('success');
        trackFormConversion();
        formRef.current?.reset();
        setCaptured(null);
        resetCallbackState();
        setCallbackOpen(false);
      } else {
        setStatus('error');
        setCallbackOpen(false);
      }
    } catch {
      setStatus('error');
      setCallbackOpen(false);
    } finally {
      setLoading(false);
    }
  }

  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="rounded-t-[28px] bg-[#f4f4f4] text-black sm:rounded-t-[46px]"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-[120px] 2xl:px-[160px]">
        {/* form (right) takes one half, everything else (left) the other half */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* left side */}
          <div className="order-2 flex flex-col sm:order-none">
            <div className="flex flex-col gap-10">
              {/* logo */}
              <div>
                <Link href="/" className="inline-block">
                  <Image
                    src="/logo.svg"
                    alt="Red Core Inc."
                    width={280}
                    height={39}
                    className="h-[32px] w-auto sm:h-[36px] lg:h-[40px]"
                    priority
                  />
                </Link>
              </div>

              {/* container with metadata and services */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
                {/* left column — contact metadata */}
                <ul className="flex min-w-0 flex-col gap-4 not-italic">
                  <li className="flex items-start gap-2.5">
                    <MapPinIcon className="mt-0.5 size-[19px] shrink-0 text-[#c70017]" />
                    <span className="text-base leading-normal">
                      321 Springfield St
                      <br />
                      Agawam, MA 01001
                    </span>
                  </li>
                  <li>
                    <a
                      href="mailto:redcoreusa@gmail.com"
                      className="flex items-center gap-2.5 text-base transition-colors hover:text-[#c70017]"
                    >
                      <MailIcon className="size-[17px] shrink-0 text-[#c70017]" />
                      <span className="break-all">redcoreusa@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+14136662026"
                      onClick={trackPhoneClick}
                      className="flex items-center gap-2.5 text-base transition-colors hover:text-[#c70017]"
                    >
                      <PhoneIcon className="size-4 shrink-0 text-[#c70017]" />
                      (413)-666-2026
                    </a>
                  </li>
                </ul>

                {/* right column — services / navigation */}
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const id = link.href.replace('/#', '');
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={(e) =>
                            id === 'quote'
                              ? (e.preventDefault(), openQuote())
                              : scrollToSection(e, id)
                          }
                          className="text-base text-black transition-colors hover:text-[#c70017]"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* follow us */}
              <div className="flex flex-col gap-4">
                <p className="text-[15.7px]">Follow us on Social media</p>
                <ul className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="block text-[#c70017] transition-colors hover:text-[#9a0012]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d={social.path} />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* copyright */}
            <div className="mt-12 lg:mt-auto lg:pt-12">
              <p className="text-base text-[#8a8989]">
                Copyrights © Red Core Company {year}
              </p>
            </div>
          </div>

          {/* right side — free consultation form */}
          <div className="order-1 flex flex-col justify-center rounded-[19px] bg-[rgba(225,225,225,0.63)] p-6 sm:order-none sm:p-8 sm:px-10 lg:p-12">
            <p className="text-2xl font-normal sm:text-3xl">Free consultation</p>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col gap-6"
            >
              <Input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="Full Name"
                required
                className="h-auto rounded-none border-0 border-b border-black/15 bg-transparent px-0 pb-3 text-base text-black shadow-none placeholder:text-[#717171] focus-visible:border-[#c70017] focus-visible:ring-0"
              />
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                placeholder="Phone Number"
                required
                className="h-auto rounded-none border-0 border-b border-black/15 bg-transparent px-0 pb-3 text-base text-black shadow-none placeholder:text-[#717171] focus-visible:border-[#c70017] focus-visible:ring-0"
              />
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="Email"
                required
                className="h-auto rounded-none border-0 border-b border-black/15 bg-transparent px-0 pb-3 text-base text-black shadow-none placeholder:text-[#717171] focus-visible:border-[#c70017] focus-visible:ring-0"
              />
              {status === 'error' && (
                <span className="text-sm font-medium text-[#c70017]">
                  Something went wrong. Try again.
                </span>
              )}
              <div className="mt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-auto w-full rounded-tl-[40px] rounded-tr-[40px] rounded-br-[44px] rounded-bl-[44px] bg-[#c70017] px-8 py-3 text-sm font-medium uppercase text-white shadow-sm transition-colors hover:bg-[#9a0012] disabled:opacity-50 sm:w-auto sm:min-w-[150px]"
                >
                  {loading ? 'Sending...' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Callback preference dialog */}
      <Dialog
        open={callbackOpen}
        onOpenChange={(open) => {
          if (!loading) {
            setCallbackOpen(open);
            if (!open) resetCallbackState();
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className={cn(
            inter.className,
            orbitron.variable,
            'flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-white p-0 shadow-2xl sm:max-w-[720px]',
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[13px] font-normal uppercase tracking-[0.18em] text-black">
                When to call
              </span>
              <DialogTitle className="mt-5 text-[22px] font-bold uppercase leading-[1.05] tracking-tight text-[#1E2C32] [font-family:var(--font-orbitron),sans-serif] sm:text-[26px]">
                Pick a day &amp; time
              </DialogTitle>
              <DialogDescription className="mt-2 text-[14px] leading-snug text-[#5b5b5b]">
                Choose when works best and we&apos;ll reach out.
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => {
                if (loading) return;
                setCallbackOpen(false);
                resetCallbackState();
              }}
              aria-label="Close"
              className="-mr-1 shrink-0 rounded-none p-2 text-[#1E2C32]/50 transition-colors hover:bg-[#ededed] hover:text-[#1E2C32] focus:outline-none focus:ring-2 focus:ring-[#c70017]/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-7 px-6 py-7 sm:px-8">
            {/* Day */}
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E2C32]">
                <CalendarIcon className="size-3.5 text-[#C70017]" />
                Day
              </span>
              <div
                className="grid grid-cols-2 gap-2"
                role="radiogroup"
                aria-label="Day"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={dayMode === 'today'}
                  onClick={() => {
                    setDayMode('today');
                    setDialogError(null);
                  }}
                  className={cn(
                    'flex cursor-pointer items-center justify-center gap-2 rounded-none border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
                    dayMode === 'today'
                      ? 'border-[#C70017] bg-[#C70017] text-white'
                      : 'border-[#1E2C32]/15 text-[#1E2C32]/70 hover:border-[#C70017]/50 hover:text-[#1E2C32]',
                  )}
                >
                  Today
                </button>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={dayMode === 'specific'}
                      onClick={() => {
                        setDayMode('specific');
                        setDialogError(null);
                      }}
                      className={cn(
                        'flex cursor-pointer items-center justify-center gap-2 rounded-none border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
                        dayMode === 'specific'
                          ? 'border-[#C70017] bg-[#C70017] text-white'
                          : 'border-[#1E2C32]/15 text-[#1E2C32]/70 hover:border-[#C70017]/50 hover:text-[#1E2C32]',
                      )}
                    >
                      <CalendarIcon className="size-4" />
                      {dayMode === 'specific' && specificDate
                        ? format(specificDate, 'PPP')
                        : 'Pick a Date'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden rounded-none p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={specificDate}
                      captionLayout="dropdown"
                      defaultMonth={specificDate}
                      onSelect={(d) => {
                        setSpecificDate(d);
                        setDialogError(null);
                        setDateOpen(false);
                      }}
                      disabled={{ before: today }}
                      className="[--cell-size:2.25rem] p-3"
                      classNames={{
                        month_caption:
                          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) gap-2',
                        dropdowns:
                          'flex h-(--cell-size) w-full items-center justify-center gap-4 text-sm font-medium',
                        dropdown_root:
                          'relative rounded-md border border-input shadow-xs px-1 has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50',
                        caption_label:
                          'flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-semibold text-[#1E2C32] select-none [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E2C32]">
                <ClockIcon className="size-3.5 text-[#C70017]" />
                Time
              </span>
              <div
                className="flex flex-col gap-2"
                role="radiogroup"
                aria-label="Time"
              >
                {[
                  { value: 'asap', label: 'As Soon As Possible' },
                  { value: 'within_hour', label: 'Within the Next Hour' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={timeMode === opt.value}
                    onClick={() => {
                      setTimeMode(opt.value as TimeMode);
                      setDialogError(null);
                    }}
                    className={cn(
                      'flex cursor-pointer items-center justify-center gap-2 rounded-none border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
                      timeMode === opt.value
                        ? 'border-[#C70017] bg-[#C70017] text-white'
                        : 'border-[#1E2C32]/15 text-[#1E2C32]/70 hover:border-[#C70017]/50 hover:text-[#1E2C32]',
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
                <div
                  role="radio"
                  aria-checked={timeMode === 'specific'}
                  tabIndex={0}
                  onClick={() => {
                    if (timeMode !== 'specific') {
                      setTimeMode('specific');
                      setDialogError(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTimeMode('specific');
                      setDialogError(null);
                    }
                  }}
                  className={cn(
                    'cursor-pointer rounded-none border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C70017]/40',
                    timeMode === 'specific'
                      ? 'border-[#C70017] bg-[#C70017] text-white'
                      : 'border-[#1E2C32]/15 text-[#1E2C32]/70 hover:border-[#C70017]/50 hover:text-[#1E2C32]',
                  )}
                >
                  {timeMode !== 'specific' ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
                      <ClockIcon className="size-4 shrink-0" />
                      Specific Time
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-between gap-3 px-4 py-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                        <ClockIcon className="size-3.5" />
                        Specific
                      </div>
                      <div className="flex items-center gap-1">
                        <Input
                          ref={hourInputRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="HH"
                          value={specificHour}
                          onChange={(e) => {
                            const v = e.target.value
                              .replace(/\D/g, '')
                              .slice(0, 2);
                            setSpecificHour(v);
                            setDialogError(null);
                            if (v.length === 1 && parseInt(v, 10) > 1) {
                              setSpecificHour(`0${v}`);
                              minuteInputRef.current?.focus();
                            } else if (v.length === 2) {
                              minuteInputRef.current?.focus();
                            }
                          }}
                          onBlur={(e) => {
                            const v = e.target.value;
                            if (v.length === 1)
                              setSpecificHour(v.padStart(2, '0'));
                          }}
                          className="h-7 w-10 rounded-none border-0 border-b border-white/60 bg-transparent px-0 text-center text-base font-semibold text-white tabular-nums shadow-none placeholder:text-white/80 focus-visible:border-white focus-visible:ring-0"
                          aria-label="Hour"
                        />
                        <span className="text-base font-semibold text-white/50">
                          :
                        </span>
                        <Input
                          ref={minuteInputRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="MM"
                          value={specificMinute}
                          onChange={(e) => {
                            const v = e.target.value
                              .replace(/\D/g, '')
                              .slice(0, 2);
                            setSpecificMinute(v);
                            setDialogError(null);
                            if (v.length === 1 && parseInt(v, 10) > 5) {
                              setSpecificMinute(`0${v}`);
                            }
                          }}
                          onBlur={(e) => {
                            const v = e.target.value;
                            if (v.length === 1)
                              setSpecificMinute(v.padStart(2, '0'));
                          }}
                          className="h-7 w-10 rounded-none border-0 border-b border-white/60 bg-transparent px-0 text-center text-base font-semibold text-white tabular-nums shadow-none placeholder:text-white/80 focus-visible:border-white focus-visible:ring-0"
                          aria-label="Minute"
                        />
                        <div className="ml-2 inline-flex h-7 items-center rounded-full bg-white/15 p-0.5 text-[10px] font-bold uppercase tracking-[0.1em]">
                          {(['AM', 'PM'] as const).map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                setSpecificPeriod((prev) =>
                                  prev === p ? (p === 'AM' ? 'PM' : 'AM') : p,
                                );
                                setDialogError(null);
                              }}
                              className={cn(
                                'inline-flex h-6 items-center justify-center rounded-full px-2.5 transition-colors',
                                specificPeriod === p
                                  ? 'bg-white text-[#C70017] shadow-sm'
                                  : 'text-white/70 hover:text-white',
                              )}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {dialogError && (
              <p
                className="rounded-none border-l-4 border-[#C70017] bg-[#C70017]/5 px-3 py-2 text-sm font-medium text-[#C70017]"
                role="alert"
              >
                {dialogError}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[#e0e0e0] bg-[#fafafa] px-6 py-5 sm:px-8">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="rounded-none border-[#1E2C32]/25 px-6 font-semibold uppercase tracking-wide text-[#1E2C32] hover:bg-[#1E2C32]/5"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={submitWithCallback}
              disabled={loading}
              className="rounded-none bg-[#c70017] px-7 font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#9a0012] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Confirm & Send'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={status === 'success'}
        onOpenChange={(open) => !open && setStatus('idle')}
      >
        <DialogContent
          className={cn(
            inter.className,
            orbitron.variable,
            'overflow-hidden rounded-none border-0 bg-white text-[#1E2C32] sm:max-w-md',
          )}
        >
          <DialogHeader className="items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#c70017]/10">
              <CheckCircleIcon className="size-8 text-[#c70017]" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold uppercase tracking-tight text-[#1E2C32] [font-family:var(--font-orbitron),sans-serif]">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-base text-[#5b5b5b]">
              Your consultation request has been received. We&apos;ll get in
              touch with you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-center">
            <DialogClose asChild>
              <Button className="rounded-none bg-[#c70017] px-8 py-3 text-sm font-bold uppercase text-white hover:bg-[#9a0012]">
                Got it
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
