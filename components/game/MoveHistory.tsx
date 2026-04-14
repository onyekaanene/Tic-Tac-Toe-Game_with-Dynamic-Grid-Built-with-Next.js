"use client";

import { MoveHistoryProps } from "@/types/tictactoe";

export default function MoveHistory({
  history,
  currentMove,
  onJumpTo,
}: MoveHistoryProps) {
  return (
    <aside className="move-history" aria-label="Move history">
      <h2 className="move-history__title">History</h2>
      <ol className="move-history__list" aria-label="List of moves">
        {history.map((_, move) => {
          const isCurrent = move === currentMove;
          const label = move === 0 ? "Game start" : `Move #${move}`;

          return (
            <li key={move} className="move-history__item">
              <button
                className={`move-history__btn ${isCurrent ? "move-history__btn--current" : ""}`}
                onClick={() => onJumpTo(move)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="move-history__dot" aria-hidden="true" />
                {label}
                {isCurrent && (
                  <span className="move-history__tag" aria-hidden="true">
                    now
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
