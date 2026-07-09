// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

let score = 0;
let timeLeft = 30;
let timerInterval;

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  score = 0;
  timeLeft = 30;

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft; 

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      document.getElementById("time").textContent = 0;
      endGame();
      return;
    }

    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
  }, 1000);
}

function createDrop() {
  if (!gameRunning) return;

  const drop = document.createElement("div");
  drop.className = "water-drop";

  const isBad = Math.random() < 0.25;

  if (isBad) {
    drop.classList.add("bad-drop");
  }

  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  drop.style.animationDuration = "4s";

  document.getElementById("game-container").appendChild(drop);

  drop.addEventListener("click", () => {
    if (!gameRunning) return;

    if (isBad) {
      score -= 5;
    } else {
      score += 10;
    }

    document.getElementById("score").textContent = score;
    drop.remove();
  });

  drop.addEventListener("animationend", () => {
    drop.remove();
  });
}

function endGame() {
  if (!gameRunning) return;

  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(timerInterval);

  document.querySelectorAll(".water-drop").forEach(drop => drop.remove());

  alert("Game Over! Final Score: " + score);
}
