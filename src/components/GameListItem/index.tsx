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
    game.score1 !== null &&
    game.score2 !== null &&
    game.score1 !== undefined &&
    game.score2 !== undefined &&
    (parseInt(game.score1) > 0 || parseInt(game.score2) > 0);

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
          <span className="team-name" title={game.team1}>
            {game.team1}
          </span>
          <span className="team-name" title={game.team2}>
            {game.team2}
          </span>
        </div>

        <div className="score-or-time">
          {hasScore ? (
            <>
              <span className="score">{game.score1}</span>
              <span className="score">{game.score2}</span>
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
