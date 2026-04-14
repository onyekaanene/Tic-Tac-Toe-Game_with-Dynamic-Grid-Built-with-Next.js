"use client";

import { useMemo } from "react";
import Square from "./Square";
import { BoardProps, SquaresArray } from "@/types/tictactoe";
import { calculateWinner, calculateDraw } from "@/utils/calculateWinner";

export default function Board({
  xIsNext,
  squares,
  onPlay,
  boardSize,
}: BoardProps) {
  const winResult = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(
    () => calculateDraw(squares, winResult),
    [squares, winResult]
  );

  const isGameOver = !!winResult || isDraw;
  const winningSquares = useMemo(
    () => new Set(winResult?.line ?? []),
    [winResult]
  );

  function handleClick(i: number) {
    if (isGameOver || squares[i]) return;
    const nextSquares = squares.slice() as SquaresArray;
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let statusText: string;
  let statusMod = "";
  if (winResult) {
    statusText = `Player ${winResult.winner} wins!`;
    statusMod = "status--win";
  } else if (isDraw) {
    statusText = "It's a draw!";
    statusMod = "status--draw";
  } else {
    statusText = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="board-wrapper">
      <div className={`status ${statusMod}`} role="status" aria-live="polite">
        <span
          className={`status__indicator ${xIsNext ? "status__indicator--x" : "status__indicator--o"}`}
        />
        {statusText}
      </div>

      <div
        className="board"
        style={{ "--board-size": boardSize } as React.CSSProperties}
        role="grid"
        aria-label={`Tic-tac-toe board, ${boardSize} by ${boardSize}`}
      >
        {Array.from({ length: boardSize * boardSize }, (_, index) => (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={winningSquares.has(index)}
            disabled={isGameOver || !!squares[index]}
          />
        ))}
      </div>
    </div>
  );
}
