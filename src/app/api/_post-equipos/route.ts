import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nombre, categoria, whatsapp, local, jugadores } = await req.json();

    const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
    const BASE_ID = process.env.AIRTABLE_BASE_ID!;
    const TABLE_NAME = "Equipos";

    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Nombre: nombre,
            Categoría: categoria,
            Whatsapp: whatsapp,
            Local: local,
            Jugadores: jugadores,
            Status: "En espera", // valor por defecto
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error al crear registro", details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno en el servidor",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
