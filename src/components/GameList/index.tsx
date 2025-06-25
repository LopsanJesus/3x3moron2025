import { Category, Game } from "@/types";
import { useState } from "react";
import GameListItem from "../GameListItem";
import "./styles.scss";

type Props = {
  games: Game[];
  activeCategory: Category;
};

export default function GameList({ games, activeCategory }: Props) {
  const [openGameId, setOpenGameId] = useState<number | null>(null);

  const filteredGames = games.filter(
    (game) => game.category === activeCategory
  );

  // Ordenar juegos por hora ascendente
  const sortedGames = [...filteredGames].sort((a, b) => {
    // Hora en formato "HH:MM" -> convertir a minutos para comparar
    const toMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    return toMinutes(a.time) - toMinutes(b.time);
  });

  console.log("sortedGames", sortedGames);

  const toggleGame = (id: number) => {
    setOpenGameId((prev) => (prev === id ? null : id));
  };

  if (sortedGames.length === 0) {
    return <p className="no-games">No hay partidos para esta categoría.</p>;
  }

  return (
    <div className="games-list">
      {sortedGames.map((game) => (
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
