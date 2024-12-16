const words = ["apple", "banana", "cherry", "orange", "grape", "mango", "peach", "plum", "kiwi", "lemon"];
let currentWord = "";
let scrambledWord = "";
let score = 0;
let level = 1;
let timeLeft = 30;
let highScore = 0;
let timerInterval;

// DOM Elements
const scrambledWordElement = document.getElementById("scrambledWord");
const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuess");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const timerElement = document.getElementById("timer");
const leaderboardElement = document.getElementById("leaderboard");

// Shuffle the letters of a word
function shuffle(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

// Pick a new word and scramble it
function pickWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = shuffle(currentWord);
  scrambledWordElement.textContent = scrambledWord;
  guessInput.value = "";
}

// Check the user's guess
function checkGuess() {
  const userGuess = guessInput.value.trim().toLowerCase();
  if (userGuess === currentWord) {
    score += 10;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    updateLeaderboard();
    level++;
    pickWord();
    resetTimer();
    updateUI();
  } else {
    alert("Wrong! Try again.");
  }
}

// Update the UI elements
function updateUI() {
  scoreElement.textContent = `Score: ${score}`;
  levelElement.textContent = `Level: ${level}`;
  leaderboardElement.textContent = `Leaderboard: High Score: ${highScore}`;
}

// Update the leaderboard
function updateLeaderboard() {
  leaderboardElement.textContent = `Leaderboard: High Score: ${highScore}`;
}

// Timer logic
function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft} s`;
    } else {
      clearInterval(timerInterval);
      alert("Time's up! The word was: " + currentWord);
      pickWord();
      resetTimer();
      updateUI();
    }
  }, 1000);
}

// Reset the timer for each word
function resetTimer() {
  timeLeft = 30 - level * 2;
  clearInterval(timerInterval);
  startTimer();
}

// Start the game
function startGame() {
  highScore = localStorage.getItem("highScore") || 0;
  updateUI();
  pickWord();
  startTimer();
}

// Initialize the game
startGame();
submitGuessButton.addEventListener("click", checkGuess);
