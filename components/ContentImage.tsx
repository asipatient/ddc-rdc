import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * next/image n'accepte pas les data URLs. Sur Vercel/Netlify les uploads admin
 * sont stockés en data:…;base64 — on bascule alors sur <img>.
 */
export function ContentImage({ src, alt, className, fill, sizes, ...rest }: ImageProps) {
  if (typeof src === "string" && src.startsWith("data:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- data URLs non supportées par next/image
      <img
        src={src}
        alt={alt}
        className={cn(fill ? "absolute inset-0 h-full w-full" : undefined, className)}
      />
    );
  }

  return <Image src={src} alt={alt} className={className} fill={fill} sizes={sizes} {...rest} />;
}
