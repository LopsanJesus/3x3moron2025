"use client";

import { Category, Game } from "@/types";
import { useState } from "react";
import GameListItem from "../GameListItem";
import "./styles.scss";

type Props = {
  games: Game[];
  activeCategory?: Category; // <-- Ahora es opcional
  excludedTeamName?: string;
  dontSort?: boolean;
};

export default function GameList({
  games,
  activeCategory,
  excludedTeamName,
  dontSort,
}: Props) {
  const [openGameId, setOpenGameId] = useState<number | null>(null);

  const filteredGames = games.filter(
    (game) =>
      (!activeCategory || game.category === activeCategory) &&
      game.team1 &&
      game.team2 &&
      game.team1 !== "Por definir" &&
      game.team2 !== "Por definir" &&
      game.team1 !== excludedTeamName &&
      game.team2 !== excludedTeamName
  );

  let sortedGames = filteredGames;

  if (!dontSort) {
    sortedGames = [...filteredGames].sort((a, b) => {
      const toMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };

      return toMinutes(a.time) - toMinutes(b.time);
    });
  }

  const finishedGames = sortedGames.filter((game) => {
    return game.score1.trim() !== "" && game.score2.trim() !== "";
  });

  const upcomingGames = sortedGames.filter((game) => {
    return game.score1.trim() === "" || game.score2.trim() === "";
  });

  const allGames = [...upcomingGames, ...finishedGames];

  const toggleGame = (id: number) => {
    setOpenGameId((prev) => (prev === id ? null : id));
  };

  if (allGames.length === 0) {
    return <p className="no-games">No hay partidos para esta categoría.</p>;
  }

  return (
    <div className="games-list">
      {allGames.map((game) => (
        <GameListItem
          key={game.id}
          game={game}
          isOpen={openGameId === game.id}
          onToggle={() => toggleGame(game.id)}
        />
      ))}
    </div>
  );
}
