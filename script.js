'use strict';

//Selecting ELements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let scores, currentScore, playing, activePlayer;
// variable for player state

// Starting conditions of the game
const startingConditions = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

//function for switching/hold
const switchPlayers = function () {
  // Switch to active player
  //reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //2. Switch player state
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

startingConditions();

// Rolling the dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Chech if rolled 1: if true switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if dice === 1 then current will not be added to the player score
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. add current score to active players score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //2. Check if player's score is >= 100 ?
    if (scores[activePlayer] >= 100) {
      //winner
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch player
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', startingConditions);
