'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  PaperclipIcon,
  CheckCircleIcon,
  XIcon,
  CalendarIcon,
  ClockIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { oswald, inter } from '@/lib/fonts';
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
  location: string;
  projectDetails: string;
}

export default function GetAQuote() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('idle');

    const form = e.currentTarget;
    setCaptured({
      fullName: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      projectDetails: (form.elements.namedItem('project') as HTMLTextAreaElement).value,
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
    formData.append('location', captured.location);
    formData.append('projectDetails', captured.projectDetails);
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
        formRef.current?.reset();
        setFiles([]);
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

            <div className="text-lg font-medium leading-[28px] text-white">
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
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
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
          className="flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-white p-0 shadow-2xl sm:max-w-[560px]"
        >
          {/* Brand header bar */}
          <div className="relative flex shrink-0 items-center justify-between gap-4 bg-[#1E2C32] px-4 py-3 sm:px-6 sm:py-3.5">
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C70017]/60 to-transparent" />
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo.svg"
                alt="Red Core"
                width={204}
                height={39}
                priority
                className="h-7 w-auto sm:h-[34px]"
              />
              <span className="hidden h-7 w-px bg-white/15 sm:block" />
              <div className="flex flex-col leading-none">
                <DialogTitle
                  className={cn(
                    oswald.className,
                    'text-lg font-bold uppercase tracking-[0.04em] text-white sm:text-xl',
                  )}
                >
                  When To Call
                </DialogTitle>
                <DialogDescription
                  className={cn(
                    inter.className,
                    'mt-1.5 hidden text-[13px] font-medium text-white/60 sm:block',
                  )}
                >
                  Pick a day and time and we&apos;ll reach out.
                </DialogDescription>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (loading) return;
                setCallbackOpen(false);
                resetCallbackState();
              }}
              aria-label="Close"
              className="shrink-0 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
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
          <div className={cn(inter.className, 'flex flex-col gap-7 bg-white px-5 py-6 sm:px-7 sm:py-7')}>
            {/* Day */}
            <div className="flex flex-col gap-3">
              <span
                className={cn(
                  oswald.className,
                  'flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E2C32]',
                )}
              >
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
                    'flex cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
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
                        'flex cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
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
                  <PopoverContent className="w-auto overflow-hidden rounded-sm p-0" align="start">
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
              <span
                className={cn(
                  oswald.className,
                  'flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E2C32]',
                )}
              >
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
                      'flex cursor-pointer items-center justify-center gap-2 rounded-sm border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors',
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
                    'cursor-pointer rounded-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C70017]/40',
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
                className="rounded-sm border-l-4 border-[#C70017] bg-[#C70017]/5 px-3 py-2 text-sm font-medium text-[#C70017]"
                role="alert"
              >
                {dialogError}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#1E2C32]/10 bg-[#F7F7F8] px-5 py-3 sm:px-7 sm:py-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                className="rounded-sm border-[#1E2C32]/25 px-5 font-semibold uppercase tracking-wide text-[#1E2C32] hover:bg-[#1E2C32]/5"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={submitWithCallback}
              disabled={loading}
              className="rounded-sm bg-[#C70017] px-7 font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#a80014] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Confirm & Send'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success dialog */}
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
