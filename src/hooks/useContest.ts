import { useEffect, useState } from "react";

import { ContestPlayer } from "@/types";
import { transformAirtableToContestPlayers } from "@/utils/transformData";

export function useContest() {
  const [players, setPlayers] = useState<ContestPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/contest");

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error al cargar los datos");
        }

        const data = await res.json();

        setPlayers(transformAirtableToContestPlayers(data));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return { players, loading, error };
}
