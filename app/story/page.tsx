"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StoryPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("guest");
    if (!raw) return;

    try {
      const guest = JSON.parse(raw);
      if (guest?.name) setName(guest.name);
    } catch {}
  }, []);

  const stories = [
    {
      image: "/1.jpeg",
      text: "Todo comenzó hace 365 días cuando nuestras vidas recién comenzaban a conectarse, pero seguimos pensando que nos conocemos hace mucho más tiempo atrás…",
    },
    {
      image: "/2.jpeg",
      text: "Ese día supimos que Dios nos tenía listos para encontrarnos y tenernos el uno al otro para estar por siempre y para siempre juntos.",
    },
    {
      image: "/3.jpeg",
      text: "Hemos crecido juntos y ahora daremos un paso muy importante en nuestras vidas, donde nos apegamos a Dios y nos dirigimos al mundo como esposos.",
    },
    {
      image: "/4.jpeg",
      text: "Gracias por acompañarnos en esta historia que apenas comienza…",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-24 flex flex-col items-center animate-fade-in">

      <h1 className="text-3xl md:text-4xl font-[Cormorant_Garamond] text-black mb-16 text-center">
        Nuestra historia
        {name && (
          <span className="block text-base text-neutral-500 mt-2 font-sans">
            {name}
          </span>
        )}
      </h1>

      <div className="flex flex-col gap-16 w-full max-w-md">
        {stories.map((story, index) => (
          <div
            key={index}
            className="
              bg-white/70
              border border-neutral-200
              rounded-3xl overflow-hidden
              backdrop-blur-sm
              transition-all duration-300
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:-translate-y-2
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            "
          >
            <div className="relative w-full h-72">
              <Image
                src={story.image}
                alt={`Nuestra historia ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>

            <div className="p-6 text-center">
              <p className="text-neutral-700 leading-relaxed text-base font-light">
                {story.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <Link
          href="/info"
          className="
            inline-flex items-center justify-center gap-2
            px-10 py-4 rounded-full
            border border-black
            text-black font-medium
            transition-all duration-300
            hover:bg-black hover:text-white
          "
        >
          Siguiente
        </Link>
      </div>

    </main>
  );
}