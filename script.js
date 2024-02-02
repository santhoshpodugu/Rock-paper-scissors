let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

scoreSection();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      let playerMove = computerChoice();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".autoplay-button").innerHTML = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".autoplay-button").innerHTML = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerPick = computerChoice();
  let result = "";

  if (playerMove === computerPick) {
    result = "Tie";
    score.ties++;
  } else if (
    (playerMove === "Rock" && computerPick === "Scissors") ||
    (playerMove === "Scissors" && computerPick === "Paper") ||
    (playerMove === "Paper" && computerPick === "Rock")
  ) {
    result = "You win";
    score.wins++;
  } else {
    result = "You lose";
    score.losses++;
  }

  document.querySelector(".resultElem").innerHTML = ` ${result}.`;

  document.querySelector(
    ".moveElem"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
    -<img src="images/${computerPick}-emoji.png" class="move-icon"> Computer`;

  scoreSection();
  // Storing the score in local storage so that score stays even after reloading page.
  localStorage.setItem("score", JSON.stringify(score));
}

function scoreSection() {
  document.querySelector(
    ".scoreElem"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  scoreSection();
  localStorage.removeItem("score");
}

function computerChoice() {
  const randomNum = Math.random();
  let computerPick = "";
  if (randomNum < 1 / 3) {
    computerPick = "Rock";
  } else if (randomNum < 2 / 3) {
    computerPick = "Paper";
  } else {
    computerPick = "Scissors";
  }
  return computerPick;
}
