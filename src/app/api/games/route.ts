import { NextResponse } from "next/server";

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
    const TABLE_NAME = "Partidos";

    const allRecords: AirtableRecord<PartidoFields>[] = [];
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
          { error: "Error al obtener los partidos", details: errorData },
          { status: 500 }
        );
      }

      const data: AirtableResponse<PartidoFields> = await response.json();

      allRecords.push(...data.records);
      offset = data.offset;
    } while (offset);

    const partidos = allRecords.map((record) => ({
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
