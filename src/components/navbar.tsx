import Image from 'next/image';
import Link from 'next/link';
import { PhoneIcon } from 'lucide-react';
import { NavbarDesktopMenu, NavbarMobileMenu } from '@/components/navbar-menu';

export default function Navbar() {
  return (
    <header className="w-full bg-[#1E2C32]">
      <div className="container mx-auto flex items-center justify-between px-4 py-5 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Redcore"
            width={203}
            height={38}
            className="h-[30px] w-auto sm:h-[38px]"
            priority
          />
        </Link>

        {/* Desktop: centered navigation */}
        <NavbarDesktopMenu />

        {/* Desktop: phone on far right */}
        <a
          href="tel:+14136662026"
          rel="nofollow"
          className="hidden shrink-0 items-center justify-center rounded-sm bg-[#2E4048] px-3 py-2.5 text-[14px] font-bold text-white shadow-md transition-colors hover:bg-[#3a5260] lg:flex xl:px-5 xl:py-[15px] xl:text-[18px]"
        >
          (413)-666-2026
        </a>

        {/* Mobile: phone + hamburger grouped on right */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:+14136662026"
            rel="nofollow"
            className="flex items-center justify-center rounded-sm bg-[#2E4048] p-2.5 text-white shadow-md transition-colors hover:bg-[#3a5260] sm:px-3 sm:py-2.5 sm:text-[14px] sm:font-bold"
          >
            <PhoneIcon className="size-4 sm:hidden" />
            <span className="hidden sm:inline">(413)-666-2026</span>
          </a>
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
