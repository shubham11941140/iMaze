export function getAllNodes (grid) {
  const nodes = []

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

export function getUnvisitedNeighbors (node, grid) {
  const neighbors = []
  const { col, row } = node

  if (row > 0) neighbors.push(grid[row - 1][col])

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])

  if (col > 0) neighbors.push(grid[row][col - 1])

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

export function getUnwalledNeighbors (node, grid) {
  const neighbors = []
  const { col, row } = node

  if (row > 0) neighbors.push(grid[row - 1][col])

  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])

  if (col > 0) neighbors.push(grid[row][col - 1])

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isWall)
}

export function sortNodesByDistance (unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestPathOrder (finishNode) {
  const nodesInShortestPathOrder = []
  let currentNode = finishNode

  while (currentNode !== null && currentNode.row !== -1) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}

export function heuristic (node0, node1) {
  // This is the Manhattan distance
  const d1 = Math.abs(node1.row - node0.row)
  const d2 = Math.abs(node1.col - node0.col)
  return d1 + d2
}
