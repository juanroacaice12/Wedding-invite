"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("guest");
    if (!raw) {
      router.push("/");
      return;
    }

    try {
      const guest = JSON.parse(raw);
      if (!guest.name) {
        router.push("/");
        return;
      }
      setName(guest.name);
    } catch {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <p className="tracking-[0.3em] text-neutral-500 text-xs mb-4">
        NOS CASAMOS
      </p>

      <h1 className="text-4xl md:text-5xl font-[Cormorant_Garamond] text-black mb-2">
        Luisa Fernanda
      </h1>

      <span className="text-2xl text-neutral-400 mb-2">&</span>

      <h2 className="text-4xl md:text-5xl font-[Cormorant_Garamond] text-black mb-6">
        Juan Camilo
      </h2>

      <p className="text-neutral-600 mb-10 max-w-sm text-sm">
        {name}, nos encantaría que nos acompañes en este día tan especial
      </p>

      <button
        onClick={() => router.push("/story")}
        className="
          px-10 py-3 rounded-full
          border border-black
          text-black font-medium text-sm
          hover:bg-black hover:text-white
          transition
        "
      >
        Iniciar la historia
      </button>

    </main>
  );
}