"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, List, Sun, Moon, ArrowRight, LockKey } from "@phosphor-icons/react";
import { navigation } from "@/lib/site";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#top" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Quentagon home">
      <span className="brand-symbol">
        <Image src="/brand/quentagon-mark.webp" alt="" width={58} height={58} />
      </span>
      <span>
        quentagon<span className="brand-period">.</span>
      </span>
    </a>
  );
}
export default function Navigation() {
  const menu = useRef<HTMLDialogElement>(null),
    portal = useRef<HTMLDialogElement>(null);
  const [intent, setIntent] = useState("Sign in");
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("quentagon-theme", next);
    } catch {}
  }
  function showPortal(value: string) {
    setIntent(value);
    portal.current?.showModal();
  }
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
            >
              <Sun className="theme-sun" size={19} />
              <Moon className="theme-moon" size={19} />
            </button>
            <button className="sign-in" onClick={() => showPortal("Sign in")}>
              Sign in
            </button>
            <a className="nav-project button button-primary" href="#project-brief">
              Start a project <ArrowUpRight size={16} />
            </a>
            <button className="signup-button" onClick={() => showPortal("Sign up")}>
              Sign up <ArrowUpRight size={15} />
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label="Open navigation"
              onClick={() => menu.current?.showModal()}
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog ref={menu} className="mobile-menu" aria-labelledby="menu-title">
        <div className="dialog-top">
          <span id="menu-title">Explore Quentagon</span>
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => menu.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((link) => (
            <a key={link.href} href={link.href} onClick={() => menu.current?.close()}>
              {link.label}
              <ArrowUpRight size={24} />
            </a>
          ))}
        </nav>
        <div className="mobile-portal">
          <p>
            Client portal <span>Coming soon</span>
          </p>
          <button
            className="button button-primary"
            onClick={() => {
              menu.current?.close();
              showPortal("Sign in");
            }}
          >
            Sign in / Sign up <ArrowRight size={18} />
          </button>
        </div>
      </dialog>
      <dialog ref={portal} className="portal-dialog" aria-labelledby="portal-title">
        <div className="dialog-top">
          <span className="mono">CLIENT PORTAL</span>
          <button
            className="icon-button"
            aria-label="Close portal preview"
            onClick={() => portal.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <div className="portal-icon">
          <LockKey size={32} />
        </div>
        <span className="coming-soon">Coming soon</span>
        <h2 id="portal-title">
          Your project.
          <br />
          One shared space.
        </h2>
        <p>
          {intent} will be available when the Quentagon client portal launches. Project updates,
          milestones and approvals are part of the planned experience.
        </p>
        <a
          className="button button-primary"
          href="#contact"
          onClick={() => portal.current?.close()}
        >
          Start a project today <ArrowUpRight size={18} />
        </a>
        <p className="fine-print">No account is needed to start a conversation.</p>
      </dialog>
    </>
  );
}
