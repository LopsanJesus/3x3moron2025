export type Category = "Senior" | "Femenino" | "Mini" | "Peques";

export type Team = {
  id: string;
  name: string;
  category: Category;
  status: "Inscrito" | "En Espera";
};

export type Game = {
  id: number;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  category: Category;
  time: string;
  court: string;
  phase: string;
  group: string;
  code: string;
};

export type AirtableGame = {
  id: string;
  Hora: number;
  Pista: string;
  Categoría: string | string[];
  Fase: string;
  Nombre1: string;
  Puntos1: string;
  Nombre2: string;
  Puntos2: string;
  Grupo: string;
  Código: string;
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
