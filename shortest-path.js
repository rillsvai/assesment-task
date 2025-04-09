import { deepStrictEqual } from "assert";
function findShortestPath(grid, start, end) {
  if (!Array.isArray(grid)) {
    return null;
  }

  const rows = grid.length;
  if (rows === 0) {
    return null;
  }

  const cols = grid[0].length;
  if (cols === 0) {
    return null;
  }

  const [startX, startY] = start;
  const [endX, endY] = end;

  if (
    startX < 0 ||
    startY < 0 ||
    startX >= rows ||
    startY >= cols ||
    endX < 0 ||
    endY < 0 ||
    endX >= rows ||
    endY >= cols ||
    grid[startX][startY] !== 0 ||
    grid[endX][endY] !== 0
  ) {
    return null;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  const queue = [];

  const visitedNodes = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  const parent = Array.from({ length: rows }, () =>
    new Array(cols).fill(undefined)
  );

  visitedNodes[startX][startY] = true;

  queue.push(start);

  let found = false;
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === endX && y === endY) {
      found = true;
      break;
    }

    for (const [dirX, dirY] of directions) {
      const nextX = x + dirX;
      const nextY = y + dirY;

      if (
        nextX < rows &&
        nextY < cols &&
        nextX >= 0 &&
        nextY >= 0 &&
        !visitedNodes[nextX][nextY] &&
        grid[nextX][nextY] === 0
      ) {
        visitedNodes[nextX][nextY] = true;
        queue.push([nextX, nextY]);
        parent[nextX][nextY] = [x, y];
      }
    }
  }

  if (!found) {
    return null;
  }

  const path = new Array();
  let [x, y] = end;

  while (x !== startX || y !== startY) {
    path.push([x, y]);
    const [parentX, parentY] = parent[x][y];
    x = parentX;
    y = parentY;
  }

  path.push([startX, startY]);

  return { path: path.reverse(), steps: path.length - 1 };
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
