const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
let time = 0;
const colors = [
  "#7400b8",
  "#6930c3",
  "#5e60ce",
  "#5390d9",
  "#4ea8de",
  "#48bfe3",
  "#56cfe1",
  "#64dfdf",
  "#72efdd",
  "#80ffdb",
];
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
let score = 0;

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const randomColor = getRandomColor();
  circle.style.background = randomColor;
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
