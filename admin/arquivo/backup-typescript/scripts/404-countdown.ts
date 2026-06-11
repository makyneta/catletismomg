const urlBox = document.getElementById('badUrl') as HTMLDivElement;
urlBox.textContent = window.location.href;

let t: number = 10;
const timerEl = document.getElementById('timer') as HTMLSpanElement;
const interval: ReturnType<typeof setInterval> = setInterval(() => {
  t--;
  timerEl.textContent = String(t);
  if (t <= 0) {
    clearInterval(interval);
    window.location.href = 'index.html';
  }
}, 1000);

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => clearInterval(interval));
});
