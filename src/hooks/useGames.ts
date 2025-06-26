import { useEffect, useState } from "react";

import { AirtableGame, Game } from "@/types";
import { transformAirtableToGame } from "@/utils/transformData";

export default function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const res = await fetch("/api/games");

        if (!res.ok) {
          throw new Error("Error al obtener los partidos");
        }

        const data: AirtableGame[] = await res.json();

        setGames(transformAirtableToGame(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  return { games, loading, error };
}
