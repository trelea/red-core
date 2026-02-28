import Image from 'next/image';
import Link from 'next/link';
import NavbarMenu from '@/components/navbar-menu';

export default function Navbar() {
  return (
    <header className="w-full bg-[#1E2C32]">
      <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-[120px]">
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

        <NavbarMenu />

        <a
          href="tel:+14136662026"
          className="hidden items-center justify-center bg-[#2E4048] px-5 py-[15px] text-[22px] font-bold text-white transition-colors hover:bg-[#3a5260] md:flex"
        >
          (413)-666-2026
        </a>
      </div>
    </header>
  );
}
