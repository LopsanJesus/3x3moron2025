import { NextResponse } from "next/server";

type AirtableRecord<T> = {
  id: string;
  fields: T;
};

type ConfigFields = {
  Name: string;
  Value: string;
};

type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
};

export async function GET() {
  try {
    const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN!;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
    const TABLE_NAME = "Config";

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
        { error: "Error al obtener la configuración", details: errorData },
        { status: 500 }
      );
    }

    const data: AirtableResponse<ConfigFields> = await response.json();

    const config = data.records.map((record) => ({
      id: record.id,
      name: record.fields.Name,
      value: record.fields.Value,
    }));

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching Airtable config:", error);
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}
