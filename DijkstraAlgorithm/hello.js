class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.graph = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  }

  minDistance(dist, sptSet) {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < this.V; v++) {
      if (!sptSet[v] && dist[v] < min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  dijkstra(src) {
    let dist = Array(this.V).fill(Infinity);
    let sptSet = Array(this.V).fill(false);

    dist[src] = 0;

    for (let count = 0; count < this.V - 1; count++) {
      let u = this.minDistance(dist, sptSet);
      sptSet[u] = true;

      for (let v = 0; v < this.V; v++) {
        if (!sptSet[v] && this.graph[u][v] !== 0 && dist[u] !== Infinity &&
            dist[u] + this.graph[u][v] < dist[v]) {
          dist[v] = dist[u] + this.graph[u][v];
        }
      }
    }

    this.printSolution(dist);
  }

  printSolution(dist) {
    console.log("Vertex \tDistance from Source");
    for (let i = 0; i < this.V; i++) {
      console.log(i + "\t" + dist[i]);
    }
  }
}

// Example usage
let graph = new Graph(9);
let inputGraph = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0]
];
graph.graph = inputGraph;
graph.dijkstra(0);
