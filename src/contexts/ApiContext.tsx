"use client";

import useContest from "@/hooks/useContest";
import useGames from "@/hooks/useGames";
import { ContestPlayer, Game, Team } from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ApiContextType = {
  games: Game[];
  players: ContestPlayer[];
  loading: boolean;
  favoriteTeam: Team | null;
  setFavoriteTeam: (team: Team) => void;
  removeFavoriteTeam: () => void;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { games, loading: gamesLoading, error: gamesError } = useGames();
  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useContest();

  const loading = gamesLoading || playersLoading;
  const error = gamesError || playersError;
  const router = useRouter();

  const [favoriteTeam, setFavoriteTeamState] = useState<Team | null>(null);

  // Inicializar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favoriteTeam");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavoriteTeamState(parsed);
      } catch {
        localStorage.removeItem("favoriteTeam");
      }
    }
  }, []);

  // Función para actualizar y persistir
  const setFavoriteTeam = useCallback((team: Team) => {
    localStorage.setItem("favoriteTeam", JSON.stringify(team));
    setFavoriteTeamState(team);
  }, []);

  const removeFavoriteTeam = useCallback(() => {
    localStorage.removeItem("favoriteTeam");
    setFavoriteTeamState(null);
  }, []);

  useEffect(() => {
    if (error) {
      router.push("/error");
    }
  }, [error, router]);

  return (
    <ApiContext.Provider
      value={{
        games,
        players,
        loading,
        favoriteTeam,
        setFavoriteTeam,
        removeFavoriteTeam,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
