import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 24"
      aria-hidden="true"
      className={cn("h-5 w-44 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      <path d="M2 12h70" opacity="0.5" />
      <path d="M148 12h70" opacity="0.5" />
      <path d="M110 4c-8 3-12 5-12 8s4 5 12 8c8-3 12-5 12-8s-4-5-12-8z" />
      <path d="M86 12c4-4 8-4 10 0-2 4-6 4-10 0z" />
      <path d="M134 12c-4-4-8-4-10 0 2 4 6 4 10 0z" />
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-script text-primary/80 leading-none tracking-[0.08em] select-none",
        className,
      )}
    >
      H<span className="text-[0.6em] align-middle"> &amp; </span>M
    </span>
  );
}
