"use client";

import useConfig from "@/hooks/useConfig";
import { Category, Game } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameListItem from "../GameListItem";
import Loader from "../Loader";

import "./styles.scss";

type Props = {
  games: Game[];
  activeCategory?: Category;
  excludedTeamName?: string;
  dontSort?: boolean;
  excludeContest?: boolean;
};

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export default function GameList({
  games,
  activeCategory,
  excludedTeamName,
  dontSort = false,
  excludeContest = false,
}: Props) {
  const router = useRouter();

  const [openGameId, setOpenGameId] = useState<number | null>(null);

  const { config, loading, error } = useConfig();

  const triplesStartTime = config?.find(
    (item) => item.name === "HoraConcursoTriples"
  )?.value;
  const triplesEndTime = config?.find(
    (item) => item.name === "HoraFinalConcursoTriples"
  )?.value;

  const filteredGames = games.filter(
    (game) =>
      (!activeCategory || game.category === activeCategory) &&
      game.team1 &&
      game.team2 &&
      game.team1 !== excludedTeamName &&
      game.team2 !== excludedTeamName
  );

  const makeSpecialGame = (id: number, time: string, label: string): Game => ({
    id,
    time,
    team1: label,
    team2: "",
    score1: "",
    score2: "",
    category: "Senior",
    court: "Pista 1 y 2",
    phase: "",
    group: "",
    code: "special",
  });

  const gamesWithSpecials = [...filteredGames];

  if (
    !excludeContest &&
    triplesStartTime &&
    triplesEndTime &&
    activeCategory !== "Peques"
  ) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const triplesStartMinutes = toMinutes(triplesStartTime);
    const triplesEndMinutes = toMinutes(triplesEndTime);

    if (currentMinutes <= triplesStartMinutes) {
      gamesWithSpecials.push(
        makeSpecialGame(-1, triplesStartTime, "🏀 Concurso de Triples")
      );
    }

    if (currentMinutes <= triplesEndMinutes) {
      gamesWithSpecials.push(
        makeSpecialGame(-2, triplesEndTime, "🏁 Final Concurso de Triples")
      );
    }
  }

  let sortedGames = gamesWithSpecials;

  if (!dontSort) {
    const getCourtNumber = (court: string) => {
      const match = court.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };

    sortedGames = [...gamesWithSpecials].sort((a, b) => {
      const diff = toMinutes(a.time) - toMinutes(b.time);
      if (diff !== 0) return diff;
      return getCourtNumber(a.court) - getCourtNumber(b.court);
    });
  }

  const finishedGames = sortedGames.filter(
    (game) => game.score1.trim() !== "" && game.score2.trim() !== ""
  );

  const upcomingGames = sortedGames.filter(
    (game) => game.score1.trim() === "" || game.score2.trim() === ""
  );

  const allGames = [...upcomingGames, ...finishedGames];

  const toggleGame = (id: number) => {
    setOpenGameId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (error) {
      router.push("/error");
    }
  }, [error, router]);

  if (allGames.length === 0) {
    return <p className="no-games">No hay partidos para esta categoría.</p>;
  }

  if (loading) return <Loader />;

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
