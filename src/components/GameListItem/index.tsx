import { Game } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./styles.scss";

type Props = {
  game: Game;
  isOpen: boolean;
  onToggle: () => void;
};

export default function GameListItem({ game, isOpen, onToggle }: Props) {
  const hasScore =
    game.scoreA !== null &&
    game.scoreB !== null &&
    (game.scoreA > 0 || game.scoreB > 0);

  const gameTime = game.time === "NaN:NaN" ? "TBD" : game.time;

  return (
    <div className={`game-card ${game.category}`} onClick={onToggle}>
      <div className="header-row">
        <div className="court">{game.court}</div>
        <div className="expand-icon">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      <div className="content-row">
        <div className="teams-column">
          <span className="team-name" title={game.teamA}>
            {game.teamA}
          </span>
          <span className="team-name" title={game.teamB}>
            {game.teamB}
          </span>
        </div>

        <div className="score-or-time">
          {hasScore ? (
            <>
              <span className="score">{game.scoreA}</span>
              <span className="score">{game.scoreB}</span>
            </>
          ) : (
            <span className="time">{gameTime}</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="extra-info">
          <p>
            <strong>Categoría:</strong> {game.category}
          </p>
          <p>
            <strong>Fase:</strong> {game.phase}
          </p>
        </div>
      )}
    </div>
  );
}
