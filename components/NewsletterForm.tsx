"use client";

import { Send } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { submitNewsletterForm, type PublicFormState } from "@/app/actions/forms";

const initialState: PublicFormState = { ok: false, message: "" };

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction] = useFormState(submitNewsletterForm, initialState);

  return (
    <form className={compact ? "mt-4" : "mt-6"} action={formAction}>
      <input type="hidden" name="source" value={compact ? "Footer" : "Section newsletter"} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={compact ? "newsletter-footer-website" : "newsletter-website"}>Site web</label>
        <input id={compact ? "newsletter-footer-website" : "newsletter-website"} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor={compact ? "newsletter-footer" : "newsletter"} className="text-sm font-semibold">
        Recevoir les nouvelles de la DDC RDC
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={compact ? "newsletter-footer" : "newsletter"}
          name="email"
          type="email"
          required
          placeholder="Votre adresse email"
          className="focus-ring min-h-11 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-brand-ink placeholder:text-slate-400"
        />
        <SubmitButton />
      </div>
      {state.message ? (
        <p className={`animate-fade-up mt-3 rounded-md p-3 text-sm font-semibold ${state.ok ? "bg-white/15 text-white" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-gold px-4 py-3 text-sm font-bold text-brand-blue transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <span className="form-spinner" aria-hidden="true" /> : <Send aria-hidden="true" className="h-4 w-4" />}
      {pending ? "Envoi..." : "S'inscrire"}
    </button>
  );
}
