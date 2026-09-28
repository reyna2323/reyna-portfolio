import Link from "next/link";
import { Atmosphere } from "@/components/desk/Atmosphere";

/** A page torn out of the notebook: shown for any address that doesn't exist. */
export default function NotFound() {
  return (
    <main className="fixed inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-deepplum via-[#301c3a] to-plum px-4">
      <Atmosphere />
      <div className="relative w-full max-w-md -rotate-2 rounded-md border border-pink/40 bg-paper px-7 pb-7 pt-9 text-center shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] graph-paper">
        <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-lavender/70" />
        <p className="font-mono text-xs text-rose-ink">pg. 404</p>
        <h1 className="mt-1 font-hand text-hand-xl text-ink-strong">this page slipped out of my notebook</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          The link might be old, or it might have a typo. Everything I&apos;ve written down is back on the desk.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-ink-soft/60 px-4 py-1.5 text-sm font-semibold text-ink-strong transition-colors hover:border-ink-strong hover:bg-ink-strong/10"
        >
          ← back to the desk
        </Link>
      </div>
    </main>
  );
}
