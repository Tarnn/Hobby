import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="text-gradient-brand text-7xl font-bold md:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-semibold md:text-3xl">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
