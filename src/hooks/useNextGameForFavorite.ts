import { Game, Team } from "@/types";
import { useMemo } from "react";

export function useNextGamesForFavorite(
  games: Game[],
  favoriteTeam: Team | null
) {
  return useMemo(() => {
    if (!favoriteTeam) return null;

    const upcomingGames = games.filter((game) => {
      const involvesFavorite =
        game.team1 === favoriteTeam.name || game.team2 === favoriteTeam.name;
      return involvesFavorite;
    });

    if (upcomingGames.length === 0) return null;

    const sortedUpcomingGames = upcomingGames
      .filter((game) => !(game.score1 !== "" || game.score2 !== ""))
      .sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));

    const finishedGames = upcomingGames.filter(
      (game) => game.score1 !== "" || game.score2 !== ""
    );

    return [...sortedUpcomingGames, ...finishedGames];
  }, [games, favoriteTeam]);
}
