```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <canvas id="gameCanvas"></canvas>
        <div class="score">Score: <span id="score">0</span></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    font-family: sans-serif;
    margin: 0;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
}

canvas {
    background-color: #eee;
    border: 2px solid #000;
    width: 100%;
    height: auto;
    max-height: 400px;
}

.score {
    margin-top: 10px;
    font-size: 1.2rem;
}
```

```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = "right";
let score = 0;
let moveInterval = 100; // Initial move interval (in milliseconds)

// Function to resize the canvas to fit the screen
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8; // 80% of screen width
  canvas.height = canvas.width; // Keep it square
  // Update game logic variables if needed, e.g., gridSize, food position
  generateFood();
}

// Generate food at random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };
}

// Draw snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((part, index) => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });
}

// Draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Update score display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Move snake
function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Check for collisions with walls and itself
  if (
    head.x < 0 ||
    head.x >= canvas.width / gridSize ||
    head.y < 0 ||
    head.y >= canvas.height / gridSize ||
    checkCollision(head)
  ) {
    gameOver();
  } else {
    snake.unshift(head);
  }

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    generateFood();
  } else {
    snake.pop();
  }
}

// Check for collision with snake's body
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Game over
function gameOver() {
  alert("Game Over! Your score is " + score);
  resetGame();
}

// Reset game
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  score = 0;
  updateScore();
  generateFood();
}

// Handle key presses
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  drawSnake();
  drawFood();
  setTimeout(gameLoop, moveInterval); // Use setTimeout for the game loop
}

// Initialize game
resizeCanvas(); // Call resizeCanvas initially
generateFood();
gameLoop();

// Event listener for window resize
window.addEventListener('resize', resizeCanvas);
```

**Explanation of Changes:**

**HTML:**
- Added a `div` with the class `game-container` to wrap the canvas and score display. This allows us to style the game area and make it responsive.
- Moved the score display inside the `game-container` to keep it together.

**CSS:**
- Added styles for the `game-container` class to center the game elements and control their width and alignment.
- Set the `canvas` width to 100% and height to `auto` to make it responsive to the container size. Also added `max-height` to prevent the canvas from getting too large.
- Added basic styles for the score display to position and size it.

**JavaScript:**
- Added a `resizeCanvas()` function to handle the resizing of the canvas when the window size changes. It calculates the new canvas dimensions based on the screen width and sets the canvas dimensions. You might need to adjust the percentage (currently 80%) based on your desired canvas size.
- Added an event listener for the `resize` event to call `resizeCanvas()` whenever the window size changes.
- Called `resizeCanvas()` at the beginning of the script to ensure the canvas is correctly sized on initial page load.

**How it works:**

- The `game-container` div acts as a container for the game elements. It sets the maximum width of the game area, making it responsive.
- The `canvas` is set to take up 100% of the container's width and adjust its height automatically, ensuring it scales proportionally with the container.
- The `resizeCanvas()` function updates the canvas dimensions based on the window size, maintaining the game's aspect ratio.
- The event listener for window resizing calls `resizeCanvas()` whenever the window size changes, ensuring the game adapts to the new dimensions.

This code provides a responsive foundation for your Snake game. It allows the game to adjust its size and layout according to different screen sizes.
