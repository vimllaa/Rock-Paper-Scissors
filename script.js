const validChoices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let round = 0;

const initMessage = document.querySelector("p");
const enemyScore = document.getElementById("score");
const roundKeeper = document.getElementById("roundKeeper");
const weaponBtns = document.querySelectorAll("#userWeapon button");

const enemyRockButton = document.getElementById("enemyRock");
const enemyPaperButton = document.getElementById("enemyPaper");
const enemyScissorsButton = document.getElementById("enemyScissors");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * validChoices.length);
  return validChoices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    initMessage.innerHTML = `You chose,  ${humanChoice} the enemy chose ${computerChoice}. <br /> That makes it a Tie!`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    initMessage.innerHTML = `You chose ${humanChoice}, the enemy chose ${computerChoice}. <br /> You won! :)`;
    humanScore++;
  } else {
    initMessage.innerHTML = `You chose ${humanChoice}, the enemy chose ${computerChoice}. <br /> You lost :(`;
    computerScore++;
  }

  enemyScore.innerHTML = `Current Score <br /> Enemy ${computerScore} | Human ${humanScore}`;
}

function endGame() {
  weaponBtns.forEach((button) => (button.disabled = true));
  if (humanScore > enemyScore) {
    initMessage.innerHTML =
      "Game Over!  <br /> Congratz you won! Thanks for playing.";
  } else {
    initMessage.innerHTML =
      "Game Over! <br /> Sorry you lost. Thanks for playing.";
  }
  enemyScore.innerHTML = `Final Score <br /> Enemy ${computerScore} | Human ${humanScore}`;
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
  initMessage.innerHTML =
    "Click below to choose your weapon! <br /> Good Luck! ";
}

weaponBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const computerChoice = getComputerChoice();

    playRound(button.id, computerChoice);
    round++;
    roundKeeper.innerHTML = `Round ${round}`;

    if (computerChoice === "scissors") {
      enemyScissorsButton.classList.add("flash");
    } else if (computerChoice === "rock") {
      enemyRockButton.classList.add("flash");
    } else if (computerChoice === "paper") {
      enemyPaperButton.classList.add("flash");
    }

    setTimeout(() => {
      enemyRockButton.classList.remove("flash");
      enemyPaperButton.classList.remove("flash");
      enemyScissorsButton.classList.remove("flash");
    }, 500); // Duration of the flash animation

    if (round === 5) {
      endGame();
      playAgainButton.classList.add("visible");
    }
  });
});

playAgainButton.addEventListener("click", resetGame);
