import { useCallback, useEffect, useRef, useState } from "react";
import { Flourish, Monogram } from "@/components/Reveal";

type Stage = "closed" | "seal" | "flap" | "card" | "read" | "done";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

export function EnvelopeIntro({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<Stage>("closed");
  const reduced = usePrefersReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const open = useCallback(() => {
    if (stage !== "closed") return;
    const after = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, reduced ? Math.min(ms, 120) : ms));
    };
    setStage("seal");
    after(900, () => setStage("flap"));
    after(2100, () => setStage("card"));
    after(3400, () => setStage("read"));
  }, [reduced, stage]);

  const enter = useCallback(() => {
    setStage("done");
    timers.current.push(setTimeout(onFinish, reduced ? 60 : 900));
  }, [onFinish, reduced]);

  const open3 = stage !== "closed" && stage !== "seal";
  const cardUp = stage === "card" || stage === "read" || stage === "done";
  const readable = stage === "read" || stage === "done";

  return (
    <div
      className={`paper fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto px-4 py-6 transition-opacity duration-[900ms] ${
        stage === "done" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Envelope + card stage */}
        <div
          className="relative w-full transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{
            perspective: "1400px",
            transform: cardUp ? "translateY(min(22vh, 165px))" : "none",
          }}
        >
          {/* Invitation card */}
          <div
            className={`absolute inset-x-[4%] bottom-[12%] z-0 origin-bottom rounded-sm border border-border bg-card px-5 py-5 text-center shadow-paper transition-all duration-[1300ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:px-7 sm:py-6 ${
              cardUp ? "-translate-y-[84%] opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="eyebrow">Save the date</p>
            <h1 className="mt-2 font-display text-xl leading-tight sm:text-2xl">Harsh Dadlani</h1>
            <p className="my-1 font-script text-base text-primary">with</p>
            <h2 className="font-display text-xl leading-tight sm:text-2xl">Monika Gurunani</h2>
            <Flourish className="mx-auto my-2 w-20" />
            <p className="mx-auto max-w-xs text-[0.7rem] leading-relaxed text-muted-foreground sm:text-[0.75rem]">
              Together with the Dadlani Family
              <br />
              cordially invite you to celebrate their wedding
            </p>
            <p className="mt-2.5 font-display text-sm tracking-[0.14em] sm:text-base">10 DECEMBER 2026</p>
            <p className="mt-1.5 text-[0.68rem] leading-relaxed text-muted-foreground sm:text-[0.72rem]">
              The Grand Jalsa
              <br />
              Bairagarh Kalan, Bhopal,
              <br />
              Madhya Pradesh 462030
            </p>
          </div>

          {/* Envelope body */}
          <button
            type="button"
            onClick={open}
            aria-label="Open your invitation"
            disabled={stage !== "closed"}
            className="relative z-10 block w-full cursor-pointer rounded-sm disabled:cursor-default"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-[3/2.05] w-full rounded-sm border border-border bg-secondary shadow-paper">
              {/* inner shade */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-cream to-ivory" />
              {/* side folds */}
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 48%, color-mix(in oklab, var(--color-champagne) 35%, transparent) 49.5%, transparent 51%), linear-gradient(-115deg, transparent 48%, color-mix(in oklab, var(--color-champagne) 35%, transparent) 49.5%, transparent 51%)",
                }}
              />
              {/* embossed monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Monogram className="text-5xl opacity-30" />
              </div>
              {/* fine botanical line art */}
              <svg
                viewBox="0 0 100 40"
                aria-hidden="true"
                className="absolute bottom-3 left-1/2 w-24 -translate-x-1/2 text-sage"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.65"
              >
                <path d="M50 38c0-8 0-14 0-20" />
                <path d="M50 26c-6-2-9-6-9-11 5 1 8 5 9 11z" />
                <path d="M50 26c6-2 9-6 9-11-5 1-8 5-9 11z" />
                <path d="M50 33c-5-1-8-4-9-8 5 0 8 3 9 8z" />
                <path d="M50 33c5-1 8-4 9-8-5 0-8 3-9 8z" />
              </svg>

              {/* Flap */}
              <div
                className="absolute inset-x-0 top-0 h-[58%] origin-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.33,0.9,0.28,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: open3 ? "rotateX(-172deg)" : "rotateX(0deg)",
                  zIndex: open3 ? 0 : 20,
                }}
              >
                <div
                  className="h-full w-full border border-border bg-cream shadow-[0_6px_18px_-12px_oklch(0.35_0.03_60/0.5)]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>

              {/* Wax seal */}
              <div
                className={`absolute left-1/2 top-[52%] z-30 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-champagne transition-all duration-[800ms] ease-out sm:h-14 sm:w-14 ${
                  stage === "closed"
                    ? "opacity-100"
                    : "-translate-y-[220%] rotate-[-14deg] opacity-0"
                }`}
                style={{ boxShadow: "inset 0 1px 3px oklch(0.35 0.03 60 / 0.25)" }}
              >
                <span className="flex h-full w-full items-center justify-center font-script text-[0.85rem] text-ink/70">
                  H&amp;M
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Cue / continue */}
        <div
          className={`relative z-40 flex h-16 flex-col items-center justify-start text-center transition-all duration-[1300ms] ${
            cardUp ? "mt-12 sm:mt-16" : "mt-8"
          }`}
        >
          {stage === "closed" && (
            <button
              type="button"
              onClick={open}
              className="eyebrow cursor-pointer transition-colors hover:text-foreground"
            >
              Open your invitation
            </button>
          )}
          {readable && (
            <button
              type="button"
              onClick={enter}
              autoFocus
              className="cursor-pointer rounded-sm border border-primary/40 bg-transparent px-7 py-3 text-[0.7rem] tracking-[0.28em] text-foreground uppercase transition-colors hover:bg-secondary"
            >
              Enter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
