const validChoices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let round = 0;

const initMessage = document.querySelector("p");
const enemyScore = document.getElementById("score");
const roundKeeper = document.getElementById("roundKeeper");
const weaponBtns = document.querySelectorAll("#weaponContainer button");
const enemyWeapon = document.getElementById("enemyWeapon");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * validChoices.length);
  return validChoices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    initMessage.textContent = `You chose,  ${humanChoice} the enemy chose ${computerChoice}. That makes it a Tie!`;
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    initMessage.textContent = `You chose, ${humanChoice} the enemy chose ${computerChoice}. You win! :)`;
    humanScore++;
  } else {
    initMessage.textContent = `You chose, ${humanChoice} the enemy chose ${computerChoice}. You loose :(`;
    computerScore++;
  }

  enemyScore.innerHTML = `Current Score <br /> Enemy ${computerScore} | Human ${humanScore}`;
}

function endGame() {
  weaponBtns.forEach((button) => (button.disabled = true));
  if (humanScore > enemyScore) {
    initMessage.textContent =
      "Game Over! Congratz you won! Thanks for playing.";
  } else {
    initMessage.textContent =
      "Game Over! Sorry you lost :( Thanks for playing.";
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  round = 0;
  initMessage.textContent = "";
  enemyScore.innerHTML = `Current Score <br /> Enemy ${computerScore} | Human ${humanScore}`;
  roundKeeper.innerHTML = `Round ${round}`;
  playAgainButton.classList.remove("visible");
  weaponBtns.forEach((button) => (button.disabled = false));
  initMessage.textContent = "Click below to choose your weapon!";
}

weaponBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const computerChoice = getComputerChoice();
    playRound(button.id, computerChoice);
    round++;
    roundKeeper.innerHTML = `Round ${round}`;
    if (round === 5) {
      endGame();
      playAgainButton.classList.add("visible");
    }
  });
});

playAgainButton.addEventListener("click", resetGame);
