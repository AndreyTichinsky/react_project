import React from "react";

type FieldComponentInterface = React.FC<{
  field: boolean[][];
  cellSize: number;
  onClick: (x: number, y: number) => void;
}>;

interface GameProps {
  xSize: number;
  ySize: number;
  cellSize: number;
  fieldComponent: FieldComponentInterface;
}
interface GameState {
  fieldState: boolean[][];
}

export class Game extends React.Component<GameProps, GameState> {
  private FieldComponent: FieldComponentInterface;
  constructor(props: GameProps) {
    super(props);
    this.FieldComponent = props.fieldComponent;
    this.state = {
      fieldState: Array.from({ length: props.ySize }).map(() =>
        Array.from({ length: props.xSize }).fill(false)
      ) as boolean[][],
    };
    this.onClick = this.onClick.bind(this);
  }
  public onClick(x: number, y: number) {
    this.setState((state) => {
      const fieldStateCopy = state.fieldState.map((row) => [...row]);
      fieldStateCopy[y][x] = !fieldStateCopy[y][x];
      return {
        fieldState: fieldStateCopy,
      };
    });
  }
  render() {
    const FieldComponent = this.FieldComponent;
    return (
      <FieldComponent
        field={this.state.fieldState}
        onClick={this.onClick}
        cellSize={this.props.cellSize}
      />
    );
  }
}
