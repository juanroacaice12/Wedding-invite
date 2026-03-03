import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, guestName } = await req.json();
    const lower = message.toLowerCase();

    // ===============================
    // 🔥 CRONOGRAMA CONTROLADO
    // ===============================
    if (
      lower.includes("cronograma") ||
      lower.includes("agenda") ||
      lower.includes("actividades") ||
      lower.includes("programa") ||
      lower.includes("horario") ||
      lower.includes("qué se hará") ||
      lower.includes("que se hara")
    ) {
      return NextResponse.json({
        reply: `Claro ${guestName} 🤍  

Este será el cronograma del gran día ✨

Hora inicio ceremonia: 7:00 p. m.  
Hora inicio recepción: 8:00 p. m.  

Cóctel de bienvenida: 8:00 – 8:30 p. m.  
Entradas: 8:30 – 9:00 p. m.  
Palabras: 9:00 – 9:15 p. m.  
Plato fuerte y bebida: 9:15 – 10:00 p. m.  
Banda en vivo: 10:00 – 11:30 p. m.  
Torta: 11:00 p. m.  
Libre (música): 11:30 p. m. – 1:00 a. m.

Será una noche inolvidable ✨💍`,
      });
    }

    // ===============================
    // 🤖 IA PREMIUM
    // ===============================
    const systemPrompt = `
Eres Liebe, concierge virtual premium desarrollado por Zayrox para acompañar invitados en una boda.

Tu comunicación debe ser:
- elegante
- clara
- cálida
- en español
- sin sonar robótico

Tu misión es ayudar con:
• horarios
• ubicaciones
• código de vestimenta
• dinámica del evento

Reglas IMPORTANTES:

1. Si preguntan por la IGLESIA o CEREMONIA:

Responde SIEMPRE incluyendo este link:
https://maps.app.goo.gl/Bax1stRTr9DEkhYD9?g_st=ic

2. Si preguntan por la RECEPCIÓN:

Responde SIEMPRE incluyendo este link:
https://maps.app.goo.gl/9YmVTTeQqWgsmcYT6?g_st=ic

3. Código de vestimenta:

El código es:
• elegante
• obligatorio color negro

Si es mujer:
Sugiere vestido largo, midi o elegante negro.

Si es hombre:
Sugiere traje negro, camisa blanca o total black.

4. El invitado se llama: ${guestName}

Puedes usar su nombre cuando tenga sentido,
pero NO saludes en cada respuesta.

5. Mantén respuestas cortas, útiles y premium.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("BOT ERROR:", err);
    return NextResponse.json(
      { reply: "Estoy teniendo un pequeño inconveniente 🤍 intenta nuevamente." },
      { status: 500 }
    );
  }
}