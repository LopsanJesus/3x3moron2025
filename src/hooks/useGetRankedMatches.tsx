import { Game } from "@/types";
import { useEffect, useState } from "react";

interface TeamStats {
  team: string;
  games: number;
  wins: number;
  basketAverage: number;
}

interface GroupStats {
  group: string;
  teams: TeamStats[];
}

interface CategoryStats {
  category: string;
  groups: GroupStats[];
}

const compareTeams = (a: TeamStats, b: TeamStats) => {
  if (a.wins !== b.wins) {
    return b.wins - a.wins; // Ordenar por victorias (descendente)
  }
  return b.basketAverage - a.basketAverage; // Ordenar por promedio de canastas (descendente)
};

const useGetRankedMatches = (matches: Game[]): CategoryStats[] => {
  const [filteredMatches, setFilteredMatches] = useState<Game[]>([]);

  useEffect(() => {
    // Filtrar partidos con categoría definida y no "undefined"
    const filtered = matches.filter(
      (match) => match.category && match.phase === "Grupos"
    );
    setFilteredMatches(filtered);
  }, [matches]);

  const calculateStats = (filteredMatches: Game[]): CategoryStats[] => {
    const categoryMap: {
      [key: string]: { [key: string]: { [key: string]: TeamStats } };
    } = {};

    filteredMatches.forEach((match) => {
      const { category, group, team1, team2, score1, score2 } = match;
      const score1Num = parseInt(score1) || 0;
      const score2Num = parseInt(score2) || 0;
      const team1Wins = score1Num > score2Num;
      const team2Wins = score2Num > score1Num;

      if (!categoryMap[category]) {
        categoryMap[category] = {};
      }
      if (!categoryMap[category][group]) {
        categoryMap[category][group] = {};
      }
      if (!categoryMap[category][group][team1]) {
        categoryMap[category][group][team1] = {
          team: team1,
          games: 0,
          wins: 0,
          basketAverage: 0,
        };
      }
      if (!categoryMap[category][group][team2]) {
        categoryMap[category][group][team2] = {
          team: team2,
          games: 0,
          wins: 0,
          basketAverage: 0,
        };
      }

      if (team1Wins) {
        categoryMap[category][group][team1].games += 1;
        categoryMap[category][group][team2].games += 1;

        categoryMap[category][group][team1].wins += 1;
      } else if (team2Wins) {
        categoryMap[category][group][team1].games += 1;
        categoryMap[category][group][team2].games += 1;

        categoryMap[category][group][team2].wins += 1;
      }

      categoryMap[category][group][team1].basketAverage +=
        score1Num - score2Num;
      categoryMap[category][group][team2].basketAverage +=
        score2Num - score1Num;
    });

    return Object.keys(categoryMap).map((category) => ({
      category,
      groups: Object.keys(categoryMap[category]).map((group) => ({
        group,
        teams: Object.values(categoryMap[category][group]).sort(compareTeams),
      })),
    }));
  };

  return calculateStats(filteredMatches);
};

export default useGetRankedMatches;
