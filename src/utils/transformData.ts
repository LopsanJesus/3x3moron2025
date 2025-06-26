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
    let team1Str: string;
    let team2Str: string;

    if (Array.isArray(record.Categoría)) {
      rawCategory = record.Categoría.length > 0 ? record.Categoría[0] : "";
    } else {
      rawCategory = record.Categoría;
    }

    if (Array.isArray(record.Nombre1)) {
      team1Str = record.Nombre1.length > 0 ? record.Nombre1[0] : "";
    } else {
      team1Str = record.Nombre1;
    }

    if (Array.isArray(record.Nombre2)) {
      team2Str = record.Nombre2.length > 0 ? record.Nombre2[0] : "";
    } else {
      team2Str = record.Nombre2;
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
      team1: team1Str,
      team2: team2Str,
      score1: record.Puntos1 || "-",
      score2: record.Puntos2 || "-",
      category: categoryStr,
      time: transformSecondsToTime(record.Hora),
      court: record.Pista,
      phase: record.Fase,
      group: record.Grupo,
    };
  });
}

export function transformAirtableToContestPlayers(
  records: AirtableContestPlayer[]
): ContestPlayer[] {
  return records.map((record, index) => {
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
