import React, { Component } from "react";
import Node from "./Node";
import { dijkstra, dijkstraStep } from "../scripts/dijkstra";
import { generateMaze } from "../scripts/maze";
import { getAllNodes, getNodesInShortestPathOrder } from "../scripts/utils";

export const START_NODE_ROW = 0;
export const START_NODE_COL = 0;
export const FINISH_NODE_ROW = 20;
export const FINISH_NODE_COL = 45;

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.props.grid,
      visitedNodesInOrder: [],
      unvisitedNodes: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    // const grid = generateMaze(FINISH_NODE_ROW + 1, FINISH_NODE_COL + 1);
    const grid = this.state.grid;

    let { unvisitedNodes } = this.state;

    unvisitedNodes = getAllNodes(grid);

    for (let row = 0; row <= FINISH_NODE_ROW; row++) {
      for (let col = 0; col <= FINISH_NODE_COL; col++) {
        grid[row][col].isVisited = false;
      }
    }

    this.setState({ unvisitedNodes });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    let unvisitedNodes = getAllNodes(newGrid);
    this.setState({ grid: newGrid, mouseIsPressed: true, unvisitedNodes });
    this.props.mazeSetter(newGrid);
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    this.props.mazeSetter(newGrid);
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "w-[25px] h-[25px] border-2 inline-block bg-slate-200 node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "w-[25px] h-[25px] border-2 inline-block bg-slate-200 node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;

    for (let row = 0; row <= FINISH_NODE_ROW; row++) {
      for (let col = 0; col <= FINISH_NODE_COL; col++) {
        grid[row][col].isVisited = false;
      }
    }

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  next() {
    let { unvisitedNodes, visitedNodesInOrder, grid } = this.state;

    if (!!unvisitedNodes.length) {
      var closestNode = dijkstraStep(unvisitedNodes, visitedNodesInOrder, grid);
      if (!closestNode.isWall && closestNode.distance != Infinity) {
        document.getElementById(
          `node-${closestNode.row}-${closestNode.col}`
        ).className =
          "w-[25px] h-[25px] border-2 inline-block bg-slate-200 node-visited-static";

        this.setState({ unvisitedNodes, visitedNodesInOrder, grid });

        if (
          closestNode.row === FINISH_NODE_ROW &&
          closestNode.col === FINISH_NODE_COL
        ) {
          setTimeout(() => {
            this.animateShortestPath(getNodesInShortestPathOrder(closestNode));
          }, 10 * visitedNodesInOrder.length);
          return;
        }
      } else {
        if (closestNode.isWall && closestNode.distance !== Infinity) {
          document.getElementById(
            `node-${closestNode.row}-${closestNode.col}`
          ).className =
            "w-[25px] h-[25px] border border-green-500 inline-block bg-black animate-bounce";

          setTimeout(() => {
            document.getElementById(
              `node-${closestNode.row}-${closestNode.col}`
            ).className =
              "w-[25px] h-[25px] border border-green-500 inline-block bg-black";
          }, 1000);
        }
      }
    }
  }

  randomize() {
    // Test start
    let visitedNodesInOrder = [];
    let grid = generateMaze(FINISH_NODE_ROW + 1, FINISH_NODE_COL + 1);
    let unvisitedNodes = getAllNodes(grid);

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        let bgColor = "bg-slate-200";

        if (row === START_NODE_ROW && col === START_NODE_COL) {
          bgColor = "bg-green-500";
        }

        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          bgColor = "bg-blue-500";
        }

        if (grid[row][col].isWall) {
          bgColor = "bg-black";
        }

        document.getElementById(
          `node-${row}-${col}`
        ).className = `w-[25px] h-[25px] border border-white inline-block ${bgColor}`;
      }
    }
    // Test end
    this.setState({ grid, unvisitedNodes, visitedNodesInOrder });
    this.props.mazeSetter(grid);
  }

  clearMaze() {
    const visitedNodesInOrder = [];
    const grid = getInitialGrid(FINISH_NODE_ROW + 1, FINISH_NODE_COL + 1);
    const unvisitedNodes = getAllNodes(grid);

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        let bgColor = "bg-slate-200";

        if (row === START_NODE_ROW && col === START_NODE_COL) {
          bgColor = "bg-green-500";
        }

        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          bgColor = "bg-blue-500";
        }

        document.getElementById(
          `node-${row}-${col}`
        ).className = `w-[25px] h-[25px] border border-white inline-block ${bgColor}`;
      }
    }

    this.setState({ grid, visitedNodesInOrder, unvisitedNodes });
    this.props.mazeSetter(grid);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex p-3 items-center shadow-lg flex-row space-x-4 rounded-lg bg-slate-100">
            <button
              className=" p-4 text-lg mt-2 shadow-md hover:shadow-xl hover:bg-red-600 bg-red-500 text-white rounded-md"
              onClick={() => this.visualizeDijkstra()}
            >
              Play
            </button>

            <button
              className=" p-4 text-md mt-2 shadow-md hover:shadow-xl hover:bg-gray-700 bg-black text-white rounded-md"
              onClick={() => this.next()}
            >
              Next
            </button>

            <button
              className=" p-4 text-md mt-2 shadow-md hover:shadow-xl hover:bg-red-700 bg-red-600 text-white rounded-md"
              onClick={() => this.randomize()}
            >
              Random Maze
            </button>

            <button
              className=" p-4 text-md mt-2 shadow-md hover:shadow-xl hover:bg-gray-700 bg-black text-white rounded-md"
              onClick={() => this.clearMaze()}
            >
              Reset
            </button>
          </div>

          <div className="grid rounded-md p-4 bg-slate-50 shadow-2xl">
            {grid.map((row, rowIdx) => {
              return (
                <div className="-mt-1" key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall, isVisited } =
                      node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        isVisited={isVisited}
                        row={row}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getInitialGrid = (rowLen, colLen) => {
  const grid = [];

  for (let row = 0; row < rowLen; row++) {
    const currentRow = [];
    for (let col = 0; col < colLen; col++) {
      currentRow.push(createNode(col, row, 0));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, isWall) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: isWall,
    previousNode: null,
  };
};
