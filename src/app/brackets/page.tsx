"use client";

import { useState } from "react";

import CategoryTabs from "@/components/CategoryTabs";
import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { Category, Game } from "@/types";
import { calculateTeamsCode } from "@/utils/transformData";

import "./page.scss";

const roundFullNames: Record<string, string> = {
  OF: "Octavos de Final",
  CF: "Cuartos de Final",
  SF: "Semifinal",
  F: "Final",
};

export default function BracketPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Senior");
  const [showOnlyFinalRounds, setShowOnlyFinalRounds] = useState(false);

  const { games, loading } = useApi();

  // Filtrar juegos de fase eliminatoria y categoría activa
  const eliminationGames = games.filter(
    (game) => game.phase === "Eliminatorias" && game.category === activeCategory
  );

  const roundOrder = ["OF", "CF", "SF", "F"];

  const getRoundFromCode = (code: string) => {
    return roundOrder.find((round) => code.startsWith(round)) || "";
  };

  const getAvailableRounds = (): string[] => {
    const roundSet = new Set<string>();
    eliminationGames.forEach((g) => {
      if (g.code) {
        const round = getRoundFromCode(g.code);
        if (round) roundSet.add(round);
      }
    });

    return Array.from(roundSet).sort(
      (a, b) => roundOrder.indexOf(a) - roundOrder.indexOf(b)
    );
  };

  // Rondas visibles según filtro
  const visibleRounds = showOnlyFinalRounds
    ? getAvailableRounds().slice(-3) // últimas 3 rondas (las finales)
    : getAvailableRounds();

  console.log("visibleRounds", visibleRounds);

  // Juegos por ronda
  const getGamesByRound = (round: string): Game[] =>
    eliminationGames.filter((g) => g.code.startsWith(round));

  if (loading) return <Loader />;

  return (
    <PageTemplate title="Eliminatorias">
      <div className="eliminationMatches">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(cat) => {
            setActiveCategory(cat);
            setShowOnlyFinalRounds(false);
          }}
        />

        {getAvailableRounds().length > 3 && (
          <div className="eliminationMatchesFilter">
            <input
              type="checkbox"
              id="show-only-final-matches"
              checked={showOnlyFinalRounds}
              onChange={() => setShowOnlyFinalRounds(!showOnlyFinalRounds)}
            />
            <label
              htmlFor="show-only-final-matches"
              className="eliminationMatchesFilterLabel"
            >
              Sólo rondas finales
            </label>
          </div>
        )}

        <div className="rounds">
          {visibleRounds.map((round) => (
            <div className="round" key={round}>
              {getGamesByRound(round).map((game, index) => {
                const teamCode1 = calculateTeamsCode(game.code, 1);
                const teamCode2 = calculateTeamsCode(game.code, 2);

                const team1 =
                  game.team1 && game.team1 !== "undefined"
                    ? game.team1.substring(0, 16)
                    : teamCode1 === "-"
                    ? "Fase Grupos"
                    : "Ganador " + teamCode1;

                const team2 =
                  game.team2 && game.team2 !== "undefined"
                    ? game.team2.substring(0, 16)
                    : teamCode2 === "-"
                    ? "Fase Grupos"
                    : "Ganador " + teamCode2;

                return (
                  <div key={game.id} className="eliminationMatch">
                    <div className="matchTitle">
                      {roundFullNames[round]} {index + 1}
                    </div>

                    <div className="teams">
                      <div
                        className={`team ${
                          game.score1 &&
                          game.score2 &&
                          parseInt(game.score1) > parseInt(game.score2)
                            ? "winner"
                            : ""
                        }`}
                      >
                        {team1}
                      </div>
                      <div className="separator"></div>
                      <div
                        className={`team ${
                          game.score1 &&
                          game.score2 &&
                          parseInt(game.score1) < parseInt(game.score2)
                            ? "winner"
                            : ""
                        }`}
                      >
                        {team2}
                      </div>
                    </div>
                    {game.score1 && game.score2 && (
                      <div className="score">
                        <div>{game.score1}</div>
                        <div>{game.score2}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
