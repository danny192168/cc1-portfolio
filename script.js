// Text Scramble Effect
const scrambleEl = document.getElementById('scrambleTagline');
const words = scrambleEl.dataset.words.split(',');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let wordIndex = 0;

function scrambleText(element, target) {
  let iter = 0;
  const interval = setInterval(() => {
    element.textContent = target
      .split('')
      .map((letter, idx) => {
        if (letter === ' ') return ' ';
        if (idx < iter) return target[idx];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    if (iter >= target.length) clearInterval(interval);
    iter += 1 / 2.5;
  }, 30);
}

function cycleWords() {
  scrambleText(scrambleEl, words[wordIndex]);
  wordIndex = (wordIndex + 1) % words.length;
}

cycleWords();
setInterval(cycleWords, 3000);
