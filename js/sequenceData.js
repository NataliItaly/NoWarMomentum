import { startLoop, stopLoop } from './animation.js';
import { setBackground } from './setBackground.js';
import { BODY, VIDEO } from './variables.js';

export const sequence = prepareSequence([
  {
    time: 0,
    action: () => {
      setBackground('begin');
      VIDEO.classList.add('video-animated-smoke-clear');
      BODY.style.transition = 'background 0s linear';
    },
  },
  {
    time: 23.7,
    totalFrames: 17,
    frameDurationMs: 1176,
    folder: 'start1',
  },
  // ...остальные элементы
  {
    time: 231.0,
    action: () => {
      VIDEO.classList.remove('video-animated-smoke-light');
      VIDEO.classList.remove('video-animated-smoke-clear');
      VIDEO.classList.add('video-animated-smoke-full');
      setBackground('slow/14');
      stopLoop();
    },
  },
]);

function prepareSequence(rawSequence) {
  return rawSequence.map((item, i, arr) => {
    if (typeof item.action === 'function') return item;

    const {
      time,
      totalFrames,
      folder,
      frameDurationMs,
      transition = null,
    } = item;

    const nextStepTime = arr[i + 1]?.time;
    const estimatedDuration = frameDurationMs * totalFrames;
    const endTime = nextStepTime ?? time + estimatedDuration / 1000;

    return {
      time,
      action: () => {
        if (transition !== null) {
          BODY.style.transition = `background ${transition} linear`;
        }

        startLoop(frameDurationMs, totalFrames, folder, time, endTime);
      },
    };
  });
}
