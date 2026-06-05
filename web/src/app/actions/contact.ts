'use server';

import { Resend } from 'resend';

import { PROFILE } from '@/content/portfolio';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  // Honeypot — bots fill hidden fields; humans don't.
  const company = String(formData.get('company') || '').trim();

  if (company) return { status: 'success' }; // silently drop bots
  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in all fields.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — surface a clear, non-fatal message.
    return {
      status: 'error',
      message:
        'Email is not configured yet. Please reach me directly by email.',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const from =
      process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
    const { error } = await resend.emails.send({
      from,
      to: [PROFILE.email],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) throw new Error(error.message);
    return { status: 'success' };
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please try again.',
    };
  }
}
