export type SquareValue = "X" | "O" | null;
export type SquaresArray = SquareValue[];

export interface WinResult {
  winner: NonNullable<SquareValue>;
  line: number[];
}

export interface GameProps {
  initialBoardSize?: number;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: SquaresArray;
  onPlay: (squares: SquaresArray) => void;
  boardSize: number;
}

export interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export interface MoveHistoryProps {
  history: SquaresArray[];
  currentMove: number;
  onJumpTo: (move: number) => void;
}

export interface GameControlsProps {
  boardSize: number;
  onBoardSizeChange: (size: number) => void;
  onReset: () => void;
}
