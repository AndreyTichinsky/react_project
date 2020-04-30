import React from "react";
import type { CellProps } from "types/field";
import { CellItem } from "./CellItem";

interface CellState {
  decideWhichAnimation: boolean;
}

export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);
    this.state = {
      decideWhichAnimation: false,
    };
  }

  componentDidMount() {
    this.setState({
      decideWhichAnimation: this.props.isAlive,
    });
  }

  componentDidUpdate(prevProps: CellProps) {
    if (prevProps.isAlive !== this.props.isAlive) {
      this.setState((state) => {
        return {
          decideWhichAnimation: !state.decideWhichAnimation,
        };
      });
    }
  }

  render() {
    return (
      <CellItem
        className={`cell cell_${this.props.y}_${this.props.x}`}
        isAlive={this.props.isAlive}
        decideWhichAnimation={this.state.decideWhichAnimation}
        x={this.props.x}
        y={this.props.y}
        cellSize={this.props.cellSize}
        onClick={() => this.props.onClick(this.props.x, this.props.y)}
      />
    );
  }
}
