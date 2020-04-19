let playerScore = 0;
let computerScore = 0;


const buttons = document.querySelectorAll('svg.selection');
const reset = document.querySelector('button.reset');
console.log(reset);
const roundResults = document.querySelector('div.results > p.round');
const gameResult = document.querySelector('div.results > p.game');
const score = document.querySelector('div.results > p.score');
showScore();

reset.addEventListener('click', function() {
  playerScore = 0;
  computerScore = 0;
  showScore();
  roundResults.textContent = '';
  gameResult.textContent = '';
});

buttons.forEach(button => {
  console.log(button);
  button.addEventListener('click', playRound)
});
/* 
 function game() {
  let playerSelection = prompt('Rock...paper...scissors...SHOOT!');
  if (!playerSelection) return;
  playerSelection = playerSelection.toLowerCase();
  if (isValidMove(playerSelection)) {
    const computerSelection = computerPlay();
    const roundResult = playRound(playerSelection, computerSelection);
    updateScore(roundResult);
    showScores();
  } else {
    alert('Please enter a valid move ("Rock", "Paper" or "Scissors")');
    i--;
  }

  showGameResult();
}



function isValidMove(move) {
  if (move === 'rock' || move === 'paper' || move === 'scissors') {
    return true;
  } else {
    return false;
  }
}
*/
function updateScore(roundResult) {
  if (!roundResult.indexOf('You win!')) {
    playerScore++;
  } else if (!roundResult.indexOf('You lose!')) {
    computerScore++;
  }
  showScore();
}

function showScore() {
  score.textContent = `Score --> Player: ${playerScore} / Computer: ${computerScore}`;
  console.log(`Player Score: ${playerScore}`);
  console.log(`Computer Score: ${computerScore}`);
}

function showGameResult() {
  const result = playerScore > computerScore ? 'You win!' : 'You lose!';
  gameResult.textContent = result;
  console.log(result);
}

function checkWin() {
  if (playerScore === 5 || computerScore === 5) showGameResult();
}

function showMoves(playerSelection, computerSelection) {
  console.log(`Player's move: ${playerSelection}`);
  console.log(`Computer's move: ${computerSelection}`);
}

function playRound(buttonClicked) {
  /* Paper beats rock
  Rock beats scissors
  Scissors beats paper */
  const computerSelection = computerPlay();
  console.log(buttonClicked);
  const playerSelection = buttonClicked.currentTarget.getAttribute('data-icon');

  const roundResult = checkRoundResult(playerSelection, computerSelection);
  updateScore(roundResult);
  showRoundResult(roundResult, playerSelection, computerSelection);
  checkWin();
}

function showRoundResult(roundResult, playerSelection, computerSelection) {
  const currentRoundResult = document.createElement('p');
  currentRoundResult.textContent = `Your selection: ${playerSelection}. Computer's selection: ${computerSelection}. Round result: ${roundResult}`;
  roundResults.appendChild(currentRoundResult);
}


function checkRoundResult(playerSelection, computerSelection) {
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

function computerPlay() {
  const computerChoice = Math.floor(Math.random() * 3);

  return computerChoice === 0 ? 'rock' :
    computerChoice === 1 ? 'paper' :
      'scissors';
}