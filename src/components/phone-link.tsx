'use client';

import { trackPhoneClick } from '@/lib/gtag';

export default function PhoneLink({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="tel:+14136662026"
      rel="nofollow"
      className={className}
      onClick={trackPhoneClick}
      {...props}
    >
      {children}
    </a>
  );
}
