import { deepStrictEqual } from "assert";

function findShortestPath(grid, start, end) {
  const rows = grid.length;
  if (rows === 0) return null;
  const cols = grid[0].length;

  const [startX, startY] = start;
  const [endX, endY] = end;

  if (
    startX < 0 ||
    startX >= rows ||
    startY < 0 ||
    startY >= cols ||
    grid[startX][startY] !== 0
  ) {
    return null;
  }
  if (
    endX < 0 ||
    endX >= rows ||
    endY < 0 ||
    endY >= cols ||
    grid[endX][endY] !== 0
  ) {
    return null;
  }

  if (startX === endX && startY === endY) {
    return { path: [[startX, startY]], steps: 0 };
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const queue = [[startX, startY]];
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  visited[startX][startY] = true;

  const parent = Array.from({ length: rows }, () => new Array(cols).fill(null));

  let found = false;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === endX && y === endY) {
      found = true;
      break;
    }

    for (const [dx, dy] of directions) {
      const nextX = x + dx;
      const nextY = y + dy;

      if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols) {
        if (!visited[nextX][nextY] && grid[nextX][nextY] === 0) {
          visited[nextX][nextY] = true;
          parent[nextX][nextY] = [x, y];
          queue.push([nextX, nextY]);
        }
      }
    }
  }

  if (!found) return null;

  const path = [];
  let current = [endX, endY];
  while (current[0] !== startX || current[1] !== startY) {
    path.push(current);
    const [px, py] = parent[current[0]][current[1]];
    current = [px, py];
  }
  path.push([startX, startY]);
  path.reverse();

  const steps = path.length - 1;

  return { path: path, steps: steps };
}

const testCases = [
  // Test Case 1: Simple Path
  {
    input: {
      grid: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      start: [0, 0],
      end: [2, 2],
    },
    expectedOutput: {
      path: [
        [0, 0],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      steps: 4,
    },
  },
  // Test Case 2: No Path (Blocked by Walls)
  {
    input: {
      grid: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      start: [0, 0],
      end: [0, 2],
    },
    expectedOutput: null,
  },
  // Test Case 3: Start Equals End
  {
    input: {
      grid: [
        [0, 0],
        [0, 0],
      ],
      start: [1, 1],
      end: [1, 1],
    },
    expectedOutput: {
      path: [[1, 1]],
      steps: 0,
    },
  },
  // Test Case 4: Large Grid with Multiple Paths
  {
    input: {
      grid: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      start: [0, 0],
      end: [4, 4],
    },
    expectedOutput: {
      path: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      steps: 8,
    },
  },
  // Test Case 5: Edge Case - Single Cell Grid
  {
    input: {
      grid: [[0]],
      start: [0, 0],
      end: [0, 0],
    },
    expectedOutput: {
      path: [[0, 0]],
      steps: 0,
    },
  },
  // Test Case 6: Edge Case - Start or End is a Wall
  {
    input: {
      grid: [
        [0, 0],
        [0, 1],
      ],
      start: [0, 0],
      end: [1, 1],
    },
    expectedOutput: null,
  },
  // Test Case 7: Edge Case - Start or End Out of Bounds
  {
    input: {
      grid: [
        [0, 0],
        [0, 0],
      ],
      start: [2, 2],
      end: [0, 0],
    },
    expectedOutput: null,
  },
];

testCases.forEach((testCase, index) => {
  try {
    const result = findShortestPath(
      testCase.input.grid,
      testCase.input.start,
      testCase.input.end
    );
    deepStrictEqual(result, testCase.expectedOutput);
    console.log(`✅ Test Case ${index + 1} Passed`);
  } catch (error) {
    console.error(`❌ Test Case ${index + 1} Failed:`, error.message);
  }
});
