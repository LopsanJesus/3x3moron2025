"use client";
import { useMemo } from "react";

import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useContest } from "@/hooks/useContest";
import { ContestPlayer } from "@/types";

import "./page.scss";

export default function ContestPage() {
  const { players, loading, error } = useContest();

  const final = useMemo(
    () => players.filter((p) => p.final === true),
    [players]
  );

  const semifinal = useMemo(
    () => players.filter((p) => p.semifinal === true && p.final !== true),
    [players]
  );

  const initial = useMemo(
    () => players.filter((p) => p.final !== true && p.semifinal !== true),
    [players]
  );

  const renderRow = (player: ContestPlayer) => (
    <div key={player.id} className="player-row">
      <span className="player-name">{player.name}</span>
      <span className="player-score">{player.score1 ?? "-"}</span>
      <span className="player-score">{player.score2 ?? "-"}</span>
      <span className="player-score">{player.score3 ?? "-"}</span>
    </div>
  );

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  console.log("players", players);

  return (
    <PageTemplate>
      <div className="players-list">
        {final.length > 0 && (
          <>
            <div className="section-title">🏆 Final</div>
            {final.map(renderRow)}
          </>
        )}
        {semifinal.length > 0 && (
          <>
            <div className="section-title">🎯 Semifinal</div>
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
    </PageTemplate>
  );
}
