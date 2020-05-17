import React, { FC, PureComponent } from "react";
import type { CellProps } from "types/field";
import { CellItem } from "./CellItem";

export class Cell extends React.PureComponent<CellProps> {
  handleClick = () => {
    this.props.onClick(this.props.x, this.props.y);
  };
  render() {
    return (
      <CellItem
        className={`cell cell_${this.props.y}_${this.props.x}`}
        isAlive={this.props.isAlive}
        x={this.props.x}
        y={this.props.y}
        cellSize={this.props.cellSize}
        onClick={this.handleClick}
        animationSpeed={this.props.animationSpeed}
      />
    );
  }
}
