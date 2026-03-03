"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) return;

    localStorage.setItem("guest", JSON.stringify({ name }));
    router.push("/hero"); // 👈 ahora va al hero
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
        onChange={(e) => setName(e.target.value)}
        className="mt-8 w-full max-w-md px-6 py-4 
                   bg-transparent 
                   border-b border-neutral-400 
                   focus:outline-none 
                   text-center text-lg"
      />

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
