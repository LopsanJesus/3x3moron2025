import { NextResponse } from "next/server";

// Define el tipo para los campos del partido
type PartidoFields = {
  Hora: string;
  Pista: string;
  Categoría: string;
  Fase: string;
  Nombre1: string;
  Puntos1: number;
  Nombre2: string;
  Puntos2: number;
};

// Define el tipo para un registro de Airtable
type AirtableRecord<T> = {
  id: string;
  fields: T;
  createdTime: string;
};

type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
};

export async function GET() {
  try {
    const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
    const BASE_ID = process.env.AIRTABLE_BASE_ID!;
    const TABLE_NAME = "Partidos";

    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error al obtener los partidos", details: errorData },
        { status: 500 }
      );
    }

    const data: AirtableResponse<PartidoFields> = await response.json();

    const partidos = data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    return NextResponse.json(partidos);
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
