const validChoices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let round = 0;

const initMessage = document.getElementById("initDisplay");
const enemyScore = document.getElementById("enemyScore");
const userScore = document.getElementById("userScore");
const roundKeeper = document.getElementById("roundKeeper");
const weaponBtns = document.querySelectorAll("#userWeapon button");
const enemyChoiseDisplay = document.getElementById("choiseByEnemy");
const roundKeeperFive = document.getElementById("roundKeeperFive");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * validChoices.length);
  return validChoices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  displayEnemyChoise(computerChoice);

  if (humanChoice === computerChoice) {
    initMessage.innerHTML = `You chose,  ${humanChoice} the enemy chose ${computerChoice}. <br /> That makes it a Tie!`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    initMessage.innerHTML = `You chose ${humanChoice}, the enemy chose ${computerChoice}. <br /> You won! :)`;
    humanScore++;
    userScore.innerHTML = `${humanScore}`;
  } else {
    initMessage.innerHTML = `You chose ${humanChoice}, the enemy chose ${computerChoice}. <br /> You lost :(`;
    computerScore++;
    enemyScore.innerHTML = `${computerScore}`;
  }
}

function endGame(humanScore, enemyScore) {
  weaponBtns.forEach((button) => (button.disabled = true));

  if (humanScore > enemyScore) {
    initMessage.innerHTML =
      "You won! Congratulations! <br />  Thanks for playing.";
  } else if (enemyScore > humanScore) {
    initMessage.innerHTML =
      "Game Over! <br /> Sorry you lost. Thanks for playing.";
  } else {
    initMessage.innerHTML = "It's a tie! Play again!";
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  round = 0;
  initMessage.textContent = "";
  enemyScore.innerHTML = `0`;
  userScore.innerHTML = `0`;
  roundKeeperFive.classList.remove("roundBackground");
  playAgainButton.classList.remove("visible");
  weaponBtns.forEach((button) => (button.disabled = false));
  enemyChoiseDisplay.src = `Images/questionmark.svg`;
  initMessage.innerHTML =
    "Click below to choose your weapon! <br /> Good Luck! ";
}

weaponBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const computerChoice = getComputerChoice();
    button.classList.add("button-click");
    playRound(button.id, computerChoice);
    setActiveRound(round);
    round++;

    if (round === 5) {
      endGame(humanScore, computerScore);
      playAgainButton.classList.add("visible");
    }
  });
});

playAgainButton.addEventListener("click", resetGame);

function displayEnemyChoise(weapon) {
  enemyChoiseDisplay.src = `Images/${weapon}.svg`;
  enemyChoiseDisplay.classList.remove("fade-in");

  void enemyChoiseDisplay.offsetWidth;
  enemyChoiseDisplay.classList.add("fade-in");
}

function setActiveRound(round) {
  document.querySelectorAll("#roundKeeper li").forEach((li) => {
    li.classList.remove("roundBackground");
  });

  const activeItem = document.querySelector(
    `#roundKeeper li:nth-child(${round + 1})`
  );
  if (activeItem) {
    activeItem.classList.add("roundBackground");
  }
}
