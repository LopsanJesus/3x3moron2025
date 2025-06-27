"use client";
import Image from "next/image";
import { useMemo } from "react";

import Loader from "@/components/Loader";
import PageTemplate from "@/components/PageTemplate";
import { useApi } from "@/contexts/ApiContext";
import { ContestPlayer } from "@/types";

import "./page.scss";

export default function ContestPage() {
  const { players, loading } = useApi();

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

  return (
    <PageTemplate title="Concurso de triples">
      <div className="players-list">
        {final.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/final-icon.png"
                alt="Final"
                width={24}
                height={24}
                className="icon"
              />
              Final
            </div>
            {final.map(renderRow)}
          </>
        )}
        {semifinal.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/semifinals-icon.png"
                alt="Semifinal"
                width={24}
                height={24}
                className="icon"
              />
              Semifinal
            </div>
            {semifinal.map(renderRow)}
          </>
        )}
        {initial.length > 0 && (
          <>
            <div className="section-title">
              <Image
                src="/participant-icon.png"
                alt="Participantes"
                width={24}
                height={24}
                className="icon"
              />
              Participantes
            </div>
            {initial.map(renderRow)}
          </>
        )}
      </div>
    </PageTemplate>
  );
}
