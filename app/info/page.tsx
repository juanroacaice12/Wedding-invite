"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { groups } from "@/lib/groups";
import { normalize } from "@/lib/normalize";

type Guest = {
  name: string;
};

export default function InfoPage() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [companions, setCompanions] = useState<string[]>([]);
  const [tableName, setTableName] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("guest");
    if (!raw) return;

    try {
      const g = JSON.parse(raw);
      if (!g.name) return;

      setGuest({ name: g.name });

      const normalizedInput = normalize(g.name);

      const group = groups.find(gr =>
        gr.people.some(person => {
          const normalizedPerson = normalize(person);
          const personParts = normalizedPerson.split(" ");
          const inputParts = normalizedInput.split(" ");

          return inputParts.every(part =>
            personParts.some(p => p.startsWith(part))
          );
        })
      );

      if (group) {
        setCompanions(group.people);
        setTableName(group.name);
        setNotFound(false);
      } else {
        setCompanions([]);
        setTableName(null);
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, []);

  if (!guest) return null;

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center animate-fade-in">

      {/* TÍTULO */}
      <div className="max-w-md mx-auto text-center mb-16">
        <p className="uppercase tracking-[0.3em] text-xs text-neutral-500 mb-4">
          Detalles del evento
        </p>

        <h1 className="font-[Cormorant_Garamond] text-4xl text-black">
          Información
        </h1>

        <p className="mt-4 text-sm text-neutral-600">
          {guest.name}, nos encantaría contar contigo
        </p>
      </div>

      <div className="w-full max-w-md space-y-10">

        {notFound && (
          <div className="bg-white/70 border border-red-300 rounded-3xl p-6 text-center shadow-sm">
            <p className="text-red-600 font-medium mb-2">
              Invitación no encontrada
            </p>
            <p className="text-sm text-neutral-600">
              No encontramos tu nombre en la lista.
            </p>
          </div>
        )}

        {!notFound && (
          <>
            {/* CEREMONIA */}
            <div className="
              bg-white/70
              border border-neutral-200
              rounded-3xl p-8
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
              transition-all duration-300
            ">
              <h2 className="font-[Cormorant_Garamond] text-xl text-black mb-3">
                Ceremonia
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Parroquia Nuestra Señora de Chiquinquirá <br />
                15 de mayo · 7:00 p.m. <br />
                El Tablazo, Rionegro
              </p>
            </div>

            {/* RECEPCIÓN */}
            <div className="
              bg-white/70
              border border-neutral-200
              rounded-3xl p-8
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
              transition-all duration-300
            ">
              <h2 className="font-[Cormorant_Garamond] text-xl text-black mb-3">
                Recepción
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Eventos La Villa <br />
                15 de mayo · 8:00 p.m. <br />
                Llanogrande, Rionegro
              </p>
            </div>

            {/* DRESS CODE */}
            <div className="
              bg-white/70
              border border-neutral-200
              rounded-3xl p-8
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
              transition-all duration-300
            ">
              <h2 className="font-[Cormorant_Garamond] text-xl text-black mb-3">
                Codigo de vestimenta
              </h2>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Elegante · Formal <br />
                <span className="text-neutral-500">
                  Color obligatorio: negro
                </span>
              </p>
            </div>

            {/* MESA */}
            {tableName && (
              <div className="
                bg-white/80
                border border-neutral-200
                rounded-3xl p-6 text-center
                shadow-[0_6px_18px_rgba(0,0,0,0.05)]
              ">
                <p className="text-sm text-neutral-500">
                  Tu mesa asignada
                </p>
                <p className="text-3xl font-[Cormorant_Garamond] text-black mt-2">
                  {tableName}
                </p>
              </div>
            )}

            {/* BOTÓN */}
            <div className="text-center pt-10">
              <Link
                href="/rsvp"
                className="
                  inline-block px-12 py-3 rounded-full
                  border border-black
                  text-black font-medium
                  hover:bg-black hover:text-white
                  transition-all duration-300
                "
              >
                Siguiente
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}