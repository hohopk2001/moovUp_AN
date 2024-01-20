import { Component } from '@angular/core';

@Component({
  selector: 'calculate-node-path',
  templateUrl: './calculate-node-path.component.html',
  styleUrls: ['./calculate-node-path.component.css']
})
export class CalculateNodePathComponent {
  shortestPath: string[] = [];
  possiblePaths: string[][] = [];
  
  click(type: string) {
    // Define the nodes and edges
    const nodes = [
      { data: { id: 'A' } },
      { data: { id: 'B' } },
      { data: { id: 'C' } },
      { data: { id: 'D' } },
      { data: { id: 'E' } },
      { data: { id: 'F' } },
      { data: { id: 'G' } },
      { data: { id: 'H' } }
    ];

    const edges = [
      { data: { id: 'edge1', source: 'A', target: 'B' } },
      { data: { id: 'edge2', source: 'A', target: 'D' } },
      { data: { id: 'edge3', source: 'B', target: 'C' } },
      { data: { id: 'edge4', source: 'B', target: 'D' } },
      { data: { id: 'edge5', source: 'D', target: 'E' } },
      { data: { id: 'edge6', source: 'E', target: 'H' } },
      { data: { id: 'edge7', source: 'C', target: 'D' } },
      { data: { id: 'edge8', source: 'C', target: 'F' } },
      { data: { id: 'edge9', source: 'F', target: 'G' } },
      { data: { id: 'edge10', source: 'F', target: 'E' } },
      { data: { id: 'edge11', source: 'G', target: 'H' } },
      { data: { id: 'edge12', source: 'A', target: 'H' } },
      { data: { id: 'edge13', source: 'E', target: 'G' } }
    ];

    const startNode = 'A';
    const endNode = 'H';
    if(type === 'Short'){
      this.shortestPath = this.getShortestPath(nodes, edges, startNode, endNode);
    }else if(type === 'Possible') {
      this.possiblePaths = this.getAllPossiblePaths(nodes, edges, startNode, endNode);
    }
    
   
  }

 

  getShortestPath(nodes: any[], edges: any[], start: string, end: string): string[] {
    // Create a graph object
    const graph: any = {};
    for (const node of nodes) {
      graph[node.data.id] = [];
    }
    for (const edge of edges) {
      const source = edge.data.source;
      const target = edge.data.target;
      graph[source].push(target);
      graph[target].push(source);
    }

    // Create a queue for BFS traversal
    const queue: string[][] = [[start]];
    const visited: any = { [start]: true };

    while (queue.length > 0) {
      const path = queue.shift();
      const lastNode = path![path!.length - 1];

      if (lastNode === end) {
        return path!;
      }

      for (const neighbor of graph[lastNode]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push([...path!, neighbor]);
        }
      }
    }

    // If no path is found, return an empty array
    return [];
  }

  getAllPossiblePaths(nodes: any[], edges: any[], start: string, end: string): string[][] {
    const graph: any = {};
    for (const node of nodes) {
      graph[node.data.id] = [];
    }
    for (const edge of edges) {
      const source = edge.data.source;
      const target = edge.data.target;
      graph[source].push(target);
      graph[target].push(source);
    }

    const paths: string[][] = [];
    const visited: any = { [start]: true };

    this.dfs(start, end, graph, [start], paths, visited);

    return paths;
  }

  dfs(current: string, end: string, graph: any, path: string[], paths: string[][], visited: any) {
    if (current === end) {
      paths.push([...path]);
      return;
    }

    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        path.push(neighbor);
        this.dfs(neighbor, end, graph, path, paths, visited);
        path.pop();
        visited[neighbor] = false;
      }
    }
  }
}