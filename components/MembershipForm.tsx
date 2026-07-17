"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitMembershipForm, type PublicFormState } from "@/app/actions/forms";
import { availabilityOptions, membershipInterestDomains } from "@/lib/site-data";

const initialState: PublicFormState = { ok: false, message: "" };

export function MembershipForm() {
  const [state, formAction] = useFormState(submitMembershipForm, initialState);

  return (
    <form action={formAction} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-black text-brand-blue">Envoyer ma candidature</h2>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="membership-website">Site web</label>
        <input id="membership-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="membership-last-name" className="text-sm font-bold text-brand-blue">
            Nom
          </label>
          <input id="membership-last-name" name="lastName" required minLength={2} className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-first-name" className="text-sm font-bold text-brand-blue">
            Prénom
          </label>
          <input id="membership-first-name" name="firstName" required minLength={2} className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-email" className="text-sm font-bold text-brand-blue">
            Email
          </label>
          <input id="membership-email" name="email" type="email" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-phone" className="text-sm font-bold text-brand-blue">
            Téléphone
          </label>
          <input id="membership-phone" name="phone" type="tel" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-city" className="text-sm font-bold text-brand-blue">
            Ville
          </label>
          <input id="membership-city" name="city" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-age" className="text-sm font-bold text-brand-blue">
            Âge facultatif
          </label>
          <input id="membership-age" name="age" type="number" min={12} max={100} className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4" />
        </div>
        <div>
          <label htmlFor="membership-type" className="text-sm font-bold text-brand-blue">
            Type de candidature
          </label>
          <select id="membership-type" name="membershipType" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4">
            <option value="Adhésion">Devenir membre</option>
            <option value="Bénévolat">Devenir bénévole</option>
            <option value="Proposition d'initiative">Proposer une initiative</option>
          </select>
        </div>
        <div>
          <label htmlFor="membership-domain" className="text-sm font-bold text-brand-blue">
            Domaine d&apos;intérêt
          </label>
          <select id="membership-domain" name="interestDomain" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4">
            <option value="" disabled>
              Sélectionner
            </option>
            {membershipInterestDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="membership-availability" className="text-sm font-bold text-brand-blue">
            Disponibilité
          </label>
          <select id="membership-availability" name="availability" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-slate-300 px-4">
            <option value="" disabled>
              Sélectionner
            </option>
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="membership-motivation" className="text-sm font-bold text-brand-blue">
            Motivation
          </label>
          <textarea
            id="membership-motivation"
            name="motivation"
            required
            minLength={10}
            rows={6}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="membership-experience" className="text-sm font-bold text-brand-blue">
            Expérience éventuelle
          </label>
          <textarea
            id="membership-experience"
            name="experience"
            rows={4}
            className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-4 py-3"
          />
        </div>
      </div>
      <SubmitButton />
      {state.message ? (
        <p className={`animate-fade-up mt-4 rounded-md p-4 text-sm font-semibold ${state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </p>
      ) : null}
      <p className="mt-3 text-xs leading-6 text-slate-500">
        Nous reviendrons vers vous dans les meilleurs délais à l&apos;adresse email fournie.
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-green disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <span className="form-spinner" aria-hidden="true" /> : null}
      {pending ? "Envoi en cours..." : "Envoyer ma candidature"}
    </button>
  );
}
