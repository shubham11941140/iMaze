import React, { Component } from "react";

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const extraClassName = isFinish
      ? "bg-blue-500"
      : isStart
      ? "bg-green-500"
      : isWall
      ? "bg-black"
      : "bg-slate-200";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`w-[25px] h-[25px] border border-white inline-block ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
       />
    );
  }
}
