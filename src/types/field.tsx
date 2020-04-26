export interface CellProps {
  isAlive: boolean;
  x: number;
  y: number;
  cellSize: number;
  onClick: (x: number, y: number) => void;
}

export interface FieldProps {
  field: boolean[][];
  cellSize: number;
  onClick: (x: number, y: number) => void;
}
