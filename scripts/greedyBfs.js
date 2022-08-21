import { getUnvisitedNeighbors, heuristic } from './utils'

export function greedyBfs (grid, startNode, finishNode) {
  const visitedNodesInOrder = []

  // Create a Queue and add our initial node in it
  const q = []
  startNode.distance = 0
  q.push(startNode)
  startNode.isVisited = true

  // We'll continue till our queue gets empty
  while (!(q.length === 0)) {
    q.sort((nodeA, nodeB) => nodeA.h - nodeB.h)
    const currentNode = q.shift()

    if (currentNode.isWall) continue

    visitedNodesInOrder.push(currentNode)

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      return visitedNodesInOrder
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid)
    unvisitedNeighbors.filter((neighbor) => !neighbor.isWall)

    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1
      neighbor.previousNode = currentNode
      neighbor.h = heuristic(neighbor, finishNode)
      neighbor.isVisited = true
      q.push(neighbor)
    }
  }
  return visitedNodesInOrder
}

export function greedyBfsStep (q, visitedNodesInOrder, grid, finishNode) {
  if (!(q.length === 0)) {
    q.sort((nodeA, nodeB) => nodeA.h - nodeB.h)
    const currentNode = q.shift()

    if (currentNode.isWall) return currentNode

    visitedNodesInOrder.push(currentNode)

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid)
    unvisitedNeighbors.filter((neighbor) => !neighbor.isWall)

    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = currentNode.distance + 1
      neighbor.previousNode = currentNode
      neighbor.h = heuristic(neighbor, finishNode)
      neighbor.isVisited = true
      q.push(neighbor)
    }
    return currentNode
  }
}
