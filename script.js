const GAME_PIXEL_LENGTH = 40;
const TOTAL_GAME_PIXELS = Math.pow(GAME_PIXEL_LENGTH, 2);

let totalFoodAte = 0;

const container = document.getElementById("container");

const createGameBoardPixels = () => {
  for (let i = 1; i <= TOTAL_GAME_PIXELS; ++i) {
    container.innerHTML = `${container.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};

const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

let currentFoodPostion = 0;
const createFood = () => {
  gameBoardPixels[currentFoodPostion].classList.remove("food");
  currentFoodPostion = Math.floor(Math.random() * TOTAL_GAME_PIXELS);
  gameBoardPixels[currentFoodPostion].classList.add("food");
};

const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = newDirection => {
  if (newDirection == snakeCurrentDirection) return;

  if (newDirection == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
    snakeCurrentDirection = newDirection;
  } else if (newDirection == UP_DIR && snakeCurrentDirection != DOWN_DIR) {
    snakeCurrentDirection = newDirection;
  } else if (newDirection == RIGHT_DIR && snakeCurrentDirection != LEFT_DIR) {
    snakeCurrentDirection = newDirection;
  } else if (newDirection == DOWN_DIR && snakeCurrentDirection != UP_DIR) {
    snakeCurrentDirection = newDirection;
  }
};

let currentSnakeHeadPosition = TOTAL_GAME_PIXELS / 2;

let snakeLength = 500;

const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      {
        --currentSnakeHeadPosition;
        const isLastPixel = currentSnakeHeadPosition % GAME_PIXEL_LENGTH == GAME_PIXEL_LENGTH - 1 || currentSnakeHeadPosition < 0;
        if (isLastPixel) {
          currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_LENGTH;
        }
        break;
      }
    case UP_DIR:
      {
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_LENGTH;
        const isLastPixel = currentSnakeHeadPosition < 0;
        if (isLastPixel) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition + TOTAL_GAME_PIXELS;
        }
        break;
      }
    case RIGHT_DIR:
      {
        ++currentSnakeHeadPosition;
        const isLastPixel = currentSnakeHeadPosition % GAME_PIXEL_LENGTH == 0;
        if (isLastPixel) {
          currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_LENGTH;
        }
        break;
      }
    case DOWN_DIR:
      {
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_LENGTH;
        const isLastPixel = currentSnakeHeadPosition > TOTAL_GAME_PIXELS - 1;
        if (isLastPixel) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition - TOTAL_GAME_PIXELS;
        }
        break;
      }
    default:
      break;
  }

  let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    clearInterval(moveSnakeInterval);
    if (
      !alert(
        ` GAME OVER
Your Score is ${totalFoodAte}.`
      )
    )
      window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);

  if (currentSnakeHeadPosition == currentFoodPostion) {
    totalFoodAte++;
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;
    snakeLength = snakeLength + 100;
    createFood();
  }
};

createGameBoardPixels();
createFood();
var moveSnakeInterval = setInterval(moveSnake, 80);

addEventListener("keydown", e => changeDirection(e.keyCode));
