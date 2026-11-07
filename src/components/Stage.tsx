import type { ReactNode } from "react";
import { archShape, lit } from "../ui/ui";

type StageProps = {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
};

// Arch-shaped photo with a gold outline and a moon peeking from behind
export default function Stage({
  src,
  alt,
  className = "",
  children,
}: StageProps) {
  return (
    <div
      className={`group relative aspect-[3/4.4] after:pointer-events-none after:absolute after:-inset-x-3.5 after:-top-3.5 after:bottom-0 after:rounded-t-full after:border after:border-b-0 after:border-gold/35 ${className}`}
    >
      <div className="absolute -start-1/4 -top-[9%] hidden aspect-square w-3/5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#efe0c4,#a88a5e_62%,#4d3e2b)] shadow-[0_0_120px_rgba(200,169,122,.25)] md:block" />
      <div className={`${archShape} size-full`}>
        <img src={src} alt={alt} className={lit} />
      </div>
      {children}
    </div>
  );
}
