'use client';

import { useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import {
  PaperclipIcon,
  CheckCircleIcon,
  XIcon,
  CalendarIcon,
  ClockIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { inter, montserrat, microgramma } from '@/lib/fonts';
import { trackFormConversion } from '@/lib/gtag';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

type DayMode = 'today' | 'specific';
type TimeMode = 'asap' | 'within_hour' | 'specific';

interface CapturedFields {
  fullName: string;
  phone: string;
  email: string;
  offer: string;
  service: string;
  message: string;
}

const SERVICE_OPTIONS = [
  'Concrete Openings & Wall Sawing',
  'Core Drilling',
  'Slab / Foundation Cutting',
  'Demolition & Cutting',
];

const OFFER_OPTIONS = [
  'Concrete Openings & Wall Sawing — $1,000 Flat / Special Offer',
  'Core Drilling — Volume Pricing',
  'Foundation Cutting — 50% Off Debris Loading',
  'Demolition — 30% Off + Free Cleanup',
];

interface GetAQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Underline-style field used across the screenshot layout
const fieldClass =
  'h-auto rounded-none border-0 border-b border-black/30 bg-transparent px-0 py-3 text-[16px] font-normal text-black shadow-none placeholder:text-black/45 focus-visible:border-black focus-visible:ring-0';

export default function GetAQuoteDialog({ open, onOpenChange }: GetAQuoteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);

  const [offer, setOffer] = useState('');
  const [service, setService] = useState('');

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

  function resetForm() {
    formRef.current?.reset();
    setFiles([]);
    setOffer('');
    setService('');
    setCaptured(null);
    resetCallbackState();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function openPreview(file: File) {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { url: URL.createObjectURL(file), name: file.name };
    });
  }

  function closePreview() {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('idle');

    const form = e.currentTarget;
    setCaptured({
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      offer,
      service,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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
      if (!specificHour || Number.isNaN(hourNum) || hourNum < 1 || hourNum > 12) {
        setDialogError('Please enter a valid hour (1–12).');
        return;
      }
      if (!specificMinute || Number.isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
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
          setDialogError('That time has already passed today. Pick a later time or a different day.');
          return;
        }
      }
    }

    setLoading(true);

    const callbackDay =
      dayMode === 'today' ? 'Today' : specificDate ? format(specificDate, 'PPP') : '';
    const callbackTime =
      timeMode === 'asap'
        ? 'As soon as possible'
        : timeMode === 'within_hour'
          ? 'Within the next hour'
          : `${hourNum}:${String(minuteNum).padStart(2, '0')} ${specificPeriod}`;

    const formData = new FormData();
    formData.append('fullName', captured.fullName);
    formData.append('phone', captured.phone);
    formData.append('email', captured.email);
    formData.append('offer', captured.offer);
    formData.append('service', captured.service);
    formData.append('message', captured.message);
    formData.append('callbackDay', callbackDay);
    formData.append('callbackTime', callbackTime);
    files.forEach((file) => formData.append('images', file));

    try {
      const res = await fetch('/api/get-a-quote', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        trackFormConversion();
        resetForm();
        setCallbackOpen(false);
        onOpenChange(false);
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

  return (
    <>
      {/* Main quote form dialog */}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (loading) return;
          onOpenChange(next);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className={cn(
            inter.className,
            'flex max-h-[92vh] w-[calc(100vw-24px)] flex-col gap-0 overflow-y-auto rounded-none border-0 bg-[#e9e9e9] p-0 text-black shadow-2xl sm:max-w-[1142px]',
          )}
        >
          <DialogDescription className="sr-only">
            Request a same-day quote for concrete cutting and core drilling services.
          </DialogDescription>

          <div className="relative px-6 py-8 sm:px-20 sm:pt-11 sm:pb-16">
            {/* Close */}
            <DialogClose
              aria-label="Close"
              className="absolute right-5 top-5 rounded-md p-2 text-black/70 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:right-8 sm:top-8"
            >
              <XIcon className="size-6" />
            </DialogClose>

            {/* Title — Montserrat SemiBold 55px / 64px line-height */}
            <DialogTitle
              className={cn(
                montserrat.className,
                'text-[24px] font-semibold leading-[1.1] tracking-[0] text-black sm:text-[55px] sm:leading-[64px]',
              )}
            >
              Get a Same-Day Quote
            </DialogTitle>
            <span className="mt-4 block h-[3px] w-12 bg-[#C70017]" />

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-7 grid grid-cols-1 gap-x-11 gap-y-8 lg:grid-cols-2 lg:items-start"
            >
              {/* Left column: contact + selects */}
              <div className="flex flex-col gap-5">
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Full Name"
                  className={fieldClass}
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className={fieldClass}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className={fieldClass}
                />

                <Select value={offer} onValueChange={setOffer}>
                  <SelectTrigger
                    aria-label="Select special offer"
                    className={cn(
                      fieldClass,
                      'w-full justify-between data-[placeholder]:text-black/45 [&>svg]:opacity-60',
                    )}
                  >
                    <SelectValue placeholder="Select special offer" />
                  </SelectTrigger>
                  <SelectContent>
                    {OFFER_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={service} onValueChange={setService}>
                  <SelectTrigger
                    aria-label="Select service"
                    className={cn(
                      fieldClass,
                      'w-full justify-between data-[placeholder]:text-black/45 [&>svg]:opacity-60',
                    )}
                  >
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Right column: message + actions */}
              <div className="flex flex-col gap-5">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="h-[240px] resize-none rounded-none border border-black/40 bg-transparent px-4 py-3 text-[16px] font-normal text-black shadow-none placeholder:text-black/45 focus-visible:border-black focus-visible:ring-0 sm:h-[300px]"
                />

                {/* File previews */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, i) => (
                      <div
                        key={`${file.name}-${i}`}
                        className="group flex items-center gap-2 rounded-none border border-black/20 bg-black/[0.03] px-3 py-1.5"
                      >
                        <button
                          type="button"
                          onClick={() => openPreview(file)}
                          title="Click to preview"
                          className="flex min-w-0 items-center gap-2 text-left transition-colors hover:text-[#C70017]"
                        >
                          <PaperclipIcon className="size-3.5 shrink-0 text-black/50" />
                          <span className="max-w-[120px] truncate text-sm text-black/80 group-hover:text-current">
                            {file.name}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="ml-1 shrink-0 text-black/40 transition-colors hover:text-black"
                        >
                          <XIcon className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                {status === 'error' && (
                  <span className="text-sm font-medium text-[#C70017]">Something went wrong. Try again.</span>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    disabled={files.length >= 5}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-none border border-black/40 px-3 py-2.5 text-[13px] font-normal text-black/70 transition-colors hover:bg-black/[0.04] hover:text-black disabled:opacity-40 sm:px-5 sm:py-3.5 sm:text-[15px]"
                  >
                    <PaperclipIcon className="size-4" />
                    {files.length > 0 ? `${files.length}/5 photos` : 'Attach a photo'}
                  </button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-auto w-full rounded-none bg-[#C70017] px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#a80014] disabled:opacity-50 sm:px-9 sm:py-3.5 sm:text-[15px]"
                  >
                    {loading ? 'Sending...' : 'Send'}
                    <ArrowUpRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

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
            microgramma.variable,
            'flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-white p-0 shadow-2xl sm:max-w-[720px]',
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center rounded-full bg-[#ededed] px-5 py-2.5 text-[13px] font-normal uppercase tracking-[0.18em] text-black">
                When to call
              </span>
              <DialogTitle className="mt-5 text-[22px] font-bold uppercase leading-[1.05] tracking-tight text-[#1E2C32] [font-family:var(--font-microgramma),sans-serif] sm:text-[26px]">
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
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Day">
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
                  <PopoverContent className="w-auto overflow-hidden rounded-none p-0" align="start">
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
              <div className="flex flex-col gap-2" role="radiogroup" aria-label="Time">
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
                            const v = e.target.value.replace(/\D/g, '').slice(0, 2);
                            setSpecificHour(v);
                            setDialogError(null);
                            // auto-pad single digit > 1 (e.g. "2" → "02") and advance focus
                            if (v.length === 1 && parseInt(v, 10) > 1) {
                              setSpecificHour(`0${v}`);
                              minuteInputRef.current?.focus();
                            } else if (v.length === 2) {
                              minuteInputRef.current?.focus();
                            }
                          }}
                          onBlur={(e) => {
                            const v = e.target.value;
                            if (v.length === 1) setSpecificHour(v.padStart(2, '0'));
                          }}
                          className="h-7 w-10 rounded-none border-0 border-b border-white/60 bg-transparent px-0 text-center text-base font-semibold text-white tabular-nums shadow-none placeholder:text-white/80 focus-visible:border-white focus-visible:ring-0"
                          aria-label="Hour"
                        />
                        <span className="text-base font-semibold text-white/50">:</span>
                        <Input
                          ref={minuteInputRef}
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          placeholder="MM"
                          value={specificMinute}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 2);
                            setSpecificMinute(v);
                            setDialogError(null);
                            // auto-pad single digit > 5 (minutes max 59) so 6-9 become 06-09
                            if (v.length === 1 && parseInt(v, 10) > 5) {
                              setSpecificMinute(`0${v}`);
                            }
                          }}
                          onBlur={(e) => {
                            const v = e.target.value;
                            if (v.length === 1) setSpecificMinute(v.padStart(2, '0'));
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
                                setSpecificPeriod((prev) => (prev === p ? (p === 'AM' ? 'PM' : 'AM') : p));
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

      {/* Image preview lightbox */}
      <Dialog open={!!preview} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[92vh] w-fit max-w-[92vw] flex-col gap-0 overflow-hidden rounded-none border-0 bg-black/90 p-0 shadow-2xl"
        >
          <DialogTitle className="sr-only">{preview?.name ?? 'Image preview'}</DialogTitle>
          <DialogClose
            aria-label="Close preview"
            className="absolute right-3 top-3 z-10 rounded-md bg-black/40 p-2 text-white/80 transition-colors hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <XIcon className="size-5" />
          </DialogClose>
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview.url}
              alt={preview.name}
              className="max-h-[92vh] max-w-[92vw] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
      <Dialog open={status === 'success'} onOpenChange={(open) => !open && setStatus('idle')}>
        <DialogContent
          className={cn(
            inter.className,
            microgramma.variable,
            'overflow-hidden rounded-none border-0 bg-white text-[#1E2C32] sm:max-w-md',
          )}
        >
          <DialogHeader className="items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#c70017]/10">
              <CheckCircleIcon className="size-8 text-[#c70017]" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold uppercase tracking-tight text-[#1E2C32] [font-family:var(--font-microgramma),sans-serif]">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-base text-[#5b5b5b]">
              Your quote request has been sent successfully. Our team will review your project details and get back to you shortly.
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
    </>
  );
}
