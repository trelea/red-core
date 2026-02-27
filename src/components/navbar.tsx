'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  MenuIcon,
  PhoneIcon,
  CircleDotIcon,
  AxeIcon,
  BrickWallIcon,
  HandIcon,
  HammerIcon,
  ChevronDownIcon,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const services = [
  {
    label: 'Core Drilling',
    href: '/core-drilling',
    description: 'Precision drilling of round holes in concrete, brick, and stone.',
    icon: CircleDotIcon,
  },
  {
    label: 'Slab Cutting',
    href: '/slab-cutting',
    description: 'Cutting concrete slabs to access underground pipes or utilities.',
    icon: AxeIcon,
  },
  {
    label: 'Wall Saw Cutting',
    href: '/wall-saw-cutting',
    description: 'Heavy-duty cutting for doorways, windows, and structural openings.',
    icon: BrickWallIcon,
  },
  {
    label: 'Hand Saw Cutting',
    href: '/hand-saw-cutting',
    description: 'Compact precision cutting for tight or indoor areas.',
    icon: HandIcon,
  },
  {
    label: 'Small Demolition',
    href: '/small-demolation',
    description: 'Controlled removal of concrete without damaging surroundings.',
    icon: HammerIcon,
  },
];

const navLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Get a quote', href: '/quote' },
  { label: 'Contacts', href: '/contacts' },
];

export default function Navbar() {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="w-full bg-[#1E2C32]">
      <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-[120px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Redcore"
            width={203}
            height={38}
            className="h-[38px] w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className="text-[15px] font-normal text-white transition-colors hover:bg-transparent hover:text-white/70 focus:bg-transparent"
                >
                  About us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-[15px] font-normal text-white hover:bg-transparent hover:text-white/70 focus:bg-transparent data-[state=open]:bg-transparent">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#1E2C32]/80 backdrop-blur-md">
                <div className="grid w-[650px] grid-cols-2 gap-1.5 p-3">
                  {services.map((service, i) => (
                    <NavigationMenuLink asChild key={service.href}>
                      <Link
                        href={service.href}
                        className={`group flex flex-col gap-2 rounded-lg p-3 text-left transition-all hover:bg-white/[0.07] ${i === services.length - 1 ? 'col-span-2' : ''}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded bg-[#C70017] text-white">
                            <service.icon className="size-3.5 stroke-white" />
                          </div>
                          <span className="text-[15px] font-semibold text-white">
                            {service.label}
                          </span>
                        </div>
                        <span className="pl-[38px] text-[12px] leading-relaxed text-white/60 transition-colors group-hover:text-white/80">
                          {service.description}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navLinks.slice(1).map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="text-[15px] font-normal text-white transition-colors hover:bg-transparent hover:text-white/70 focus:bg-transparent"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Phone Button */}
        <a
          href="tel:+14136662026"
          className="hidden items-center justify-center bg-[#2E4048] px-5 py-[15px] text-[22px] font-bold text-white transition-colors hover:bg-[#3a5260] md:flex"
        >
          (413)-666-2026
        </a>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <MenuIcon className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 overflow-y-auto bg-[#1E2C32] text-white"
          >
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/logo.png"
                  alt="Redcore"
                  width={160}
                  height={30}
                  className="h-8 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <Separator className="bg-white/10" />
            <nav className="flex flex-col gap-1 px-4">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/about">About us</Link>
                </Button>
              </SheetClose>

              {/* Mobile Services Accordion */}
              <Button
                variant="ghost"
                className="justify-between text-white hover:bg-white/10 hover:text-white"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDownIcon
                  className={`size-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </Button>
              {mobileServicesOpen && (
                <div className="ml-2 flex flex-col gap-1 border-l border-white/10 pl-3">
                  {services.map((service) => (
                    <SheetClose asChild key={service.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-3 text-white/80 hover:bg-white/10 hover:text-white"
                        asChild
                      >
                        <Link href={service.href}>
                          <service.icon className="size-4 text-[#C70017]" />
                          {service.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              )}

              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/quote">Get a quote</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/contacts">Contacts</Link>
                </Button>
              </SheetClose>
            </nav>
            <Separator className="bg-white/10" />
            <div className="px-4">
              <SheetClose asChild>
                <a
                  href="tel:+14136662026"
                  className="flex items-center justify-center gap-2 bg-[#2E4048] px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-[#3a5260]"
                >
                  <PhoneIcon className="size-4" />
                  (413)-666-2026
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
