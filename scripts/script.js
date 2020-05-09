const computer = document.querySelector('.computer-selection');
const buttons = document.querySelectorAll('button.selection');
const reset = document.querySelector('button.reset');
const roundResults = document.querySelector('div.scoreboard > p.round');
const gameResult = document.querySelector('div.scoreboard > p.game');
const userScoreContainer = document.querySelector('div.scores > #user');
const computerScoreContainer = document.querySelector('div.scores > #computer')
const computerMove = document.createElement('i');
const brainClassList = 'fas fa-brain';
const rockClassList = 'far fa-hand-rock';
const paperClassList = 'far fa-hand-paper';
const scissorsClassList = 'far fa-hand-scissors';

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;

computerMove.className = brainClassList;
computer.appendChild(computerMove);

buttons.forEach(button => {
  button.addEventListener('click', playRound);
});

reset.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  showScore();
  roundResults.textContent = `Make a move!`;
  gameResult.textContent = 'The winner is...';
  gameResult.classList.remove('win-lose');
  computerMove.classList = brainClassList;
  buttons.forEach(button => {
    button.removeAttribute('disabled');
    button.style.backgroundColor = '';
  });
});

const playerScoreP = document.createElement('p');
const computerScoreP = document.createElement('p');
playerScoreP.classList.add('individual-score');
computerScoreP.classList.add('individual-score');

function showScore() {
  playerScoreP.textContent = `${playerScore}`;
  computerScoreP.textContent = `${computerScore}`;
}

showScore();
userScoreContainer.appendChild(playerScoreP);
computerScoreContainer.appendChild(computerScoreP);

function updateScore(roundResult) {
  if (!roundResult.indexOf('You win!')) {
    playerScore++;
  } else if (!roundResult.indexOf('You lose!')) {
    computerScore++;
  }
  showScore();
}

function showGameResult() {
  const result = playerScore > computerScore ? 'You win, Drink up!' : 'You lose, Drink some more!';
  gameResult.classList.toggle('win-lose');
  gameResult.textContent = result;
}
function disablePlayingButtons() {
  buttons.forEach(button => {
    button.style.backgroundColor = 'black';
    button.setAttribute('disabled', 'true');
  });
}
function checkWin() {
  if (playerScore === 5 || computerScore === 5) {
    showGameResult();
    disablePlayingButtons();
  }
}

function showRoundResult(roundResult, playerSelection, computerSelection) {
  if (roundResults.childElementCount > 0) roundResults.removeChild(roundResults.firstElementChild);
  const currentRoundResult = document.createElement('p');
  currentRoundResult.textContent = `Your selection: ${playerSelection}. Computer's selection: ${computerSelection}. Round result: ${roundResult}`;
  roundResults.appendChild(currentRoundResult);
}

function computerPlay() {
  const computerChoice = Math.floor(Math.random() * 3);
  return computerChoice === 0 ? 'rock' :
    computerChoice === 1 ? 'paper' :
      'scissors';
}

function updateComputerMove() {
  const computerChoice = computerPlay();
  computerMove.classList = '';
  computerMove.classList = (
    computerChoice === 'rock' ? rockClassList :
      computerChoice === 'paper' ? paperClassList :
        scissorsClassList
  );
  return computerChoice;
}

function checkRoundResult(playerSelection, computerSelection) {
  const wins = {
    paper: "rock",
    rock: "scissors",
    scissors: "paper"
  };

  if (playerSelection === computerSelection) {
    return 'Tie!';
  }
  if (wins[playerSelection] === computerSelection) {
    return `You win! ${playerSelection} beats ${computerSelection}`;
  }

  return `You lose! ${computerSelection} beats ${playerSelection}`;
}

function updateRoundNumber() {
  roundNumber++;
  roundResults.textContent = `Round ${roundNumber}`
}

function playRound(buttonClicked) {
  updateRoundNumber();
  const computerSelection = updateComputerMove();
  const playerSelection = buttonClicked.currentTarget.classList[1];
  const roundResult = checkRoundResult(playerSelection, computerSelection);
  updateScore(roundResult);
  showRoundResult(roundResult, playerSelection, computerSelection);
  checkWin();
}
