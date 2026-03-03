import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, mesa, rsvp } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [name, mesa || "Sin mesa", rsvp, new Date().toLocaleString()],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error guardando:", error);
    return NextResponse.json({ error: "Error guardando" }, { status: 500 });
  }
}