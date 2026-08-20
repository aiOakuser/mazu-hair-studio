"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-sm text-text-secondary">Thanks — we&apos;ll get back to you soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <div>
        <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-wide text-text-secondary">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-wide text-text-secondary">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-wide text-text-secondary">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-xl border border-border p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ink-on-fill transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or call us instead.</p>
      )}
    </form>
  );
}
