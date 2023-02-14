'use strict';

//Selecting Element
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Function
const randomNumber = function () {
  const random = Math.trunc(Math.random() * 6) + 1;
  return random;
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

//Simpen total value skor player
let scores = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  playing = true;

//Hold button buat nyimpen currentScore
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check Winner
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
      activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
});

//Roll dadu
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = randomNumber();
    console.log(dice);

    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }

    diceEl.setAttribute('src', `dice-${dice}.png`);

    //Total Current Score
    currentScore += dice;
    //Kondisi ganti wayah
    if (dice === 1) {
      switchPlayer();
      activePlayer = activePlayer === 0 ? 1 : 0;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
  console.log(`total : ${currentScore}`);
});

//Newgame button
btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  for (let i = 0; i < scores.length; i++) {
    document.querySelector(`.player--${i}`).classList.remove(`player--winner`);
    document.querySelector(`.player--${i}`).classList.remove(`player--active`);
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = 0;
    scores[i] = 0;
  }

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add(`player--active`);
  diceEl.classList.add('hidden');
});
