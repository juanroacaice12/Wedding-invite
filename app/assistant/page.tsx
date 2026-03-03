"use client";

import { useState } from "react";

const RESPONSES: Record<string, string> = {
  lugar: "La ceremonia será en la Parroquia Nuestra Señora de Chiquinquirá, y la recepción en Eventos La Villa, Llanogrande 💛",
  hora: "La ceremonia comienza a las 7:00 p.m. y la recepción a las 8:00 p.m. ⏰",
  dress: "El dress code es elegante – formal. Te sugerimos tonos oscuros, especialmente negro 🖤",
  regalo: "Tu presencia es el mejor regalo. Si deseas tener un detalle con nosotros, habrá información el día del evento 🤍",
};

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 🤍 Soy el asistente de la boda. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const lower = input.toLowerCase();

    let reply =
      Object.keys(RESPONSES).find((k) => lower.includes(k))
        ? RESPONSES[Object.keys(RESPONSES).find((k) => lower.includes(k))!]
        : "Con gusto te ayudamos el día del evento 💛 Si tienes otra pregunta, escríbeme.";

    setMessages((prev) => [
      ...prev,
      userMessage,
      { from: "bot", text: reply },
    ]);

    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 flex justify-center">

      <div className="w-full max-w-md bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-yellow-500/30 rounded-3xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="text-center py-6 border-b border-neutral-700">
          <h1 className="font-serif text-yellow-400 text-xl">
            Wedding Concierge 🤍
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Asistente del evento
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto text-sm">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                m.from === "user"
                  ? "bg-yellow-500 text-black ml-auto"
                  : "bg-neutral-800 text-neutral-200"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe tu pregunta…"
            className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-full text-sm outline-none"
          />
          <button
            onClick={send}
            className="px-5 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:brightness-110 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
