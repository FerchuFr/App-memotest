const emojis = [
  "💵","💵","💰","💰",
  "🏦","🏦","🏧","🏧",
  "💳","💳","🪙","🪙",
  "📈","📈","👛","👛"
];

let board = document.getElementById("gameBoard");
let startBtn = document.getElementById("startBtn");
let intentosEl = document.getElementById("intentos");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let intentos = 0;
let maxIntentos = 5;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  intentos = 0;
  matches = 0;
  intentosEl.textContent = "Intentos fallidos: 0 / " + maxIntentos;
  let cards = shuffle([...emojis]);

  cards.forEach((emoji) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = emoji; // Mostrar todas al inicio
    board.appendChild(card);
  });

  board.style.display = "grid";
  startBtn.style.display = "none";

  // Mostrar todas por 5 segundos y luego ocultarlas
  setTimeout(() => {
    document.querySelectorAll(".card").forEach(card => {
      card.textContent = "";
      card.classList.remove("flipped");
      card.addEventListener("click", flipCard);
    });
  }, 5000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    resetTurn();
    matches++;
    if (matches === emojis.length / 2) {
      intentosEl.textContent = "¡Ganaste! 🎉";
      startBtn.textContent = "Comenzar de nuevo";
      startBtn.style.display = "inline-block";
    }
  } else {
    lockBoard = true;
    intentos++;
    intentosEl.textContent = "Intentos fallidos: " + intentos + " / " + maxIntentos;
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);

    if (intentos >= maxIntentos) {
      setTimeout(() => {
        intentosEl.textContent = "Juego terminado 😢";
        startBtn.textContent = "Comenzar de nuevo";
        startBtn.style.display = "inline-block";
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

startBtn.addEventListener("click", startGame);
