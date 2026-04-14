"use client";

import { useState, useCallback } from "react";
import Board from "./Board";
import MoveHistory from "./MoveHistory";
import GameControls from "./GameControls";
import { GameProps, SquaresArray } from "@/types/tictactoe";

const DEFAULT_BOARD_SIZE = 3;
const MIN_BOARD_SIZE = 3;
const MAX_BOARD_SIZE = 5;

function clampBoardSize(size: number): number {
  if (!Number.isInteger(size) || size < MIN_BOARD_SIZE || size > MAX_BOARD_SIZE) {
    console.warn(
      `Invalid boardSize "${size}". Falling back to default (${DEFAULT_BOARD_SIZE}).`
    );
    return DEFAULT_BOARD_SIZE;
  }
  return size;
}

function createEmptyBoard(size: number): SquaresArray {
  return Array(size * size).fill(null);
}

export default function Game({
  initialBoardSize = DEFAULT_BOARD_SIZE,
}: GameProps) {
  const [boardSize, setBoardSize] = useState(() =>
    clampBoardSize(initialBoardSize)
  );
  const [history, setHistory] = useState<SquaresArray[]>(() => [
    createEmptyBoard(clampBoardSize(initialBoardSize)),
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const resetGame = useCallback((size: number = boardSize) => {
    setHistory([createEmptyBoard(size)]);
    setCurrentMove(0);
  }, [boardSize]);

  const handleBoardSizeChange = useCallback((size: number) => {
    setBoardSize(size);
    resetGame(size);
  }, [resetGame]);

  const handlePlay = useCallback(
    (nextSquares: SquaresArray) => {
      const nextHistory = [
        ...history.slice(0, currentMove + 1),
        nextSquares,
      ];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [history, currentMove]
  );

  const handleJumpTo = useCallback((move: number) => {
    setCurrentMove(move);
  }, []);

  return (
    <div className="game">
      <GameControls
        boardSize={boardSize}
        onBoardSizeChange={handleBoardSizeChange}
        onReset={() => resetGame()}
      />
      <div className="game__layout">
        <div className="game__board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            boardSize={boardSize}
          />
        </div>
        <MoveHistory
          history={history}
          currentMove={currentMove}
          onJumpTo={handleJumpTo}
        />
      </div>
    </div>
  );
}
