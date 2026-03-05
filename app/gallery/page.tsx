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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 4);
    setSelectedFiles(fileArray);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // 👈 guardar referencia del form

    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const formData = new FormData();
      formData.append("name", name);

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const message = (
        form.elements.namedItem("message") as HTMLTextAreaElement
      ).value;

      formData.append("message", message);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error en el envío");
      }

      setSuccess(true);
      setError(false);

      setSelectedFiles([]);
      setPreviewUrls([]);

      form.reset(); // 👈 ahora funciona

    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-24 flex flex-col items-center animate-fade-in">

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

      {/* PREVIEW */}
      <section className="w-full max-w-4xl mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[0,1,2,3].map((i) => (
            <div
              key={i}
              className="
                aspect-square
                bg-white
                border border-neutral-200
                rounded-2xl
                overflow-hidden
                flex items-center justify-center
              "
            >
              {previewUrls[i] ? (
                <img
                  src={previewUrls[i]}
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

      {/* FORM */}
      <section className="w-full max-w-lg">
        <div className="bg-white border border-neutral-200 rounded-3xl p-10 shadow">

          <h2 className="text-2xl font-[Cormorant_Garamond] text-black text-center mb-6">
            Déjanos un recuerdo
          </h2>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="name" value={name} />

            <div className="mb-6">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full"
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
              className="w-full rounded-xl border border-neutral-300 px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full py-3 border border-black rounded-full"
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