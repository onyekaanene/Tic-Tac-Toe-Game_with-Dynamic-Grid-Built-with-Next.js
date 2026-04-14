import { SquaresArray, WinResult } from "@/types/tictactoe";

/**
 * Calculates the winner of a tic-tac-toe game.
 * Works for any square board (3×3, 4×4, 5×5, etc.)
 * Returns the winner symbol and the winning line indices, or null if no winner.
 */
export function calculateWinner(squares: SquaresArray): WinResult | null {
  const size = Math.sqrt(squares.length);

  if (!Number.isInteger(size) || size < 2) return null;

  const lines: number[][] = [];

  // Rows
  for (let row = 0; row < size; row++) {
    const line: number[] = [];
    for (let col = 0; col < size; col++) {
      line.push(row * size + col);
    }
    lines.push(line);
  }

  // Columns
  for (let col = 0; col < size; col++) {
    const line: number[] = [];
    for (let row = 0; row < size; row++) {
      line.push(row * size + col);
    }
    lines.push(line);
  }

  // Diagonal: top-left → bottom-right
  const diag1: number[] = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
  }
  lines.push(diag1);

  // Diagonal: top-right → bottom-left
  const diag2: number[] = [];
  for (let i = 0; i < size; i++) {
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag2);

  for (const line of lines) {
    const first = squares[line[0]];
    if (!first) continue;
    if (line.every((idx) => squares[idx] === first)) {
      return { winner: first, line };
    }
  }

  return null;
}

/**
 * Returns true if the board is full with no winner (a draw).
 */
export function calculateDraw(
  squares: SquaresArray,
  winResult: WinResult | null
): boolean {
  return !winResult && squares.every(Boolean);
}
