const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = "right";
let score = 0;
let moveInterval = 100; // Initial move interval (in milliseconds)

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
  document.getElementById("score").textContent = `Score: ${score}`;
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
generateFood();
gameLoop();
