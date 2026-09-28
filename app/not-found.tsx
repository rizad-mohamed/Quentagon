import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <p className="eyebrow">404</p>
      <h1>This page is outside the plan.</h1>
      <p>Let&apos;s get you back to Quentagon.</p>
      <Link className="button button-primary" href="/">
        Return home
      </Link>
    </main>
  );
}
