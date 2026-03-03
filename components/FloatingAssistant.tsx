"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Msg = {
  from: "bot" | "user";
  text: string;
};

type Guest = {
  name: string;
};

export default function FloatingAssistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [guest, setGuest] = useState<Guest>({ name: "" });
  const [loading, setLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  // ===================== MOUNT =====================
  useEffect(() => {
    setMounted(true);
  }, []);

  // ===================== ESCUCHAR CAMBIOS DE LOCALSTORAGE =====================
  useEffect(() => {
    function checkGuest() {
      const raw = localStorage.getItem("guest");
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);
        if (!parsed?.name) return;

        // 🔥 Solo actualizar si cambió el nombre
        if (parsed.name !== guest.name) {
          setGuest({ name: parsed.name });

          setMessages([
            {
              from: "bot",
              text: `Hola ${parsed.name} 🤍

Soy Liebe, concierge virtual desarrollado por Zayrox.

Estoy aquí para acompañarte durante toda la invitación ✨`,
            },
          ]);

          setHasNotification(true);
        }
      } catch {}
    }

    // Revisar cada 500ms (ultra ligero)
    const interval = setInterval(checkGuest, 500);

    return () => clearInterval(interval);
  }, [guest.name]);

  if (!mounted || !guest.name) return null;

  // ===================== ENVIAR =====================
  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          guestName: guest.name,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Estoy teniendo un pequeño inconveniente 🤍 intenta nuevamente.",
        },
      ]);
    }

    setLoading(false);
  }

  function renderTextWithLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 8,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: 0.3,
              color: "#111",
              textDecoration: "none",
              borderBottom: "1px solid #111",
              paddingBottom: 2,
            }}
          >
            ✨ Ver ubicación en Google Maps →
          </a>
        );
      }
      return part;
    });
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 2147483647,
      }}
    >
      {/* BOTÓN */}
      <button
        onClick={() => {
          setOpen(!open);
          setHasNotification(false);
        }}
        style={{
          position: "relative",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#111",
          color: "#fff",
          fontSize: 22,
          border: "1px solid #e5e5e5",
          cursor: "pointer",
          boxShadow: "0 12px 30px rgba(0,0,0,.2)",
        }}
      >
        ✦

        {/* 🔴 NOTIFICACIÓN */}
        {hasNotification && (
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff2d2d",
              boxShadow: "0 0 8px rgba(255,45,45,.7)",
            }}
          />
        )}
      </button>

      {/* CHAT */}
      <div
        style={{
          position: "absolute",
          bottom: 75,
          right: 0,
          width: 340,
          background: "#fff",
          borderRadius: 22,
          border: "1px solid #eee",
          boxShadow: "0 30px 80px rgba(0,0,0,.18)",
          padding: 18,
          fontSize: 14,
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.95)",
          pointerEvents: open ? "auto" : "none",
          transition: "all .35s ease",
        }}
      >
        <strong style={{ fontSize: 16 }}>
          Liebe · Zayrox
        </strong>

        <div
          style={{
            maxHeight: 260,
            overflowY: "auto",
            margin: "14px 0",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                marginBottom: 12,
                textAlign: m.from === "user" ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "12px 16px",
                  borderRadius: 16,
                  maxWidth: "90%",
                  whiteSpace: "pre-line",
                  background:
                    m.from === "user"
                      ? "#111"
                      : "linear-gradient(180deg,#fafafa,#f3f3f3)",
                  color: m.from === "user" ? "#fff" : "#222",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                {renderTextWithLinks(m.text)}
              </div>
            </div>
          ))}

          {loading && <p style={{ fontSize: 12 }}>escribiendo...</p>}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Pregúntame algo…"
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              fontSize: 13,
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}