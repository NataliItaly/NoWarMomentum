import { setBackground } from "./setBackground.js";
import { isPlay } from "./player.js";
import { audio } from "./player.js";

let currentLoop = null;


export function stopLoop() {
  if (currentLoop) {
    cancelAnimationFrame(currentLoop);
    currentLoop = null;
  }
}


export function startLoop(
  frameDurationMs,
  totalFrames,
  folder,
  startTime = 0,
  endTime = Infinity
) {
  stopLoop(); // остановить предыдущий цикл, если есть

  const loopStartTime = startTime;

  function loopFrame() {
    if (!isPlay) return;

    const currentTime = audio.currentTime;
    const passedMs = (currentTime - loopStartTime) * 1000;

    if (currentTime >= endTime) {
      stopLoop();
      return;
    }

    // Получаем индекс кадра (с зацикливанием)
    const frameIndex =
      (Math.floor(passedMs / frameDurationMs) % totalFrames) + 1;

    // Устанавливаем фон
    setBackground(`${folder}/${frameIndex}`);

    currentLoop = requestAnimationFrame(loopFrame);
  }

  loopFrame();
}
