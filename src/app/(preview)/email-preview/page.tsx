import * as React from 'react';
import { render } from '@react-email/render';
import { VARIANTS } from '@/components/confirmation-variants';
import { PreviewClient, type RenderedVariant } from './preview-client';

export const dynamic = 'force-dynamic';

const PREVIEW_NAME = 'Jordan Miller';
const PREVIEW_REF = 'RC-2026-0042';

// Server component: render every variant to an HTML string, then hand them to
// the client for side-by-side review. The approved copy is identical for both
// request kinds, so a single render per variant suffices.
export default async function EmailPreviewPage() {
  const previews: RenderedVariant[] = await Promise.all(
    VARIANTS.map(async (v) => ({
      id: v.id,
      name: v.name,
      description: v.description,
      html: await render(
        React.createElement(v.Component, {
          fullName: PREVIEW_NAME,
          kind: 'quote',
          referenceId: PREVIEW_REF,
        }),
      ),
    })),
  );

  return <PreviewClient previews={previews} />;
}
