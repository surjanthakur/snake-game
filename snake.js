document.addEventListener("DOMContentLoaded", () => {
  const snake_board = document.querySelector(".snake-board");
  const highScoreBoard = document.querySelector(".high-score");
  const ScoreElement = document.querySelector(".score");
  const restartGame = document.querySelector(".refresh-game");

  let blocks = [];
  const block_hight = 50;
  const block_width = 50;
  let direction = "left";
  let intervalid = null;
  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  highScoreBoard.innerHTML = `highScore: ${highScore}`;

  const rows = Math.floor(snake_board.clientHeight / block_hight);
  const columns = Math.floor(snake_board.clientWidth / block_width);

  let snake = [
    { x: 2, y: 12 },
    { x: 2, y: 13 },
  ];

  let snake_food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * columns),
  };

  // create blocks (iife. func) ------------------>
  function createBlocks() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        snake_board.appendChild(block);
        blocks[`${row}-${col}`] = block;
      }
    }
  }
  createBlocks();

  // snake render
  function renderSnake() {
    let head = null;

    blocks[`${snake_food.x}-${snake_food.y}`].classList.add("food");

    if (direction === "right") {
      head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "left") {
      head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "up") {
      head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
      head = { x: snake[0].x + 1, y: snake[0].y };
    }

    // game over logic -------------------------->
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
      clearInterval(intervalid);
      return;
    }

    // food consume logic ---------------------->
    if (snake_food.x === head.x && snake_food.y === head.y) {
      blocks[`${snake_food.x}-${snake_food.y}`].classList.remove("food");
      snake_food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * columns),
      };
      blocks[`${snake_food.x}-${snake_food.y}`].classList.add("food");
      snake.unshift(head);
      score += 10;
      ScoreElement.innerHTML = `score: ${score}`;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }

    // add color in new snake position -------------------->
    snake.forEach((block) => {
      blocks[`${block.x}-${block.y}`].classList.remove("snakeColor");
    });
    snake.unshift(head);
    snake.pop();
    snake.forEach((el) => {
      blocks[`${el.x}-${el.y}`].classList.add("snakeColor");
    });
  }

  restartGame.addEventListener("click", RestartGame);

  function RestartGame() {
    blocks[`${snake_food.x}-${snake_food.y}`].classList.remove("food");

    snake.forEach((block) => {
      blocks[`${block.x}-${block.y}`].classList.remove("snakeColor");
    });

    score = 0;
    snake = [{ x: 3, y: 12 }];
    ScoreElement.innerHTML = `score: ${score}`;
    highScoreBoard.innerHTML = `HighScore: ${highScore}`;

    snake_food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };

    intervalid = setInterval(() => {
      renderSnake();
    }, 300);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      direction = "up";
    } else if (e.key === "ArrowDown") {
      direction = "down";
    } else if (e.key === "ArrowRight") {
      direction = "right";
    } else if (e.key === "ArrowLeft") {
      direction = "left";
    }
  });
});
