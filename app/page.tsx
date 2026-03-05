"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { groups } from "@/lib/groups";

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const isInvited = (inputName: string) => {
    const normalized = inputName.trim().toLowerCase();

    return groups.some((table) =>
      table.people.some((person) => {
        const full = person.toLowerCase();
        const firstName = full.split(" ")[0];

        return (
          normalized === full ||        // nombre completo
          normalized === firstName      // solo primer nombre
        );
      })
    );
  };

  const handleSubmit = () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Por favor escribe tu nombre.");
      return;
    }

    const invited = isInvited(trimmed);

    if (!invited) {
      setError("No encontramos tu invitación. Verifica tu nombre.");
      return;
    }

    localStorage.setItem(
      "guest",
      JSON.stringify({
        name: trimmed
      })
    );

    router.push("/hero");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl md:text-6xl font-[Cormorant_Garamond] text-black">
        Bienvenido
      </h1>

      <p className="mt-6 text-neutral-600 text-lg">
        Antes de comenzar, dinos tu nombre
      </p>

      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        className="mt-8 w-full max-w-md px-6 py-4 
                   bg-transparent 
                   border-b border-neutral-400 
                   focus:outline-none 
                   text-center text-lg"
      />

      {error && (
        <p className="mt-4 text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-10 px-12 py-3 
                   border border-black 
                   rounded-full 
                   text-black 
                   hover:bg-black hover:text-white 
                   transition-all duration-300"
      >
        Continuar
      </button>

    </main>
  );
}