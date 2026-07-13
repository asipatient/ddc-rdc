import { cn } from "@/lib/utils";

type PulsatingPlayButtonProps = {
  href: string;
  label: string;
  size?: number;
  className?: string;
};

/**
 * Bouton de lecture vidéo rond avec onde pulsante continue
 * (style pulsating-play-btn). Ouvre le lien dans un nouvel onglet.
 */
export function PulsatingPlayButton({ href, label, size = 94, className }: PulsatingPlayButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn("pulsating-play-btn focus-ring", className)}
      style={size !== 94 ? ({ "--play-btn-size": `${size}px` } as React.CSSProperties) : undefined}
    />
  );
}
