import { playBtn } from "./variables.js";
import { stopLoop } from './animation.js';
import { animationLoop } from "./script.js";


export const audio = new Audio('assets/sounds/audio.mp3');
export let isPlay = false;
let executedSequence = new Set();

export function playAudio(sequence) {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add('player__btn_paused');
    playBtn.textContent = '';

    if (audio.currentTime === 0) {
      executedSequence.clear();
    }

    animationLoop();
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('player__btn_paused');
    playBtn.textContent = 'Listen';
    stopLoop();
  }
}

export { executedSequence };
