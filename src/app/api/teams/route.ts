import { Team } from "@/types";
import { NextResponse } from "next/server";

type AirtableRecord<T> = {
  id: string;
  fields: T;
};

type AirtableTeamFields = {
  Nombre: string;
  Categoría: Team["category"];
  Status: Team["status"];
};

type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
};

export async function GET() {
  try {
    const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
    const TABLE_NAME = "Equipos";

    const url = new URL(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`
    );

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

    const data: AirtableResponse<AirtableTeamFields> = await response.json();

    const teams: Team[] = data.records.map((record) => ({
      id: record.id,
      name: record.fields.Nombre,
      category: record.fields.Categoría,
      status: record.fields.Status,
    }));

    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching Airtable teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
