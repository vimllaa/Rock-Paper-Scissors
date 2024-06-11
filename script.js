const validChoices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * validChoices.length);
  return validChoices[randomIndex];
}

function getHumanChoice() {
  let humanChoice = prompt("Choose your weapon: rock, paper, or scissors?");
  humanChoice = humanChoice.toLowerCase();

  while (!validChoices.includes(humanChoice)) {
    console.log("Invalid choice. You need to choose rock, paper, or scissors.");
    humanChoice = prompt("Choose your weapon: rock, paper, or scissors?");
    humanChoice = humanChoice.toLowerCase();
  }

  return humanChoice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("It's a tie!");
    return 0;
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log(`You win, ${humanChoice} beats ${computerChoice}!`);
    return 1;
  } else {
    console.log(`You lose, ${computerChoice} beats ${humanChoice}!`);
    return -1;
  }
}

function playGame() {
  for (let i = 1; i <= 5; i++) {
    console.log(`Welcome to round ${i}`);
    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();
    console.log(`Human chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    const result = playRound(humanChoice, computerChoice);

    if (result === 1) {
      humanScore++;
    } else if (result === -1) {
      computerScore++;
    }
  }

  console.log(
    `Game is finished! Computer scored ${computerScore} points, Human scored ${humanScore} points!`
  );
}

let humanChoice = getHumanChoice();
let computerChoice = getComputerChoice();

playGame(humanChoice, computerChoice);
