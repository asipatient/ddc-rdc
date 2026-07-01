"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEWSLETTER_EMAIL = "ddc.democratie@gmail.com";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // TODO: remplacer par appel API Brevo ou Mailchimp quand le compte est configuré
    const subject = encodeURIComponent("Inscription newsletter");
    const body = encodeURIComponent(`Email : ${email}`);
    window.location.href = `mailto:${NEWSLETTER_EMAIL}?subject=${subject}&body=${body}`;

    setStatus("success");
  }

  return (
    <form className={compact ? "mt-4" : "mt-6"} onSubmit={handleSubmit} noValidate>
      <label htmlFor={compact ? "newsletter-footer" : "newsletter"} className="text-sm font-semibold">
        Recevoir les nouvelles de la DDC RDC
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={compact ? "newsletter-footer" : "newsletter"}
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre adresse email"
          className="focus-ring min-h-11 w-full rounded-md border border-white/20 bg-white px-4 text-sm text-brand-ink placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-gold px-4 py-3 text-sm font-bold text-brand-blue transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          {status === "loading" ? "Envoi..." : "S'inscrire"}
        </button>
      </div>
      {status === "success" ? (
        <p className="mt-3 rounded-md bg-white/15 p-3 text-sm font-semibold text-white">
          Merci ! Votre demande d&apos;inscription a été envoyée.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800">{errorMessage}</p>
      ) : null}
    </form>
  );
}
