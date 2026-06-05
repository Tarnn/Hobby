import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label="Taranjit Kang — home"
      className={cn(
        'group inline-flex items-center gap-2 font-semibold tracking-tight',
        className,
      )}
    >
      <span className="bg-brand text-brand-foreground grid size-8 place-items-center rounded-lg text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
        TK
      </span>
      <span className="text-base-dark text-lg">
        Taranjit<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
