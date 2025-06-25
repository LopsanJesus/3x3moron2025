export type Category = "Senior" | "Femenino" | "Mini" | "Peques";

export type Game = {
  id: number;
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  category: Category;
  time: string;
  court: string;
  phase: string;
};

export type AirtableGame = {
  id: string;
  Hora: number;
  Pista: string;
  Categoría: string | string[];
  Fase: string;
  Nombre1: string;
  Puntos1: number | null;
  Nombre2: string;
  Puntos2: number | null;
};

export type ContestPlayer = {
  id: number;
  name: string;
  paid: boolean;
  semifinal: boolean;
  final: boolean;
  score1?: number;
  score2?: number;
  score3?: number;
};

export type AirtableContestPlayer = {
  id: string;
  Nombre: string;
  Pagado: boolean;
  ASemis: boolean;
  ALaFinal: boolean;
  Ronda1: number;
  Ronda2: number;
  Ronda3: number;
};
