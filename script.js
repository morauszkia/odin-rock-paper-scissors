const OPTIONS = ['rock', 'paper', 'scissors'];

let playerPoints = 0;
let computerPoints = 0;

const getComputerChoice = () => {
  const idx = Math.floor(Math.random() * 3);

  return OPTIONS[idx];
};

const getPlayerChoice = () => {
  let playerChoiceString = prompt(
    'Choose your weapon! Is it ROCK, PAPER or SCISSORS?'
  ).toLowerCase();
  let playerChoice = OPTIONS.includes(playerChoiceString)
    ? playerChoiceString
    : null;

  while (!playerChoice) {
    playerChoiceString = prompt(
      'Invalid choice! Did you mean ROCK, PAPER or SCISSORS?'
    ).toLowerCase();
    playerChoice = OPTIONS.includes(playerChoiceString)
      ? playerChoiceString
      : null;
  }

  return playerChoice;
};

const prepareResultMessage = (result, playerChoice, computerChoice) => {
  const winnerChoice = result === 'win' ? playerChoice : computerChoice;
  const loserChoice = result === 'lose' ? playerChoice : computerChoice;

  if (result === 'draw') {
    return `It's a draw! You both chose ${capitalizeString(playerChoice)}`;
  }

  return `You ${result}! ${capitalizeString(
    winnerChoice
  )} beats ${capitalizeString(loserChoice)}.`;
};

const capitalizeString = (string) =>
  `${string.slice(0, 1).toUpperCase()}${string.slice(1).toLowerCase()}`;

const playRound = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) {
    return prepareResultMessage('draw', playerSelection, computerSelection);
  }

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    playerPoints++;
    return prepareResultMessage('win', playerSelection, computerSelection);
  } else {
    computerPoints++;
    return prepareResultMessage('lose', playerSelection, computerSelection);
  }
};

const declareWinner = (playerPoints, computerPoints) => {
  const result =
    playerPoints > computerPoints
      ? '🏆 You WIN! Congratulations! 🏆'
      : 'You have lost! Better luck next time! 🤞';

  console.log(result);
};

const game = () => {
  computerPoints = 0;
  playerPoints = 0;

  console.log('The first player to reach 3 points wins the game!');

  while (computerPoints < 3 && playerPoints < 3) {
    const computerChoice = getComputerChoice();
    const playerChoice = getPlayerChoice();

    console.log(playRound(playerChoice, computerChoice));
    console.log(`Player: ${playerPoints} - Computer: ${computerPoints}`);
  }

  declareWinner(playerPoints, computerPoints);
};

game();
