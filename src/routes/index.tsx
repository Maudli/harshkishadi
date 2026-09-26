import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { Flourish, Monogram, Reveal } from "@/components/Reveal";
import coupleImg from "@/assets/couple.webp";
import harshImg from "@/assets/harsh.webp";
import monikaImg from "@/assets/monika.webp";
import venueImg from "@/assets/venue.webp";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsh & Monika — Wedding Invitation, 10 December 2026" },
      {
        name: "description",
        content:
          "Harsh Dadlani and Monika Gurunani invite you to their wedding on 10 December 2026 at The Grand Jalsa, Bairagarh Kalan, Bhopal.",
      },
      { property: "og:title", content: "Harsh & Monika — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "10 December 2026 · The Grand Jalsa, Bhopal. With the blessings and love of the Dadlani Family.",
      },
    ],
  }),
  component: Invitation,
});

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The%20Grand%20Jalsa%2C%20Bairagarh%20Kalan%2C%20Bhopal%2C%20Madhya%20Pradesh%20462030";
const PHONE = "+919425377910";

const events = [
  { day: "9 December 2026", name: "Carnival" },
  { day: "9 December 2026", name: "Sangeet" },
  { day: "10 December 2026", name: "Wedding" },
  { day: "10 December 2026", name: "Reception" },
];

const nav = [
  { href: "#welcome", label: "Welcome" },
  { href: "#celebrations", label: "Celebrations" },
  { href: "#venue", label: "Venue" },
  { href: "#rsvp", label: "RSVP" },
];

function Invitation() {
  const [opened, setOpened] = useState<boolean | null>(null);

  useEffect(() => {
    setOpened(sessionStorage.getItem("hm-invitation-opened") === "true");
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem("hm-invitation-opened", "true");
    setOpened(true);
  }, []);

  const replay = useCallback(() => {
    sessionStorage.removeItem("hm-invitation-opened");
    window.scrollTo({ top: 0 });
    setOpened(false);
  }, []);

  if (opened === null) {
    return <div className="paper min-h-screen" aria-hidden="true" />;
  }

  return (
    <>
      {!opened && <EnvelopeIntro onFinish={finish} />}
      {opened && <Site onReplay={replay} />}
    </>
  );
}

function Site({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="paper min-h-screen animate-in fade-in duration-1000">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-sm">
        <nav
          aria-label="Sections"
          className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:flex sm:justify-between"
        >
          <a href="#welcome" className="flex min-w-0 items-center gap-2">
            <img src={logoImg} alt="Harsh and Monika monogram" className="h-8 w-8 shrink-0" />
            <span className="hidden truncate font-display text-base tracking-[0.18em] sm:inline">
              Harsh &amp; Monika
            </span>
          </a>
          <ul className="flex shrink-0 items-center gap-4 sm:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow transition-colors hover:text-foreground"
                  style={{ fontSize: "0.62rem" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section id="welcome" className="mx-auto max-w-5xl px-5 pt-16 pb-20 scroll-mt-20 sm:pt-24">
        <Reveal className="text-center">
          <p className="eyebrow">The wedding of</p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] sm:text-6xl">
            Harsh Dadlani
            <span className="my-2 block font-script text-2xl text-primary sm:text-3xl">&amp;</span>
            Monika Gurunani
          </h1>
          <Flourish className="mx-auto my-7" />
          <p className="font-display text-lg tracking-[0.22em] sm:text-xl">10 DECEMBER 2026</p>
          <p className="mt-3 text-sm text-muted-foreground">
            The Grand Jalsa
            <br />
            Bhopal, Madhya Pradesh
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12">
          <div className="overflow-hidden rounded-sm border border-border bg-card p-3 shadow-paper sm:p-5">
            <img
              src={coupleImg}
              alt="Harsh Dadlani and Monika Gurunani together"
              className="mx-auto block max-h-[30rem] w-auto object-contain sm:max-h-[36rem]"
              loading="eager"
            />
          </div>
          <p className="mt-6 text-center text-[0.78rem] tracking-[0.18em] text-muted-foreground uppercase">
            With the blessings and love of the Dadlani Family
          </p>
        </Reveal>
      </section>

      {/* PERSONAL WELCOME */}
      <section className="border-y border-border/60 bg-secondary/60 px-5 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Monogram className="text-3xl" />
          <p className="mt-8 font-display text-xl leading-relaxed italic sm:text-2xl">
            “With immense joy and the blessings of our family, we invite you to celebrate the wedding
            of Harsh and Monika.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Your presence and blessings will make these cherished moments even more special as we
            come together to celebrate love, family, and the beginning of a beautiful new chapter.”
          </p>
          <div className="rule-gold mx-auto mt-10 w-24" />
          <p className="mt-6 text-[0.8rem] tracking-[0.2em] text-muted-foreground uppercase">
            With love,
            <br />
            The Dadlani Family
          </p>
        </Reveal>
      </section>

      {/* PORTRAITS */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid gap-12 sm:grid-cols-2">
          {[
            { img: harshImg, name: "Harsh Dadlani", role: "The Groom" },
            { img: monikaImg, name: "Monika Gurunani", role: "The Bride" },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 120} className="text-center">
              <div className="flex h-[24rem] items-center justify-center overflow-hidden rounded-sm border border-border bg-card p-4 shadow-paper sm:h-[28rem]">
                <img
                  src={p.img}
                  alt={`Portrait of ${p.name}`}
                  className="mx-auto block max-h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p className="eyebrow mt-6">{p.role}</p>
              <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CELEBRATIONS */}
      <section
        id="celebrations"
        className="border-y border-border/60 bg-secondary/60 px-5 py-20 scroll-mt-20"
      >
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">The Celebrations</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Wedding Celebrations</h2>
          <Flourish className="mx-auto my-7" />
        </Reveal>

        <div className="mx-auto mt-4 grid max-w-5xl gap-6 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 110}>
              <article className="h-full rounded-sm border border-border bg-card px-6 py-9 text-center shadow-paper transition-shadow hover:shadow-lift">
                <p className="eyebrow">{`Event ${i + 1}`}</p>
                <p className="mt-5 font-display text-2xl tracking-[0.14em]">
                  {e.day.split(" ")[0]} DEC
                </p>
                <div className="rule-gold mx-auto my-5 w-16" />
                <h3 className="font-display text-3xl">{e.name}</h3>
                <p className="mt-3 text-[0.78rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {e.day}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="mx-auto max-w-5xl px-5 py-20 scroll-mt-20">
        <Reveal className="text-center">
          <p className="eyebrow">The Venue</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">The Grand Jalsa</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Bairagarh Kalan,
            <br />
            Bhopal, Madhya Pradesh 462030,
            <br />
            India
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-block rounded-sm border border-primary/40 px-7 py-3 text-[0.7rem] tracking-[0.24em] uppercase transition-colors hover:bg-secondary"
          >
            View on Google Maps
          </a>
        </Reveal>
        <Reveal delay={140} className="mt-12">
          <div className="overflow-hidden rounded-sm border border-border bg-card p-3 shadow-paper sm:p-5">
            <img
              src={venueImg}
              alt="The Grand Jalsa, Bhopal"
              className="mx-auto block max-h-[32rem] w-full rounded-xs object-cover object-[center_60%] sm:max-h-[38rem]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      {/* RSVP */}
      <section
        id="rsvp"
        className="border-y border-border/60 bg-secondary/60 px-5 py-20 scroll-mt-16"
      >
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">RSVP</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Kindly Reply</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We would be delighted to celebrate these special moments with you. Kindly confirm your
            attendance with our family.
          </p>
          <div className="mt-10 rounded-sm border border-border bg-card px-6 py-9 shadow-paper">
            <p className="eyebrow">RSVP Contact</p>
            <h3 className="mt-4 font-display text-2xl">Neha Dadlani</h3>
            <p className="mt-2 text-sm tracking-[0.12em] text-muted-foreground">+91 94253 77910</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={`tel:${PHONE}`}
                className="rounded-sm border border-primary/40 px-7 py-3 text-[0.7rem] tracking-[0.24em] uppercase transition-colors hover:bg-secondary"
              >
                Call
              </a>
              <a
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-sm border border-primary/40 bg-primary/10 px-7 py-3 text-[0.7rem] tracking-[0.24em] uppercase transition-colors hover:bg-primary/20"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CLOSING */}
      <footer className="px-5 py-20 text-center">
        <Reveal className="mx-auto max-w-xl">
          <svg
            viewBox="0 0 120 50"
            aria-hidden="true"
            className="mx-auto h-12 w-28 text-sage"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
          >
            <path d="M60 48V16" />
            <path d="M60 30c-9-2-14-8-14-15 8 1 13 7 14 15z" />
            <path d="M60 30c9-2 14-8 14-15-8 1-13 7-14 15z" />
            <path d="M60 40c-7-1-11-5-12-10 7 0 11 4 12 10z" />
            <path d="M60 40c7-1 11-5 12-10-7 0-11 4-12 10z" />
          </svg>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            With love and gratitude,
            <br />
            The Dadlani Family
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            We look forward to celebrating with you.
          </p>
          <div className="rule-gold mx-auto mt-10 w-24" />
          <h2 className="mt-8 font-display text-3xl sm:text-4xl">Harsh &amp; Monika</h2>
          <p className="mt-3 text-[0.8rem] tracking-[0.24em] text-muted-foreground">
            10 DECEMBER 2026
          </p>
          <button
            type="button"
            onClick={onReplay}
            className="eyebrow mt-12 cursor-pointer transition-colors hover:text-foreground"
          >
            Replay the invitation
          </button>
        </Reveal>
      </footer>
    </div>
  );
}
