const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

const grid = document.getElementById('grid');
const restartButton = document.getElementById('restart-btn');

// Shuffle the cards array
cardsArray.sort(() => 0.5 - Math.random());

// Create game board
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

// Check for matches
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
  if (cardsWon.length === cardsArray.length / 2) {
    alert('Congratulations! You found all the matches!');
  }
}

// Flip the card
function flipCard() {
  const cardId = this.getAttribute('data-id');
  cardsChosen.push(cardsArray[cardId]);
  cardsChosenId.push(cardId);
  this.textContent = cardsArray[cardId];

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

// Restart game
function restartGame() {
  grid.innerHTML = '';
  cardsWon = [];
  cardsChosen = [];
  cardsChosenId = [];
  createBoard();
}

restartButton.addEventListener('click', restartGame);

createBoard();