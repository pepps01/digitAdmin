import Head from "next/head";
import Link from "next/link";
import { ReactNode, useState } from "react";

export const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/earn-with-cue", label: "Earn with Cue" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy" },
];

const PublicLayout = ({
  title,
  children,
  hero = false,
}: {
  title: string;
  children: ReactNode;
  hero?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-grey90">
      <Head>
        <title>{title === "Home" ? "Cue" : `${title} | Cue`}</title>
        <meta
          name="description"
          content="Cue is a ride-hailing service built around safety for both commuters and drivers."
        />
      </Head>

      <header
        className={
          hero
            ? "absolute top-0 left-0 right-0 z-10 text-white"
            : "bg-cue text-white"
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            Cue
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {publicLinks.map(l => (
              <Link key={l.href} href={l.href} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label="Toggle menu"
            className="text-2xl md:hidden"
            onClick={() => setOpen(o => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 bg-cueDark px-6 py-5 text-sm md:hidden">
            {publicLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-cueDark text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-bold">Cue</p>
            <p className="mt-1 text-sm text-white/70">
              Safe &amp; easy ride hailing.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {publicLinks.slice(1).map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Cue. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PublicLayout;
