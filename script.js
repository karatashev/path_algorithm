// Define the grid
const grid = [
  ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
  ['+', '-', 'U', '-', '+', ' ', ' ', ' ', 'C'],
  ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
  ['s', ' ', ' ', ' ', 'C', '-', '-', '-', '+']
];

// Find the start and end positions, initialize variables
let startX = 0, startY = 0, endX = 0, endY = 0;
grid.forEach((row, i) => {
  row.forEach((element, j) => {
      if (element === '>') {
          startX = i;
          startY = j;
      }
      if (element === 's') {
          endX = i;
          endY = j;
      }
  });
});

let path = '>'; // Starting with '>'
let letters = ''; // To store the collected letters
let currentX = startX, currentY = startY;
let previousDirection = ''; // To store the last direction of movement

console.log(`Start of the path: (${startX},${startY}), End of the path: (${endX},${endY})`);

// Directions mapped to their positions in the grid and opposite directions
const directions = {
  'right': { rowPosition: 0, columnPosition: 1, opposite: 'left' },
  'down': { rowPosition: 1, columnPosition: 0, opposite: 'up' },
  'left': { rowPosition: 0, columnPosition: -1, opposite: 'right' },
  'up': { rowPosition: -1, columnPosition: 0, opposite: 'down' }
};

// Attempt to move in a direction and update position if successful
function tryToMove(direction) {
  const move = directions[direction];
  const newX = currentX + move.rowPosition;
  const newY = currentY + move.columnPosition;
  console.log(`Trying to move ${direction} from (${currentX},${currentY}) to (${newX},${newY})`);

  // Check grid margins and non-space elements
  if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && grid[newX][newY] !== ' ') {
      currentX = newX;
      currentY = newY;
      path += grid[newX][newY]; // Add every correct step of the path
      if (grid[newX][newY].match(/[A-Z]/)) {
          letters += grid[newX][newY];
      }
      previousDirection = direction;
      console.log(`Moved ${direction} to (${newX},${newY}), Path so far: ${path}`);
      return true;
  }
  console.log(`Failed to move ${direction}`);
  return false;
}

// Main loop to follow the path
while (currentX !== endX || currentY !== endY) {
  let moved = false;
  console.log(`Current position: (${currentX},${currentY}), trying to continue ${previousDirection}`);

  // Try to continue in the same direction first
  if (previousDirection && tryToMove(previousDirection)) {
      moved = true;
  } else {
      // If unable to continue, try other directions
      for (const direction in directions) {
          if (direction !== previousDirection && directions[direction].opposite !== previousDirection && tryToMove(direction)) { 
              moved = true;
              break;
          }
      }
  }
  // If unable to move, break to avoid infinite loops
  if (!moved) {
      console.log(`Stuck at (${currentX},${currentY}), unable to move`);
      break;
  }
}

console.log(`Final Path: ${path}`);
console.log(`Collected Letters: ${letters}`);
