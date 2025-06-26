import { NextResponse } from "next/server";

type ConcursoFields = {
  Nombre: string;
  Pagado: boolean;
  ASemis: boolean;
  ALaFinal: boolean;
  Ronda1: number;
  Ronda2: number;
  Ronda3: number;
};

type AirtableRecord<T> = {
  id: string;
  fields: T;
  createdTime: string;
};

type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
  offset?: string;
};

export async function GET() {
  try {
    const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
    const BASE_ID = process.env.AIRTABLE_BASE_ID!;
    const TABLE_NAME = "Concurso";

    const allRecords: AirtableRecord<ConcursoFields>[] = [];
    let offset: string | undefined = undefined;

    do {
      const url = new URL(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`
      );
      if (offset) {
        url.searchParams.set("offset", offset);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      });

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
      allRecords.push(...data.records);
      offset = data.offset;
    } while (offset);

    const concursantes = allRecords.map((record) => ({
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
