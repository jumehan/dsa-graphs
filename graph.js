/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    if (vertex.adjacent.size > 0) {
      vertex.adjacent.forEach((v) => this.removeEdge(v, vertex));
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, seen = new Set([start]), visited = [start.value]) {
    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        visited.push(neighbor.value);
        return this.depthFirstSearch(neighbor, seen, visited);
      }
    }
    return visited;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set([start]);
    let visited = [start.value];

    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
          visited.push(neighbor.value);
        }
      }
    }
    return visited;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    if (start === end) {
      return 0;
    }

    let toVisitQueue = [[start, 0]];
    let seen = new Set([start]);

    while (toVisitQueue.length > 0) {
      let [current, length] = toVisitQueue.shift();
      if (current === end) {
        return length;
      }
      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push([neighbor, length + 1]);
          seen.add(neighbor);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
