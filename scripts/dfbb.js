import { getUnwalledNeighbors } from './utils'

export function dfbb (grid, startNode, finishNode) {
  const visitedNodesInOrder = []

  // Create a Queue and add our initial node in it
  const openList = []
  let bestCost = Infinity
  startNode.distance = 0
  openList.push(startNode)
  startNode.isVisited = true

  // We'll continue till our queue gets empty
  while (!(openList.length === 0)) {
    const currentNode = openList.shift()

    if (currentNode.isWall) continue

    visitedNodesInOrder.push(currentNode)

    if (currentNode.distance >= bestCost) continue

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      if (openList.length == 0) return visitedNodesInOrder
      else {
        bestCost = Math.min(bestCost, currentNode.distance)
        continue
      }
    }

    const unwalledNeighbors = getUnwalledNeighbors(currentNode, grid)

    for (const neighbor of unwalledNeighbors) {
      if (
        currentNode.previousNode.row == neighbor.row &&
        currentNode.previousNode.col == neighbor.col
      ) {
        continue
      }

      if (openList.includes(neighbor)) {
        if (currentNode.distance + 1 >= neighbor.distance) continue
        else {
          neighbor.distance = currentNode.distance + 1
          neighbor.previousNode = currentNode
          continue
        }
      }

      neighbor.distance = currentNode.distance + 1
      neighbor.previousNode = currentNode
      neighbor.isVisited = true
      openList.unshift(neighbor)
    }
  }
  return visitedNodesInOrder
}

export function dfbbStep (
  openList,
  bestCost,
  visitedNodesInOrder,
  grid,
  finishNode
) {
  if (!(openList.length === 0)) {
    const currentNode = openList.shift()

    if (currentNode.isWall) return currentNode

    visitedNodesInOrder.push(currentNode)

    if (currentNode.distance >= bestCost) return

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      if (openList.length == 0) return visitedNodesInOrder
      else {
        bestCost = Math.min(bestCost, currentNode.distance)
      }
    }

    const unvisitedNeighbors = getUnwalledNeighbors(currentNode, grid)

    for (const neighbor of unvisitedNeighbors) {
      if (
        currentNode.previousNode.row == neighbor.row &&
        currentNode.previousNode.col == neighbor.col
      ) {
        continue
      }

      neighbor.distance = currentNode.distance + 1
      neighbor.previousNode = currentNode
      neighbor.isVisited = true
      openList.unshift(neighbor)
    }
    return currentNode
  }
}
