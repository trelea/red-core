'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export default function TopBar() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText('redcoreusa@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API requires HTTPS — no fallback needed
    }
  }

  return (
    <div className="hidden border-b border-white/[0.06] bg-[#172428] py-1.5 sm:block">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-[120px] 2xl:px-[160px]">
        <Badge className="gap-2 border-0 bg-green-500/10 px-2.5 py-0.5 text-[15px] font-medium text-green-400 hover:bg-green-500/15">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-green-400" />
          </span>
          Open 24/7
        </Badge>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={copyAddress}
              className="flex items-center gap-2 text-[15px] font-medium text-white/90 transition-colors hover:text-white"
            >
              <Mail className="size-4" />
              redcoreusa@gmail.com
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            sideOffset={8}
            className="rounded-lg border-0 bg-white px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#1E2C32] shadow-lg"
          >
            {copied ? 'Copied!' : 'Click to copy email'}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
