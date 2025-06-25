import { NextResponse } from "next/server";

// Define el tipo para los campos del concurso
type ConcursoFields = {
  Nombre: string;
  Pagado: boolean;
  ASemis: boolean;
  ALaFinal: boolean;
  Ronda1: number;
  Ronda2: number;
  Ronda3: number;
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
    const TABLE_NAME = "Concurso";

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
        {
          error: "Error al obtener los datos del concurso",
          details: errorData,
        },
        { status: 500 }
      );
    }

    const data: AirtableResponse<ConcursoFields> = await response.json();

    const concursantes = data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    return NextResponse.json(concursantes);
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
