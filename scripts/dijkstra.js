import { START_NODE_COL, START_NODE_ROW } from '../components/Dijkstra'
import {
  getAllNodes,
  getUnvisitedNeighbors,
  sortNodesByDistance
} from './utils'

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra (grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()

    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue

    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder

    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)

    if (closestNode === finishNode) return visitedNodesInOrder

    updateUnvisitedNeighbors(closestNode, grid)
  }
}

export function dijkstraStep (unvisitedNodes, visitedNodesInOrder, grid) {
  sortNodesByDistance(unvisitedNodes)
  const closestNode = unvisitedNodes.shift()

  if (closestNode.row == START_NODE_ROW && closestNode.col == START_NODE_COL) {
    closestNode.distance = 0
  }

  // If we encounter a wall, we skip it.
  if (closestNode.isWall) return closestNode

  // If the closest node is at a distance of infinity,
  // we must be trapped and should therefore stop.
  if (closestNode.distance === Infinity) return closestNode

  closestNode.isVisited = true
  visitedNodesInOrder.push(closestNode)
  updateUnvisitedNeighbors(closestNode, grid)
  return closestNode
}

function updateUnvisitedNeighbors (node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}
