'use client';

import { createContext, useContext, useState } from 'react';
import GetAQuoteDialog from '@/components/get-a-quote';

interface QuoteDialogContextValue {
  openQuote: () => void;
}

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

export function useQuoteDialog() {
  const ctx = useContext(QuoteDialogContext);
  if (!ctx) {
    throw new Error('useQuoteDialog must be used within a QuoteDialogProvider');
  }
  return ctx;
}

export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <QuoteDialogContext.Provider value={{ openQuote: () => setOpen(true) }}>
      {children}
      <GetAQuoteDialog open={open} onOpenChange={setOpen} />
    </QuoteDialogContext.Provider>
  );
}
