import { getUnvisitedNeighbors, heuristic } from "./utils";

export function aStar(grid, startNode, finishNode) {

    const visitedNodesInOrder = [];
    var openList = [];
    var closedList = [];
    openList.push(startNode);
    startNode.isVisited = true;

    while (openList.length > 0) {

        openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
        var currentNode = openList.shift();

        if (currentNode.isWall) continue;

        visitedNodesInOrder.push(currentNode);

        // finishNode case -- result has been found, return the traced path
        if (currentNode.row == finishNode.row && currentNode.col == finishNode.col) {
            return visitedNodesInOrder;
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors
        closedList.push(currentNode);
        var unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

        for (const neighbor of unvisitedNeighbors) {

            // g score is the shortest distance from startNode to current node, we need to check if
            //   the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = currentNode.g + 1;
            var gScoreIsBest = false;

            if (!openList.includes(neighbor)) {

                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor, finishNode);
                openList.push(neighbor);
                neighbor.isVisited = true;
            } else if (gScore < neighbor.g) {

                // We have already seen the node, but last time it had a worse g (distance from startNode)
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {

                // Found an optimal (so far) path to this node.   Store info on how we got here and
                //  just how good it really is...
                neighbor.previousNode = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    return visitedNodesInOrder;
}

export function aStarStep(
    grid,
    visitedNodesInOrder,
    openList,
    closedList,
    finishNode
) {
    if (openList.length > 0) {

        openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
        var currentNode = openList.shift();

        if (currentNode.isWall) return currentNode;

        visitedNodesInOrder.push(currentNode);

        // Normal case -- move currentNode from open to closed, process each of its neighbors
        closedList.push(currentNode);
        var unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
        unvisitedNeighbors.filter((neighbor) => !neighbor.isWall);

        for (const neighbor of unvisitedNeighbors) {

            // g score is the shortest distance from startNode to current node, we need to check if
            //   the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = currentNode.g + 1;
            var gScoreIsBest = false;

            if (!openList.includes(neighbor)) {

                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor, finishNode);
                openList.push(neighbor);
                neighbor.isVisited = true;
            } else if (gScore < neighbor.g) {

                // We have already seen the node, but last time it had a worse g (distance from startNode)
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {

                // Found an optimal (so far) path to this node.   Store info on how we got here and
                //  just how good it really is...
                neighbor.previousNode = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
        return currentNode;
    }
}