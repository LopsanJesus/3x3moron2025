"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import CategoryTabs from "@/components/CategoryTabs";
import GameList from "@/components/GameList";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { useNextGamesForFavorite } from "@/hooks/useNextGameForFavorite";
import { Category } from "@/types";
import "./page.scss";

export default function GamesPage() {
  const { games, loading, favoriteTeam } = useApi();

  const nextGamesForFavorite = useNextGamesForFavorite(games, favoriteTeam);

  useEffect(() => {
    setActiveCategory(favoriteTeam?.category || "Senior");
  }, [favoriteTeam]);

  const [activeCategory, setActiveCategory] = useState<Category>(
    favoriteTeam?.category || "Senior"
  );

  if (loading) return <Loader />;

  const filteredGames = games.filter((game) => {
    const matchesCategory = game.category === activeCategory;

    return matchesCategory;
  });

  return (
    <PageTemplate title="Partidos">
      <div className="games-page">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(cat) => setActiveCategory(cat)}
        />

        {!favoriteTeam && (
          <div className="no-favorite-team">
            <Button href="/profile/favorite-team">Selecciona tu equipo</Button>
          </div>
        )}

        {nextGamesForFavorite &&
          nextGamesForFavorite.length > 0 &&
          activeCategory === favoriteTeam?.category && (
            <div className="next-game">
              <h3>Tus partidos</h3>

              <GameList
                games={nextGamesForFavorite}
                activeCategory={activeCategory}
                dontSort
                excludeContest
              />
            </div>
          )}

        {activeCategory === favoriteTeam?.category ? (
          <h3>Otros partidos</h3>
        ) : (
          <h3>Partidos</h3>
        )}

        <GameList
          games={filteredGames}
          activeCategory={activeCategory}
          excludedTeamName={favoriteTeam?.name}
        />
      </div>
    </PageTemplate>
  );
}
