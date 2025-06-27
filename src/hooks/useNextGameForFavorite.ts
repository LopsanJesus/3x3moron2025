import { Game, Team } from "@/types";
import { useMemo } from "react";

export function useNextGameForFavorite(
  games: Game[],
  favoriteTeam: Team | null
) {
  return useMemo(() => {
    if (!favoriteTeam) return null;

    const upcomingGames = games.filter((game) => {
      const noScore = !game.score1 || !game.score2;
      const involvesFavorite =
        game.team1 === favoriteTeam.name || game.team2 === favoriteTeam.name;
      return noScore && involvesFavorite;
    });

    if (upcomingGames.length === 0) return null;

    upcomingGames.sort((a, b) =>
      a.time < b.time ? -1 : a.time > b.time ? 1 : 0
    );

    return upcomingGames[0];
  }, [games, favoriteTeam]);
}
