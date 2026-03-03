import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    let attachments = [];

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await resend.emails.send({
      from: "Boda <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
      subject: `Nuevo recuerdo de ${name}`,
      html: `
        <h2>Nuevo recuerdo</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    );
  }
}