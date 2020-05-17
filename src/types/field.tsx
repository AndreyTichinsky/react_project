export interface CellProps {
  isAlive: boolean;
  x: number;
  y: number;
  cellSize: number;
  animationSpeed: number;
  onClick: (x: number, y: number) => void;
}

export interface FieldProps {
  animationSpeed: number;
  field: boolean[][];
  cellSize: number;
  onClick: (x: number, y: number) => void;
}
