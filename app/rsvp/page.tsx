"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RSVPPage() {
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const [guestName, setGuestName] = useState("Invitado");

  useEffect(() => {
    const raw = localStorage.getItem("guest");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.name) setGuestName(parsed.name);
      } catch {}
    }
  }, []);

  const sendToSheet = async (answer: "Sí" | "No") => {
    await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: guestName,
        mesa: "Asignada",
        rsvp: answer,
      }),
    });
  };

  const handleYes = async () => {
    setResponse("yes");
    await sendToSheet("Sí");
  };

  const handleNo = async () => {
    setResponse("no");
    await sendToSheet("No");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 animate-fade-in">

      <div className="max-w-md w-full text-center space-y-10">

        {!response && (
          <>
            <h1 className="text-3xl font-[Cormorant_Garamond] text-black">
              {guestName}, ¿nos acompañas?
            </h1>

            <div className="flex flex-col gap-4 mt-6">

              <button
                onClick={handleYes}
                className="
                  px-10 py-3 rounded-full
                  border border-black
                  text-black font-medium
                  hover:bg-black hover:text-white
                  transition-all duration-300
                "
              >
                Sí asistiré
              </button>

              <button
                onClick={handleNo}
                className="
                  px-10 py-3 rounded-full
                  border border-neutral-400
                  text-neutral-600
                  hover:bg-neutral-100
                  transition-all duration-300
                "
              >
                No podré asistir
              </button>

            </div>
          </>
        )}

        {response === "yes" && (
          <div className="space-y-6">

            <h2 className="text-2xl font-[Cormorant_Garamond] text-black">
              ¡Gracias por confirmar!
            </h2>

            <p className="text-neutral-600">
              Nos llena de alegría saber que estarás con nosotros 🤍
            </p>

            <Link
              href="/agenda"
              className="
                inline-block mt-4 px-10 py-3
                border border-black
                rounded-full
                text-black
                hover:bg-black hover:text-white
                transition-all duration-300
              "
            >
              Ver agenda
            </Link>
          </div>
        )}

        {response === "no" && (
          <div className="space-y-4">
            <h2 className="text-xl font-[Cormorant_Garamond] text-black">
              Gracias por avisarnos
            </h2>
            <p className="text-neutral-600">
              Te llevamos en el corazón 🤍
            </p>
          </div>
        )}

      </div>
    </main>
  );
}