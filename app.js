document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  const score = document.getElementById("score");
  const record = document.getElementById("record");
  const playAgainButton = document.getElementById("play-again");
  const gravity = 0.9;
  let score_count = 0;
  let record_count = 0;
  let isJumping = false;
  let isGameOver = false;

  function control(e) {
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
  }
  document.addEventListener("keydown", control);

  let position = 0;
  function jump() {
    isJumping = true;
    let count = 0;
    let timerId = setInterval(function () {
      // move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
            dino.style.bottom = 12 + "px";
          } else {
            position -= 4;
            count--;
            position *= gravity;
            dino.style.bottom = position + "px";
          }
        }, 20);
      }

      // move up
      position += 50;
      count++;
      position *= gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  /* function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePosition = 1000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 70 && position < 70) {
          clearInterval(timerId);
          clearTimeout(timerId);
          alert.innerHTML = "Game Over";
          isGameOver = true;

          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
          playAgainButton.style.display = "block";

          timeoutIds.forEach(clearTimeout);
          timeoutIds = []; // Reset the timeout tracking array
        }
        obstaclePosition -= 5;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);
      const timeoutId = setTimeout(generateObstacles, randomTime);
      timeoutIds.push(timeoutId); // Keep track of the timeout ID
    }
  } */

  scoreInterval = setInterval(function () {
    if (!isGameOver) {
      score_count++;
      score.textContent = `Score: ${score_count}`;
      if (score_count > record_count && record_count != 0) {
        score.style.color = "green";
      } else {
        score.style.color = "black";
      }
    }
  }, 1000); // Increment every second

  /*   playAgainButton.addEventListener("click", function () {
    if (score_count > record_count) {
      record_count = score_count;
    }

    score_count = 0;
    isGameOver = false;
    score.textContent = `Score: 0`;
    record.textContent = `Record: ${record_count}`;
    alert.innerHTML = "";
    grid.appendChild(dino);

    generateObstacles();

    playAgainButton.style.display = "none";
  }); */

  let intervalIds = []; // Array to store interval IDs for obstacle movement
  let timeoutIds = [];

  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePosition = 1000;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      // Create interval to move the obstacle
      let timerId = setInterval(function () {
        if (obstaclePosition > 0 && obstaclePosition < 70 && position < 70) {
          clearInterval(timerId); // Clear this obstacle's movement interval
          alert.innerHTML = "Game Over";
          isGameOver = true;

          // Remove all obstacles
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }

          // Clear all active timers (intervals and timeouts)
          timeoutIds.forEach(clearTimeout);
          intervalIds.forEach(clearInterval);
          timeoutIds = [];
          intervalIds = [];

          playAgainButton.style.display = "block";
        }
        obstaclePosition -= 5;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);
      intervalIds.push(timerId); // Track this interval ID

      // Schedule the next obstacle
      const timeoutId = setTimeout(generateObstacles, randomTime);
      timeoutIds.push(timeoutId); // Track this timeout ID
    }
  }

  playAgainButton.addEventListener("click", function () {
    if (score_count > record_count) {
      record_count = score_count;
    }

    score_count = 0;
    isGameOver = false;
    score.textContent = `Score: 0`;
    record.textContent = `Record: ${record_count}`;
    alert.innerHTML = "";
    grid.appendChild(dino);

    // Clear all lingering timers from the previous game
    timeoutIds.forEach(clearTimeout);
    intervalIds.forEach(clearInterval);
    timeoutIds = [];
    intervalIds = [];

    generateObstacles();

    playAgainButton.style.display = "none";
  });

  generateObstacles();
});
