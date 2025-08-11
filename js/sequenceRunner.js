import { audio } from "./player.js";

export function runSequence(seq) {
  let currentIndex = 0;

  function check() {
    if (currentIndex >= seq.length) return;

    const currentTime = audio.currentTime;
    const item = seq[currentIndex];

    if (currentTime >= item.time) {
      item.action();
      currentIndex++;
    }

    requestAnimationFrame(check);
  }

  check();
}
