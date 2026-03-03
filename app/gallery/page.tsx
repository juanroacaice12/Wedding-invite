"use client";

import { useEffect, useState } from "react";

export default function GaleriaPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("guest");
    if (!raw) return;

    try {
      const guest = JSON.parse(raw);
      if (guest?.name) setName(guest.name);
    } catch {}
  }, []);

  // Manejar selección de imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 4); // máximo 4
    setSelectedFiles(fileArray);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData();
    formData.append("name", name);

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const message = (
      e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement
    ).value;

    formData.append("message", message);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error");

      setSuccess(true);
      setSelectedFiles([]);
      setPreviewUrls([]);
      e.currentTarget.reset();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-24 flex flex-col items-center animate-fade-in">
      {/* HEADER */}
      <div className="max-w-xl mx-auto text-center mb-20">
        <p className="uppercase tracking-[0.35em] text-xs text-neutral-500 mb-4">
          Gracias por acompañarnos
        </p>

        <h1 className="text-4xl font-[Cormorant_Garamond] text-black mb-6">
          Galería
        </h1>

        {name && (
          <p className="text-neutral-600 text-sm leading-relaxed max-w-md mx-auto">
            {name}, gracias por ser parte de este día tan especial.
            Nos encantaría guardar tus recuerdos y tus palabras para siempre.
          </p>
        )}
      </div>

      {/* GRID DE PREVIEW */}
      <section className="w-full max-w-4xl mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                aspect-square
                bg-white
                border border-neutral-200
                rounded-2xl
                overflow-hidden
                flex items-center justify-center
                shadow-[0_6px_18px_rgba(0,0,0,0.05)]
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              {previewUrls[i] ? (
                <img
                  src={previewUrls[i]}
                  alt={`Preview ${i}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-neutral-400 text-sm">
                  Foto {i + 1}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          Aquí aparecerán los recuerdos que compartan con nosotros
        </p>
      </section>

      {/* FORMULARIO */}
      <section className="w-full max-w-lg">
        <div
          className="
          bg-white
          border border-neutral-200
          rounded-3xl p-10
          shadow-[0_10px_30px_rgba(0,0,0,0.06)]
        "
        >
          <h2 className="text-2xl font-[Cormorant_Garamond] text-black text-center mb-6">
            Déjanos un recuerdo
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="name" value={name} />

            {/* INPUT MULTIPLE */}
            <div className="mb-6">
              <input
                type="file"
                name="files"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="
                  w-full text-sm text-neutral-600
                  file:mr-4 file:py-2 file:px-6
                  file:rounded-full file:border file:border-black
                  file:bg-white file:text-black
                  file:font-medium
                  hover:file:bg-black hover:file:text-white
                  transition-all
                "
              />
              <p className="text-xs text-neutral-400 mt-2">
                Puedes seleccionar hasta 4 fotos 🤍
              </p>
            </div>

            <textarea
              name="message"
              rows={4}
              required
              placeholder="Escribe aquí tu mensaje para los novios…"
              className="
                w-full rounded-xl
                border border-neutral-300
                px-4 py-3
                text-sm text-black
                placeholder:text-neutral-400
                focus:outline-none focus:border-black
                transition
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                mt-8 w-full py-3
                border border-black
                rounded-full
                text-black font-medium
                hover:bg-black hover:text-white
                transition-all duration-300
                disabled:opacity-50
              "
            >
              {loading ? "Enviando..." : "Enviar recuerdo"}
            </button>
          </form>

          {success && (
            <p className="mt-6 text-green-600 text-sm text-center">
              Recuerdo enviado correctamente 🤍
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-600 text-sm text-center">
              Ocurrió un error. Intenta nuevamente.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}