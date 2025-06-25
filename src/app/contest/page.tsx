"use client";
import { useMemo } from "react";

import Topbar from "@/components/Topbar";

import Navbar from "@/components/Navbar";
import "./page.scss";

type Player = {
  id: number;
  name: string;
  score1?: number;
  score2?: number;
  score3?: number;
};

const players = [
  { id: 1, name: "Juan Pérez", score1: 10, score2: 15, score3: 20 },
  { id: 2, name: "Lucía Gómez", score1: 12, score2: 14 },
  { id: 3, name: "Carlos Díaz", score1: 11 },
  { id: 4, name: "Ana Torres", score1: 13, score2: 16, score3: 18 },
  { id: 5, name: "Sofía Ruiz", score1: 14 },
];

export default function ContestPage() {
  const final = useMemo(
    () =>
      players
        .filter((p) => p.score3 !== undefined)
        .sort((a, b) => getTotalScore(b) - getTotalScore(a)),
    []
  );

  const semifinal = useMemo(
    () =>
      players
        .filter((p) => p.score3 === undefined && p.score2 !== undefined)
        .sort((a, b) => getTotalScore(b) - getTotalScore(a)),
    []
  );

  const initial = useMemo(
    () =>
      players
        .filter((p) => p.score2 === undefined)
        .sort((a, b) => getTotalScore(b) - getTotalScore(a)),
    []
  );

  function getTotalScore(player: Player) {
    return (player.score1 || 0) + (player.score2 || 0) + (player.score3 || 0);
  }

  const renderRow = (player: Player) => (
    <div key={player.id} className="player-row">
      <span className="player-name">{player.name}</span>
      <span>{player.score1 ?? "-"}</span>
      <span>{player.score2 ?? "-"}</span>
      <span>{player.score3 ?? "-"}</span>
    </div>
  );

  return (
    <div className="games-page">
      <Topbar />

      <div className="players-list">
        {final.length > 0 && (
          <>
            <div className="section-title">🏆 Clasificados a Final</div>
            {final.map(renderRow)}
          </>
        )}
        {semifinal.length > 0 && (
          <>
            <div className="section-title">🎯 Clasificados a Semifinal</div>
            {semifinal.map(renderRow)}
          </>
        )}
        {initial.length > 0 && (
          <>
            <div className="section-title">👥 Participantes</div>
            {initial.map(renderRow)}
          </>
        )}
      </div>

      <Navbar />
    </div>
  );
}
