import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "La gestion des articles passe par les Server Actions protegees de l'espace Admin." },
    { status: 405 }
  );
}
