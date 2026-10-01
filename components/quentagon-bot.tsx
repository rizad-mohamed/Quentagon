"use client";

import { useState } from "react";
import { ChatCircleDots, WhatsappLogo, X } from "@phosphor-icons/react";

export default function QuentagonBot() {
  const [open, setOpen] = useState(false);
  return (
    <aside className="bot-dock" aria-label="Quentagon assistant">
      {open && (
        <div className="bot-panel" id="bot-panel">
          <div className="bot-panel-top">
            <span className="bot-avatar">
              <ChatCircleDots size={21} weight="duotone" />
            </span>
            <div>
              <strong>Quentagon Bot</strong>
              <small>COMING SOON</small>
            </div>
            <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <p>We&apos;re building a quicker way to explore services and start a conversation.</p>
          <div className="bot-message">
            <span className="bot-message-dot" /> Chat and WhatsApp support are on the way.
          </div>
          <a href="#project-brief" onClick={() => setOpen(false)}>
            Start a project now
          </a>
        </div>
      )}
      <button
        className="bot-trigger"
        type="button"
        aria-label={open ? "Close Quentagon Bot" : "Open Quentagon Bot preview"}
        aria-expanded={open}
        aria-controls="bot-panel"
        onClick={() => setOpen(!open)}
      >
        <ChatCircleDots size={25} weight="duotone" />
        <span className="bot-whatsapp">
          <WhatsappLogo size={15} weight="fill" />
        </span>
        <span className="bot-indicator" />
      </button>
    </aside>
  );
}
