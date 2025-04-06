# Shortest Path Finder Algorithm

## Description
This JavaScript implementation finds the shortest path between two points in a 2D grid using Breadth-First Search (BFS). The solution was developed as part of the BNA Smart Payment technical assessment.

## Features
- Finds shortest path in a grid with obstacles
- Returns both path coordinates and step count
- Handles various edge cases
- Test coverage

## Installation
No installation required. Just include the JavaScript file in your project.

## Usage

### Basic Example
```javascript
const grid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];
const start = [0, 0];
const end = [2, 2];

const result = findShortestPath(grid, start, end);
console.log(result);
/* Output:
{
  path: [[0,0], [0,1], [0,2], [1,2], [2,2]],
  steps: 4
}
*/