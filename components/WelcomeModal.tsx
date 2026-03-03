"use client";

import { useMemo, useState } from "react";
import { groups } from "@/lib/groups";

type Guest = {
  name: string;
  guestKey: string;
  group: string;
  people: string[];
};

function normalize(str: string) {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function titleCase(str: string) {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export default function WelcomeModal({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const allPeople = useMemo(() => {
    return groups.flatMap(g => g.people.map(p => ({ group: g.name, person: p })));
  }, []);

  const handleConfirm = () => {
    const raw = name;
    const clean = raw.trim().replace(/\s+/g, " ");

    if (!clean) {
      setError("Por favor escribe tu nombre");
      return;
    }

    const typed = normalize(clean);

    // Match por "includes" (lo que ya tenías) pero más limpio
    const match = allPeople.find(({ person }) =>
      normalize(person).includes(typed)
    );

    // Si no encuentra por includes, intenta por coincidencia parcial inversa (ej: escriben "Sofia Q")
    const match2 =
      match ||
      allPeople.find(({ person }) =>
        typed.includes(normalize(person).split(" ")[0])
      );

    const picked = match2;

    const guest: Guest = {
      name: titleCase(clean),
      guestKey: typed, // llave estable para usar luego
      group: picked?.group || "Invitado especial",
      people:
        picked?.group
          ? groups.find(g => g.name === picked.group)?.people || []
          : [],
    };

    localStorage.setItem("guest", JSON.stringify(guest));
    onDone();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-neutral-900 border border-yellow-500/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_40px_rgba(234,179,8,0.2)]">
        <h2 className="text-2xl font-serif text-yellow-400 mb-4">
          Bienvenido 💛
        </h2>

        <p className="text-neutral-300 text-sm mb-6">
          ¿Cómo te llamas?
        </p>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          placeholder="Escribe tu nombre"
          className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-700 text-white focus:outline-none focus:border-yellow-400"
        />

        {error && (
          <p className="text-red-400 text-xs mt-2">{error}</p>
        )}

        <button
          onClick={handleConfirm}
          className="mt-6 w-full py-3 rounded-full bg-yellow-500 text-black font-semibold hover:brightness-110 transition"
        >
          Continuar ✨
        </button>
      </div>
    </div>
  );
}
