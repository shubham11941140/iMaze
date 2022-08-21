import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_COL,
  FINISH_NODE_ROW
} from '../components/Dijkstra'

export function generateMaze (num_rows, num_cols) {
  const maze = []

  for (let i = 0; i < num_rows; i++) {
    maze[i] = []

    for (let j = 0; j < num_cols; j++) {
      maze[i][j] = createNode(i, j, Math.random() > 0.7 ? 1 : 0)
    }
  }

  maze[0][0] = createNode(0, 0, 0)
  maze[0][1] = createNode(0, 1, 0)
  maze[1][0] = createNode(1, 0, 0)
  maze[num_rows - 1][num_cols - 1] = createNode(num_rows - 1, num_cols - 1, 0)
  maze[num_rows - 2][num_cols - 1] = createNode(num_rows - 2, num_cols - 1, 0)
  maze[num_rows - 1][num_cols - 2] = createNode(num_rows - 1, num_cols - 2, 0)

  return maze
}

const createNode = (row, col, isWall) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall,
    previousNode: null,
    f: 0,
    g: 0,
    h: 0
  }
}
