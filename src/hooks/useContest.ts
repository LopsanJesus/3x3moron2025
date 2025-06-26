import { useEffect, useState } from "react";

import { AirtableContestPlayer, ContestPlayer } from "@/types";
import { transformAirtableToContestPlayers } from "@/utils/transformData";

export default function useContest() {
  const [players, setPlayers] = useState<ContestPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/contest");

        if (!res.ok) {
          throw new Error("Error al obtener los jugadores");
        }

        const data: AirtableContestPlayer[] = await res.json();

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
