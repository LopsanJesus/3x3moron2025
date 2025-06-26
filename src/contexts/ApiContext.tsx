"use client";

import useContest from "@/hooks/useContest";
import useGames from "@/hooks/useGames";
import { ContestPlayer, Game } from "@/types";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

type ApiContextType = {
  games: Game[];
  players: ContestPlayer[];
  loading: boolean;
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

  useEffect(() => {
    if (error) {
      router.push("/error");
    }
  }, [error, router]);

  return (
    <ApiContext.Provider value={{ games, players, loading }}>
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
