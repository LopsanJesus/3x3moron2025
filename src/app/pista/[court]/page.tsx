"use client";

import React from "react";

import GameList from "@/components/GameList";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";

const Court = ({ params }: { params: Promise<{ court: string }> }) => {
  const { court } = React.use(params);

  const { games, loading } = useApi();

  if (loading) return <Loader />;

  let courtStr;

  if (court === "7") {
    courtStr = "Pista Peques 1";
  } else if (court === "8") {
    courtStr = "Pista Peques 2";
  } else {
    courtStr = "Pista " + court;
  }

  // Filtrar partidos de esta pista
  const gamesByCourt = games.filter((game) => game.court === courtStr);

  // Separar partidos terminados
  const finishedGames = gamesByCourt.filter(
    (game) => game.score1.trim() !== "" && game.score2.trim() !== ""
  );

  // Partidos no terminados
  const upcomingGames = gamesByCourt.filter(
    (game) => game.score1.trim() === "" || game.score2.trim() === ""
  );

  const excludeContest = court !== "1" && court !== "2";

  return (
    <PageTemplate title={courtStr}>
      {upcomingGames.length > 0 && (
        <GameList games={upcomingGames} excludeContest={excludeContest} />
      )}

      {finishedGames.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Partidos terminados</h2>

          <GameList games={[]} />
        </>
      )}
    </PageTemplate>
  );
};

export default Court;
