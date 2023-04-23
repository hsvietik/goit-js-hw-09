function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', startSwitcher);
stopBtn.addEventListener('click', stopSwitcher);

let timerId;

function startSwitcher(evt) {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitcher() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
