"use client";
import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { capabilities } from "@/data/capabilities";
export default function ContactForm() {
  const [status, setStatus] = useState(""),
    [copied, setCopied] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim(),
      email = String(form.get("email") ?? "").trim(),
      details = String(form.get("message") ?? "").trim(),
      service = String(form.get("service") ?? "");
    if (!name || !details) {
      setStatus("Please add your name and a little about your project.");
      return;
    }
    const body = `Hello Quentagon,\n\n${details}\n\nInterested in: ${service}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry: " + service)}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email draft is ready to open. Review it in your email app and send when you are ready. If no app opens, email us directly below.",
    );
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setStatus("Email address copied.");
    } catch {
      setStatus("You can copy the email address shown below.");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input name="name" autoComplete="name" placeholder="Name" required maxLength={100} />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        What do you have in mind?
        <select name="service" defaultValue="Let's work it out">
          <option>Let&apos;s work it out</option>
          {capabilities.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      <label>
        A little about your project
        <textarea
          name="message"
          rows={3}
          placeholder="What needs to work better?"
          required
          minLength={10}
          maxLength={3000}
        />
      </label>
      <div className="form-bottom">
        <p>
          Opens a draft in your email app.
          <br />
          Nothing is sent automatically.
        </p>
        <button className="button button-primary" type="submit">
          Open email draft <ArrowUpRight size={18} />
        </button>
      </div>
      <p className="form-status" role="status">
        {status}
      </p>
      <div className="direct-contact">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <button
          className="icon-button"
          type="button"
          aria-label="Copy email address"
          onClick={copyEmail}
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
        </button>
      </div>
    </form>
  );
}
