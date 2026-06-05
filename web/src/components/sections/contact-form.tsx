'use client';

import { useActionState } from 'react';

import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { sendContact, type ContactState } from '@/app/actions/contact';

const initial: ContactState = { status: 'idle' };

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, formAction, pending] = useActionState(sendContact, initial);

  if (state.status === 'success') {
    return (
      <div className="border-border bg-card flex flex-col items-center justify-center gap-3 rounded-2xl border p-10 text-center">
        <CheckCircle2 className="size-10 text-green-500" />
        <h3 className="text-lg font-semibold">{t('successTitle')}</h3>
        <p className="text-muted-foreground text-sm">{t('success')}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6 text-left md:p-8"
    >
      {/* Honeypot (hidden from users) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
        />
      </div>

      {state.status === 'error' && state.message && (
        <p className="text-destructive text-sm">{state.message}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="rounded-full"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="size-4" />
            {t('send')}
          </>
        )}
      </Button>
    </form>
  );
}
