"use client";

import { SquareProps } from "@/types/tictactoe";

export default function Square({
  value,
  onSquareClick,
  isWinning,
  disabled,
}: SquareProps) {
  const baseClass = "square";
  const valueClass = value === "X" ? "square--x" : value === "O" ? "square--o" : "";
  const winClass = isWinning ? "square--winning" : "";

  return (
    <button
      className={[baseClass, valueClass, winClass].filter(Boolean).join(" ")}
      onClick={onSquareClick}
      disabled={disabled}
      aria-label={
        value
          ? `Square occupied by ${value}`
          : "Empty square, click to play"
      }
      aria-pressed={!!value}
    >
      <span className="square__symbol" aria-hidden="true">
        {value}
      </span>
    </button>
  );
}
