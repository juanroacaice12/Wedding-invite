"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AgendaPage() {
  const weddingDate = new Date("2026-05-15T19:00:00-05:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      if (diff <= 0) {
        setIsEventPassed(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const agenda = [
    {
      time: "7:00 p.m.",
      title: "Inicio de la ceremonia",
      details: "Comienza la ceremonia religiosa",
    },
    {
      time: "8:00 p.m.",
      title: "Inicio de la recepción",
      details: "Recepción de invitados",
    },
    {
      time: "8:00 – 8:30 p.m.",
      title: "Cóctel de bienvenida",
      details: "Disfruta de bebidas y aperitivos",
    },
    {
      time: "8:30 – 9:00 p.m.",
      title: "Entradas",
      details: "Inicio de la dinámica de entradas",
    },
    {
      time: "9:00 – 9:15 p.m.",
      title: "Palabras",
      details: "Momento especial de mensajes",
    },
    {
      time: "9:15 – 10:00 p.m.",
      title: "Plato fuerte y bebida",
      details: "Cena principal",
    },
    {
      time: "10:00 – 11:30 p.m.",
      title: "Banda en vivo",
      details: "Música en vivo para celebrar",
    },
    {
      time: "11:00 p.m.",
      title: "Torta",
      details: "Momento dulce de la noche",
    },
    {
      time: "11:30 p.m. – 1:00 a.m.",
      title: "Celebración libre",
      details: "Música, baile y fiesta",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-24 flex flex-col items-center animate-fade-in">

      {/* ================= COUNTDOWN ================= */}
      <section className="text-center mb-24">

        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-4">
          Cuenta regresiva
        </p>

        <h1 className="text-4xl font-[Cormorant_Garamond] text-black mb-10">
          El gran día
        </h1>

        {isEventPassed ? (
          <p className="text-xl font-[Cormorant_Garamond] text-black">
            ✨ Hoy celebramos nuestro amor ✨
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-[Cormorant_Garamond] text-black">
                  {value}
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mt-2">
                  {label}
                </div>
              </div>
            ))}

          </div>
        )}
      </section>

      {/* ================= AGENDA ================= */}
      <section className="w-full max-w-2xl">

        <h2 className="text-3xl font-[Cormorant_Garamond] text-black text-center mb-16">
          Agenda del día
        </h2>

        <div className="relative">

          {/* Línea central */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-neutral-300" />

          <div className="flex flex-col gap-14">

            {agenda.map((item, index) => (
              <div key={index} className="relative pl-14">

                {/* Punto */}
                <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-black" />

                <div className="
                  bg-white
                  border border-neutral-200
                  rounded-2xl p-6
                  shadow-[0_6px_18px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                  transition-all duration-300
                ">

                  <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">
                    {item.time}
                  </p>

                  <h3 className="text-xl font-[Cormorant_Garamond] text-black mb-2">
                    {item.title}
                  </h3>

                  <p className="text-neutral-600 text-sm">
                    {item.details}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <div className="mt-24 text-center">

        <p className="text-neutral-600 text-sm mb-6">
          Queremos guardar este momento contigo
        </p>

        <Link
          href="/gallery"
          className="
            inline-block px-12 py-3
            border border-black
            rounded-full
            text-black font-medium
            hover:bg-black hover:text-white
            transition-all duration-300
          "
        >
          Ir a la galería
        </Link>

      </div>

    </main>
  );
}