"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyBoilerplate({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Échec de la copie", err);
    }
  };

  return (
    <div className="relative rounded-lg border border-border bg-surface-muted p-6">
      <p className="text-sm leading-loose text-foreground pr-10">{text}</p>
      <button
        onClick={handleCopy}
        aria-label="Copier le texte"
        className="focus-ring absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md bg-surface-elevated text-foreground-subtle hover:bg-brand-blue hover:text-white transition-colors dark:hover:bg-brand-gold dark:hover:text-brand-blue"
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
      {copied && (
        <span aria-live="polite" className="sr-only">
          Texte copié
        </span>
      )}
    </div>
  );
}
