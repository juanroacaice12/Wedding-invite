import "./globals.css";
import FloatingAssistant from "@/components/FloatingAssistant";

export const metadata = {
  title: "Luisa & Juan | Nuestra boda",
  description: "Invitación de boda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="relative min-h-screen bg-[#F6F3EE] text-[#2F2F2F] antialiased overflow-x-hidden">

        {/* ================= FLORAL DECOR ================= */}

        {/* TOP */}
        <img
          src="/floral.svg"
          alt=""
          className="absolute top-[-140px] left-1/2 -translate-x-1/2
                     w-[480px] md:w-[650px]
                     opacity-[0.03]
                     pointer-events-none select-none
                     grayscale brightness-75"
        />

        {/* BOTTOM */}
        <img
          src="/floral.svg"
          alt=""
          className="absolute bottom-[-140px] left-1/2 -translate-x-1/2
                     w-[480px] md:w-[650px]
                     opacity-[0.03]
                     rotate-180
                     pointer-events-none select-none
                     grayscale brightness-75"
        />

        {/* LEFT */}
        <img
          src="/floral.svg"
          alt=""
          className="absolute left-[-220px] top-1/2 -translate-y-1/2
                     w-[500px] md:w-[650px]
                     opacity-[0.025]
                     -rotate-90
                     pointer-events-none select-none
                     grayscale brightness-75"
        />

        {/* RIGHT */}
        <img
          src="/floral.svg"
          alt=""
          className="absolute right-[-220px] top-1/2 -translate-y-1/2
                     w-[500px] md:w-[650px]
                     opacity-[0.025]
                     rotate-90
                     pointer-events-none select-none
                     grayscale brightness-75"
        />

        {/* ================= CONTENIDO ================= */}

        <div className="relative z-10">
          {children}
        </div>

        {/* ================= BOT GLOBAL ================= */}
        {/* El bot decide solo cuándo aparecer */}
        <FloatingAssistant />

      </body>
    </html>
  );
}