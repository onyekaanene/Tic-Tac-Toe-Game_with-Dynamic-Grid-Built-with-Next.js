"use client";

import { GameControlsProps } from "@/types/tictactoe";

const BOARD_SIZES = [3, 4, 5] as const;

export default function GameControls({
  boardSize,
  onBoardSizeChange,
  onReset,
}: GameControlsProps) {
  return (
    <div className="game-controls">
      <div className="game-controls__sizes" role="group" aria-label="Board size">
        <span className="game-controls__label">Size</span>
        {BOARD_SIZES.map((size) => (
          <button
            key={size}
            className={`game-controls__size-btn ${
              boardSize === size ? "game-controls__size-btn--active" : ""
            }`}
            onClick={() => onBoardSizeChange(size)}
            aria-pressed={boardSize === size}
          >
            {size}×{size}
          </button>
        ))}
      </div>
      <button
        className="game-controls__reset"
        onClick={onReset}
        aria-label="Start a new game"
      >
        New Game
      </button>
    </div>
  );
}
