"use client";

import { useFormState, useFormStatus } from"react-dom";
import { submitContactForm, type PublicFormState } from"@/app/actions/forms";
import { contactRequestTypes } from"@/lib/site-data";

type ContactFormProps = {
 title?: string;
 defaultType?: string;
 idPrefix?: string;
 sourceForm?: string;
};

const initialState: PublicFormState = { ok: false, message:"" };

export function ContactForm({
 title ="Écrire à la DDC RDC",
 defaultType ="",
 idPrefix ="contact",
 sourceForm ="Formulaire de contact"
}: ContactFormProps) {
 const [state, formAction] = useFormState(submitContactForm, initialState);
 const fieldId = (name: string) => `${idPrefix}-${name}`;

 return (
 <form action={formAction} className="rounded-lg border border-border bg-surface-elevated p-6 shadow-soft">
 <h2 className="text-2xl font-bold text-brand-blue dark:text-foreground">{title}</h2>
 <input type="hidden" name="sourceForm" value={sourceForm} />
 <div className="hidden" aria-hidden="true">
 <label htmlFor={fieldId("website")}>Site web</label>
 <input id={fieldId("website")} name="website" tabIndex={-1} autoComplete="off" />
 </div>
 <div className="mt-6 grid gap-4 sm:grid-cols-2">
 <div>
 <label htmlFor={fieldId("name")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Nom complet
 </label>
 <input id={fieldId("name")} name="name" placeholder="Votre nom" required minLength={2} className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4 placeholder-slate-400 dark:placeholder-slate-500" />
 </div>
 <div>
 <label htmlFor={fieldId("email")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Email professionnel ou personnel
 </label>
 <input id={fieldId("email")} name="email" type="email" placeholder="nom@exemple.com" required className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4 placeholder-slate-400 dark:placeholder-slate-500" />
 </div>
 <div>
 <label htmlFor={fieldId("phone")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Téléphone
 </label>
 <input id={fieldId("phone")} name="phone" type="tel" className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4" />
 </div>
 <div>
 <label htmlFor={fieldId("organization")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Organisation / Institution / Média (Optionnel)
 </label>
 <input id={fieldId("organization")} name="organization" placeholder="ex: Nom de l'ONG, Université..." className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4 placeholder-slate-400 dark:placeholder-slate-500" />
 </div>
 <div>
 <label htmlFor={fieldId("subject")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Objet de la demande
 </label>
 <input id={fieldId("subject")} name="subject" placeholder="Sujet principal de votre message" required minLength={3} className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4 placeholder-slate-400 dark:placeholder-slate-500" />
 </div>
 <div>
 <label htmlFor={fieldId("request-type")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Type de demande
 </label>
 <select
 id={fieldId("request-type")}
 name="requestType"
 defaultValue={defaultType}
 required
 className="focus-ring mt-2 min-h-11 w-full rounded-md border border-border-strong px-4"
 >
 <option value="" disabled>
 Sélectionner
 </option>
 {contactRequestTypes.map((type) => (
 <option key={type} value={type}>
 {type}
 </option>
 ))}
 </select>
 </div>
 <div className="sm:col-span-2">
 <label htmlFor={fieldId("message")} className="text-sm font-bold text-brand-blue dark:text-foreground-muted">
 Message
 </label>
 <textarea
 id={fieldId("message")}
 name="message"
 required
 minLength={10}
 rows={6}
 className="focus-ring mt-2 w-full rounded-md border border-border-strong px-4 py-3"
 />
 </div>
 </div>
 <SubmitButton />
 {state.message ? (
 <p className={`animate-fade-up mt-4 rounded-md p-4 text-sm font-semibold ${state.ok ?"bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400" :"bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
 {state.message}
 </p>
 ) : null}
 <p className="mt-3 text-xs leading-6 text-foreground-subtle">
 Nous vous répondrons dans les meilleurs délais à l&apos;adresse email fournie.
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
 {pending ?"Envoi en cours..." :"Envoyer le message"}
 </button>
 );
}
