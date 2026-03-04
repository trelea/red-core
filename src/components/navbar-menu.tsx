'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MenuIcon, PhoneIcon } from 'lucide-react';
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
import { scrollToSection, scrollToId } from '@/lib/scroll-to-section';
import { useState, useEffect } from 'react';

const services = [
  {
    label: 'Core Drilling',
    href: '/core-drilling',
    description: 'Precision drilling of round holes in concrete, brick, and stone.',
    icon: '/icons/core-drilling-icon.svg',
  },
  {
    label: 'Slab Cutting',
    href: '/slab-cutting',
    description: 'Cutting concrete slabs to access underground pipes or utilities.',
    icon: '/icons/slab-cutting-icon.svg',
  },
  {
    label: 'Wall Saw Cutting',
    href: '/wall-saw-cutting',
    description: 'Heavy-duty cutting for doorways, windows, and structural openings.',
    icon: '/icons/wall-saw-cutting-icon.svg',
  },
  {
    label: 'Hand Saw Cutting',
    href: '/hand-saw-cutting',
    description: 'Compact precision cutting for tight or indoor areas.',
    icon: '/icons/hand-saw-cutting-icon.svg',
  },
  {
    label: 'Small Demolition',
    href: '/small-demolition',
    description: 'Controlled removal of concrete without damaging surroundings.',
    icon: '/icons/small-demolition-icon.svg',
  },
];

const navLinks = [
  { label: 'About us', href: '/#about' },
  { label: 'Get a quote', href: '/#quote' },
  { label: 'Contacts', href: '/#contacts' },
];

export function NavbarDesktopMenu() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-4 xl:gap-8">
        <NavigationMenuItem>
          <button
            type="button"
            onClick={(e) => scrollToSection(e, 'about')}
            className="text-[15px] font-normal text-white transition-colors hover:text-white/70"
          >
            About us
          </button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="!h-auto !bg-transparent !p-0 !text-white text-[15px] font-normal hover:!bg-transparent hover:!text-white/70 focus:!bg-transparent focus:!text-white data-[state=open]:!bg-transparent data-[state=open]:!text-white data-[state=open]:hover:!text-white/70 [&>svg]:hidden">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#1E2C32]/80 backdrop-blur-md">
            <div className="grid w-[550px] grid-cols-2 gap-1.5 p-3 lg:w-[650px] xl:w-[720px]">
              {services.map((service, i) => (
                <NavigationMenuLink asChild key={service.href}>
                  <Link
                    href={service.href}
                    className={`group flex flex-col gap-2 rounded-lg p-3 text-left transition-all hover:bg-white/[0.07] ${i === services.length - 1 ? 'col-span-2' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded bg-[#C70017]">
                        <Image
                          src={service.icon}
                          alt={service.label}
                          width={20}
                          height={20}
                          className="size-5 brightness-0 invert"
                        />
                      </div>
                      <span className="text-[15px] font-semibold text-white">
                        {service.label}
                      </span>
                    </div>
                    <span className="pl-[46px] text-[12px] leading-relaxed text-white/60 transition-colors group-hover:text-white/80">
                      {service.description}
                    </span>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {navLinks.slice(1).map((link) => {
          const id = link.href.replace('/#', '');
          return (
            <NavigationMenuItem key={link.href}>
              <button
                type="button"
                onClick={(e) => scrollToSection(e, id)}
                className="text-[15px] font-normal text-white transition-colors hover:text-white/70"
              >
                {link.label}
              </button>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavbarMobileMenu() {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => scrollToId(hash), 100);
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white"
        >
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[calc(100vw-40px)] overflow-y-auto bg-[#1E2C32] text-white sm:w-80"
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
              onClick={(e) => scrollToSection(e, 'about')}
            >
              About us
            </Button>
          </SheetClose>

          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-white/10 hover:text-white"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          >
            Services
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
                      <Image
                        src={service.icon}
                        alt={service.label}
                        width={20}
                        height={20}
                        className="size-5"
                      />
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
              onClick={(e) => scrollToSection(e, 'quote')}
            >
              Get a quote
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="justify-start text-white hover:bg-white/10 hover:text-white"
              onClick={(e) => scrollToSection(e, 'contacts')}
            >
              Contacts
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
  );
}

export function MobileServicesLink() {
  return (
    <button
      type="button"
      onClick={(e) => scrollToSection(e, 'services', 'top')}
      className="flex items-center justify-center rounded-sm bg-[#2E4048] p-2.5 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-[#3a5260] sm:px-3"
    >
      Services
    </button>
  );
}
