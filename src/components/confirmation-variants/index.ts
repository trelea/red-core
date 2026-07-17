import type * as React from 'react';
import type { ConfirmationVariantProps } from './shared';
import { ConfirmationCorporate } from './variant-corporate';
import { ConfirmationIndustrial } from './variant-industrial';
import { ConfirmationCard } from './variant-card';
import { ConfirmationPremium } from './variant-premium';

export type { ConfirmationVariantProps } from './shared';
export { ConfirmationCorporate } from './variant-corporate';
export { ConfirmationIndustrial } from './variant-industrial';
export { ConfirmationCard } from './variant-card';
export { ConfirmationPremium } from './variant-premium';

export interface VariantEntry {
  id: string;
  name: string;
  description: string;
  Component: (props: ConfirmationVariantProps) => React.JSX.Element;
}

/** Ordered list of confirmation-email variants shown on the preview page. */
export const VARIANTS: VariantEntry[] = [
  {
    id: 'clean-classic',
    name: 'Clean Classic',
    description: 'Flat white card, centered, one bold CTA — timeless and understated.',
    Component: ConfirmationCorporate,
  },
  {
    id: 'red-check',
    name: 'Red Check',
    description: 'Bold red check block on a clean light card — striking and modern.',
    Component: ConfirmationIndustrial,
  },
  {
    id: 'status-strip',
    name: 'Status Strip',
    description: 'Slate hero statement plus a minimal 3-step progress strip.',
    Component: ConfirmationCard,
  },
  {
    id: 'big-type',
    name: 'Big Type',
    description: 'All-white with one oversized headline — sleek, modern SaaS style.',
    Component: ConfirmationPremium,
  },
];
