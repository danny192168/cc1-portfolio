(() => {
  const el = document.getElementById("scramble");
  if (!el) return;
  const words = ["Computer Science student", "Developer", "Self-taught"];
  const chars = "!<>-_\\/[]{}=+*^?#";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0,
    frame = 0,
    queue = [],
    raf;
  const text = document.createElement("span");
  const cur = document.createElement("span");
  cur.className = "cursor";
  el.append(text, cur);

  function scramble(to) {
    const from = text.textContent,
      n = Math.max(from.length, to.length);
    queue = Array.from({ length: n }, (_, k) => {
      const start = Math.floor(Math.random() * 20),
        end = start + 10 + Math.floor(Math.random() * 20);
      return { from: from[k] || "", to: to[k] || "", start, end, c: "" };
    });
    cancelAnimationFrame(raf);
    frame = 0;
    return new Promise((res) => {
      const tick = () => {
        let out = "",
          done = 0;
        for (const q of queue) {
          if (frame >= q.end) {
            done++;
            out += q.to;
          } else if (frame >= q.start) {
            if (!q.c || Math.random() < 0.28) q.c = chars[Math.floor(Math.random() * chars.length)];
            out += `<span class="dud">${q.c.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
          } else out += q.from;
        }
        text.innerHTML = out;
        frame++;
        done === queue.length ? res() : (raf = requestAnimationFrame(tick));
      };
      tick();
    });
  }
  if (reduce) {
    text.textContent = words[0];
    return;
  }
  const next = () =>
    scramble(words[i]).then(() => {
      i = (i + 1) % words.length;
      setTimeout(next, 2000);
    });
  next();
})();
