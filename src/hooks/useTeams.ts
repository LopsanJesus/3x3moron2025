import { useEffect, useState } from "react";

import { Team } from "@/types";

export default function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/teams");

        if (!res.ok) {
          throw new Error("Error al obtener los equipos");
        }

        const data: Team[] = await res.json();

        setTeams(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
}
