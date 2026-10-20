'use client';

import { createContext, useContext, useState } from 'react';
import GetAQuoteDialog from '@/components/get-a-quote';
import { trackQuoteModalOpen } from '@/lib/tracking';

interface QuoteDialogContextValue {
  openQuote: (triggerLocation?: string) => void;
}

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

export function useQuoteDialog() {
  const ctx = useContext(QuoteDialogContext);
  if (!ctx) {
    throw new Error('useQuoteDialog must be used within a QuoteDialogProvider');
  }
  return ctx;
}

export function QuoteDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openQuote = (triggerLocation = 'quote_button') => {
    trackQuoteModalOpen(triggerLocation);
    setOpen(true);
  };

  return (
    <QuoteDialogContext.Provider value={{ openQuote }}>
      {children}
      <GetAQuoteDialog open={open} onOpenChange={setOpen} />
    </QuoteDialogContext.Provider>
  );
}
