"use client";

import React from "react";

import GameList from "@/components/GameList";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";

const Court = ({ params }: { params: Promise<{ court: string }> }) => {
  const { court } = React.use(params);

  const { games, loading } = useApi();

  const gamesByCourt = games.filter((game) => game.court === "Pista " + court);

  if (loading) return <Loader />;

  return (
    <PageTemplate title={"Pista " + court}>
      {!loading && games && (
        <GameList games={gamesByCourt} activeCategory="Mini" />
      )}
    </PageTemplate>
  );
};

export default Court;
