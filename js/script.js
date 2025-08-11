import { preloadedPaths } from "./preloadPaths.js";
import { imageCache, preloadImages } from "./preLoad.js";
import {
  BODY,
  TIME,
  DATE,
  VIDEO,
  warsDayCount,
  QUOTE,
  AUTHOR,
  changeQuote,
  playBtn,
} from './variables.js';
import { showTime, showDate, setWarDays } from "./setTime.js";
import { sequence } from './sequenceData.js';
import { runSequence } from "./sequenceRunner.js";
import { startLoop, stopLoop } from './animation.js';
import { audio, playAudio } from './player.js';
import { executedSequence, isPlay } from "./player.js";
import { setQuotes } from "./setQuote.js";



preloadImages(preloadedPaths);

/*--------------- set time, date, war's days count ------------------ */

TIME.textContent = showTime();
warsDayCount.textContent = setWarDays();
DATE.textContent = showDate();

/*-------------------- set quotes -------------------- */

setQuotes();

changeQuote.addEventListener('click', setQuotes);

/*------------------ set player -------------------- */

let currentIndex = 0;

console.log('sequence', sequence)
runSequence(sequence)

export function animationLoop() {
  if (!isPlay) return;

  let currentTime = audio.currentTime;

  for (let i = 0; i < sequence.length; i++) {
    const step = sequence[i];

    if (currentTime >= step.time && !executedSequence.has(i)) {
      if (typeof step.action === 'function') {
        step.action();
        executedSequence.add(i);
      }
      else {
        console.warn('Step without action', step)
      }
    }
  }

  requestAnimationFrame(animationLoop);
}


/* function playAudio() {
  if (!isPlay) {
    //audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playBtn.classList.add('player__btn_paused');
    playBtn.textContent = '';

    if (audio.currentTime === 0) {
      executedSequence.clear(); // clear sequence when start audio from the begining
    }
    animationLoop();
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('player__btn_paused');
    playBtn.textContent = 'Listen';
    stopLoop();
  }
} */




playBtn.addEventListener('click', function () {
  playAudio();
});

