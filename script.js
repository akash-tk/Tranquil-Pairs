const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let gameLock = false;

const grid = document.getElementById('grid');
const restartButton = document.getElementById('restart-btn');

cardsArray.sort(() => 0.5 - Math.random());

function createBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-id', i);
    card.textContent = '';
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('.card');
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].classList.add('hidden');
    cards[optionTwoId].classList.add('hidden');
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].textContent = '';
    cards[optionTwoId].textContent = '';
  }

  cardsChosen = [];
  cardsChosenId = [];
  gameLock = false;

  if (cardsWon.length === cardsArray.length / 2) {
    alert('Congratulations! You found all the matches!');
  }
}

function flipCard() {
  if (gameLock) return;
  const cardId = this.getAttribute('data-id');
  if (cardsChosenId.includes(cardId)) return;
  cardsChosen.push(cardsArray[cardId]);
  cardsChosenId.push(cardId);
  this.textContent = cardsArray[cardId];

  if (cardsChosen.length === 2) {
    gameLock = true;
    setTimeout(checkForMatch, 500);
  }
}

function restartGame() {
  grid.innerHTML = '';
  cardsWon = [];
  cardsChosen = [];
  cardsChosenId = [];
  gameLock = false;
  createBoard();
}

restartButton.addEventListener('click', restartGame);

createBoard();
