import {
  AirtableContestPlayer,
  AirtableGame,
  Category,
  ContestPlayer,
  Game,
} from "@/types";

export const validCategories = [
  "Senior",
  "Femenino",
  "Mini",
  "Peques",
] as const;

function isValidCategory(c: string): c is Category {
  return typeof c === "string" && validCategories.includes(c as Category);
}

export function transformAirtableToGame(records: AirtableGame[]): Game[] {
  return records.map((record, index) => {
    // Obtener categoría, si es array tomar el primer elemento
    let rawCategory: string;

    if (Array.isArray(record.Categoría)) {
      rawCategory = record.Categoría.length > 0 ? record.Categoría[0] : "";
    } else {
      rawCategory = record.Categoría;
    }

    let categoryStr: Category = isValidCategory(rawCategory)
      ? rawCategory
      : "Senior";

    // Validar categoría
    if (!isValidCategory(categoryStr)) {
      categoryStr = "Senior"; // valor por defecto
    }
    return {
      id: index + 1,
      teamA: record.Nombre1,
      teamB: record.Nombre2,
      scoreA: record.Puntos1,
      scoreB: record.Puntos2,
      category: categoryStr,
      time: transformSecondsToTime(record.Hora),
      court: record.Pista,
      phase: record.Fase,
    };
  });
}

export function transformAirtableToContestPlayers(
  records: AirtableContestPlayer[]
): ContestPlayer[] {
  return records.map((record, index) => {
    console.log("record", record);

    return {
      id: index + 1,
      name: record.Nombre,
      paid: record.Pagado,
      semifinal: record.ASemis,
      final: record.ALaFinal,
      score1: record.Ronda1,
      score2: record.Ronda2,
      score3: record.Ronda3,
    };
  });
}

export function transformSecondsToTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hrs)}:${pad(mins)}`;
}
