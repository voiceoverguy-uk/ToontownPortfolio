import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().refine(
    (val) => val.trim().split(/\s+/).filter(Boolean).length >= 8,
    { message: 'Please write at least 8 words so we know how to help' }
  ),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  compact?: boolean;
}

export function ContactForm({ compact = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '', website: '' },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          pageTitle: document.title,
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setSubmitted(true);
        return;
      }

      if (data.fieldErrors) {
        for (const [field, msg] of Object.entries(data.fieldErrors)) {
          setError(field as keyof FormValues, { message: msg as string });
        }
        return;
      }

      setServerError(data.error ?? 'Something went wrong. Please try again.');
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  }

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 text-center ${compact ? 'py-4' : 'py-8'}`}>
        <CheckCircle className="text-toontown-green w-10 h-10" />
        <p className="font-bold text-lg text-toontown-darkbrown">Message sent!</p>
        <p className="text-sm text-toontown-brown">Thanks for getting in touch — we'll be in contact soon!</p>
      </div>
    );
  }

  const fieldClass = `w-full border-2 border-toontown-darkbrown rounded-xl px-3 py-2 font-sans text-sm bg-toontown-cream text-toontown-darkbrown placeholder-toontown-brown focus:outline-none focus:ring-2 focus:ring-mickey-red focus:border-transparent transition`;
  const labelClass = `block font-bold text-sm text-toontown-darkbrown mb-1`;
  const errorClass = `mt-1 text-mickey-red text-xs font-semibold`;
  const gap = compact ? 'space-y-3' : 'space-y-4';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={gap}>

      {/* Honeypot — hidden from real users */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
          type="text"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="cf-name" className={labelClass}>Your Name</label>
        <input
          id="cf-name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Jane Smith"
          className={fieldClass}
          {...register('name')}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={labelClass}>Email Address</label>
        <input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="e.g. jane@agency.com"
          className={fieldClass}
          {...register('email')}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className={labelClass}>Your Message</label>
        <textarea
          id="cf-message"
          rows={compact ? 3 : 4}
          placeholder="Tell us about your project — what type of voiceover do you need, the brand, timeline, etc."
          className={`${fieldClass} resize-none`}
          {...register('message')}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="text-mickey-red text-sm font-semibold text-center bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {serverError}
        </p>
      )}

      <div className="text-center pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="book-now-button inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Enquiry
            </>
          )}
        </button>
      </div>

    </form>
  );
}
