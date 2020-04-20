const computer = document.querySelector('.computer-selection');
const buttons = document.querySelectorAll('button.selection');
const reset = document.querySelector('button.reset');
const roundResults = document.querySelector('div.scoreboard > p.round');
const gameResult = document.querySelector('div.scoreboard > p.game');
const score = document.querySelector('div.scoreboard > p.score');
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
/*computer.style.backgroundImage = 'url(./ai.svg)';
computer.style.backgroundColor = '#eee';*/
function toggleHover(buttonTriggered) {
  if (buttonTriggered.currentTarget.firstElementChild) {
    buttonTriggered.currentTarget.firstElementChild.classList.toggle('hover');
  }
}
buttons.forEach(button => {
  console.log(button);
  button.addEventListener('click', playRound)
  button.addEventListener('mouseover', toggleHover);
  button.addEventListener('mouseout', toggleHover);
});


reset.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  showScore();
  roundResults.textContent = `Make a move!`;
  gameResult.textContent = 'The winner is...';
});

function showScore() {
  score.textContent = `You: ${playerScore} / Computer: ${computerScore}`;
  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);
}

showScore();

function updateScore(roundResult) {
  if (!roundResult.indexOf('You win!')) {
    playerScore++;
  } else if (!roundResult.indexOf('You lose!')) {
    computerScore++;
  }
  showScore();
}

function showGameResult() {
  const result = playerScore > computerScore ? 'You win!' : 'You lose!';
  gameResult.textContent = result;
  console.log(result);
}

function checkWin() {
  if (playerScore === 5 || computerScore === 5) showGameResult();
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
  /* Paper beats rock
  Rock beats scissors
  Scissors beats paper
  */
  if (playerSelection === 'rock' && computerSelection === 'scissors'
    || playerSelection === 'scissors' && computerSelection === 'rock') {
    return playerSelection === 'rock' ?
      'You win! Rock beats Scissors.' :
      'You lose! Rock beats Scissors.';
  } else if (playerSelection === 'paper' && computerSelection === 'rock'
    || playerSelection === 'rock' && computerSelection === 'paper') {
    return playerSelection === 'paper' ?
      'You win! Paper beats Rock.' :
      'You lose! Paper beats Rock.';
  } else if (playerSelection === 'scissors' && computerSelection === 'paper'
    || playerSelection === 'paper' && computerSelection === 'scissors') {
    return playerSelection === 'scissors' ?
      'You win! Scissors beats Paper.' :
      'You lose! Scissors beats Paper.';
  } else {
    return 'Tie!';
  }
}

function updateRoundNumber() {
  roundNumber++;
  roundResults.textContent = `Round ${roundNumber}`
}

function playRound(buttonClicked) {
  updateRoundNumber();
  const computerSelection = updateComputerMove();

  console.log(buttonClicked.currentTarget.classList[1]);
  const playerSelection = buttonClicked.currentTarget.classList[1];
  const roundResult = checkRoundResult(playerSelection, computerSelection);
  updateScore(roundResult);
  showRoundResult(roundResult, playerSelection, computerSelection);
  checkWin();
}

/* Helper functions and extras

function showMoves(playerSelection, computerSelection) {
  console.log(`Player's move: ${playerSelection}`);
  console.log(`Computer's move: ${computerSelection}`);
}
*/
