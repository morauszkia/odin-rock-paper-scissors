// DOM ELEMENTS
const playerBtns = document.querySelectorAll('.player-choice-btn');
const computerBtns = document.querySelectorAll('.computer-choice-btn');
const resultsContainer = document.querySelector('.results-container');
const scoresContainer = document.getElementById('scores-container');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const roundResultText = document.getElementById('round-result-text');

// STATE
const INITIAL_STATE = {
  playerPoints: 0,
  computerPoints: 0,
};

// FUNCTIONS

// UTILITY FUNCTIONS
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

// Marks selected button and deselect others
const markBtn = (button) => {
  const buttons = button
    .closest('.choices-list')
    .querySelectorAll('.choice-btn');
  buttons.forEach((btn) => btn.classList.remove('chosen'));
  button.classList.add('chosen');
};

// GAMEPLAY FUNCTIONS

// DOM MANIPULATION
const resetField = () => {
  playerBtns.forEach((btn) => (btn.className = 'choice-btn player-choice-btn'));
  computerBtns.forEach(
    (btn) => (btn.className = 'choice-btn computer-choice-btn')
  );
  roundResultText.textContent = '';
  scoresContainer.classList.remove('hidden');
};

const showRestartButton = () => {
  roundResultText.classList.add('hidden');
  const restartBtn = document.createElement('button');
  restartBtn.innerText = 'NEW GAME';
  restartBtn.classList.add('restart-btn');
  restartBtn.addEventListener('click', startGame);
  resultsContainer.appendChild(restartBtn);
};

// GAMEPLAY LOGIC

const getComputerChoice = () => {
  const idx = Math.floor(Math.random() * 3);

  return computerBtns[idx];
};

const decideRoundWinner = (playerBtn, computerBtn) => {
  const playerChoice = playerBtn.querySelector('p').textContent;
  const computerChoice = computerBtn.querySelector('p').textContent;

  scoresContainer.classList.add('hidden');

  if (playerChoice === computerChoice) {
    playerBtn.classList.add('draw');
    computerBtn.classList.add('draw');
    roundResultText.textContent = prepareResultMessage(
      'draw',
      playerChoice,
      computerChoice
    );
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    // playerPoints++;
    playerBtn.classList.add('winner');
    computerBtn.classList.add('loser');
    roundResultText.textContent = prepareResultMessage(
      'win',
      playerChoice,
      computerChoice
    );
    state.playerPoints += 1;
    playerScore.innerText = state.playerPoints;
  } else {
    // computerPoints++;
    playerBtn.classList.add('loser');
    computerBtn.classList.add('winner');
    roundResultText.textContent = prepareResultMessage(
      'lose',
      playerChoice,
      computerChoice
    );
    state.computerPoints += 1;
    computerScore.innerText = state.computerPoints;
  }
};

const declareGameWinner = ({ playerPoints, computerPoints }) => {
  const result =
    playerPoints > computerPoints
      ? '🏆 You WIN! Congratulations! 🏆'
      : 'You have lost! Better luck next time! 🤞';

  roundResultText.innerText = result;

  setTimeout(showRestartButton, 2000);
};

const playRound = (event) => {
  const selectedPlayerBtn = event.target.closest('.player-choice-btn');
  markBtn(selectedPlayerBtn);

  const selectedComputerBtn = getComputerChoice();
  markBtn(selectedComputerBtn);

  setTimeout(() => {
    decideRoundWinner(selectedPlayerBtn, selectedComputerBtn);
    setTimeout(() => {
      if (state.playerPoints === 5 || state.computerPoints === 5) {
        declareGameWinner(state);
      } else {
        resetField();
      }
    }, 2000);
  }, 1000);
};

const startGame = () => {
  state = { ...INITIAL_STATE };
  playerScore.innerText = state.playerPoints;
  computerScore.innerText = state.computerPoints;
  resetField();
  document.querySelector('.restart-btn')?.remove();
  roundResultText.classList.remove('hidden');
};

// EVENT LISTENERS
playerBtns.forEach((btn) => btn.addEventListener('click', playRound));

startGame();
