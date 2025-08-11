const imageCache = {};

const preloadedPaths = [
  'begin',
  'piano',
  ...generateImagesPaths('start1', 17),
  ...generateImagesPaths('start2', 19),
  ...generateImagesPaths('start3', 27),
  ...generateImagesPaths('explosion', 13),
  ...generateImagesPaths('police', 24),
  ...generateImagesPaths('slow', 14)
];
console.log(preloadedPaths)

/**
 *
 * @param {*} folder
 * @param {*} quantity
 * @returns
 */

/*GET http://127.0.0.1:5500/assets/bg-images/start1/3.764705882352941.webp 404 (Not Found)
Image
setBackground @ script.js:226
loopFrame @ script.js:257
requestAnimationFrame
loopFrame @ script.js:259
requestAnimationFrame*/

function generateImagesPaths(folder, quantity) {
  return Array.from({ length: quantity }, (_, i) => `${folder}/${i + 1}`);
}

function preloadImages(paths) {
  paths.forEach((path) => {
    const url = `assets/bg-images/${path}.webp`;
    if (!imageCache[url]) {
      const img = new Image();
      img.src = url;
      imageCache[url] = true;
    }
  });
}

preloadImages(preloadedPaths);

/*------------ set time and date---------------- */

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  TIME.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  setWarDays();
}
showTime();

/*---------------set war's days------------------ */

function setWarDays() {
  let todayDay = new Date();
  let timeToday = todayDay.getTime();
  let warDay = new Date(2022, 1, 24);
  let timeWar = warDay.getTime();
  let diffWarToday = timeToday - timeWar;
  let realDiff = Math.ceil(diffWarToday / (1000 * 60 * 60 * 24));
  let language = 'en';

  warsDayCount.textContent = `the ${realDiff}nth`;
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  let currentDate = date.toLocaleDateString('en-Br', options);

  DATE.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 23 || hours < 5) {
    return `night`;
  } else if (hours >= 5 && hours <= 11) {
    return `morning`;
  } else if (hours > 11 && hours <= 17) {
    return `afternoon`;
  } else if (hours > 17 && hours < 23) {
    return ` evening`;
  }
}

/*-------------------- set quotes -------------------- */

let randomQuote;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuotes() {
  randomQuote = getRandomNum(0, quotes.en.length - 1);
  QUOTE.textContent = quotes.en[randomQuote].text;
  AUTHOR.textContent = quotes.en[randomQuote].author;
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);

/*------------------ set player -------------------- */

let currentLoop = null; // active interval
let lastSequenceIndex = -1;
let executedSequence = new Set();
let isPlay = false;
let currentIndex = 0;
const audio = new Audio();
audio.src = 'assets/sounds/audio.mp3';
/*
function prepareSequence(rawSequence) {
  return rawSequence.map((item, index) => {
    if (item.action) return item; // leave it as it is

    const { time, duration, totalFrames, folder, transition = null } = item;

    const endTime = time + duration;
    const frameDurationMs = (duration * 1000) / totalFrames;

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
} */

function prepareSequence(rawSequence) {
  return rawSequence.map((item, i, arr) => {
    if (item.action) return item;

    const {
      time,
      totalFrames,
      folder,
      frameDurationMs,
      transition = null,
    } = item;

    const endTime =
      arr[i + 1]?.time !== undefined
        ? arr[i + 1].time
        : time + (frameDurationMs * totalFrames) / 1000;

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
/*
let rawSequence = [
  {
    time: 0,
    action: () => {
      setBackground('begin');
      VIDEO.classList.add('video-animated-smoke-clear');
      BODY.style.transition = 'background 0s linear';
    },
  },
  { time: 24.7, duration: 18.6, totalFrames: 17, folder: 'start1' },
  {
    time: 42.3,
    duration: 19.5,
    totalFrames: 19,
    folder: 'start2',
    transition: '0.6s',
  },
  {
    time: 61.8,
    duration: 19.2,
    totalFrames: 13,
    folder: 'explosion',
    transition: '0s',
  },
  {
    time: 81.0,
    duration: 18.8,
    totalFrames: 24,
    folder: 'police',
    transition: '0.6s',
  },
  { time: 99.8, duration: 37.8, totalFrames: 27, folder: 'start3' },
  {
    time: 137.6,
    action: () => {
      stopLoop();
      setBackground('piano');
      VIDEO.classList.add('video-animated-smoke-light');
    },
  },
  {
    time: 163.7,
    duration: 67.3,
    totalFrames: 14,
    folder: 'slow',
    transition: '3.528s',
  },
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
]; */

let rawSequence = [
  {
    time: 0,
    action: () => {
      setBackground('begin');
      VIDEO.classList.add('video-animated-smoke-clear');
      BODY.style.transition = 'background 0s linear';
    },
  },
  { time: 24.7, totalFrames: 17, frameDurationMs: 1176, folder: 'start1' },
  {
    time: 42.3,
    totalFrames: 19,
    frameDurationMs: 1176,
    folder: 'start2',
    transition: '0.6s',
  },
  {
    time: 61.8,
    totalFrames: 13,
    frameDurationMs: 588,
    folder: 'explosion',
    transition: '0s',
  },
  {
    time: 81.0,
    totalFrames: 24,
    frameDurationMs: 1176,
    folder: 'police',
    transition: '0.6s',
  },
  { time: 99.8, totalFrames: 27, frameDurationMs: 1176, folder: 'start3' },
  {
    time: 137.6,
    action: () => {
      stopLoop();
      setBackground('piano');
      VIDEO.classList.add('video-animated-smoke-light');
    },
  },
  {
    time: 163.7,
    totalFrames: 14,
    frameDurationMs: 4702,
    folder: 'slow',
    transition: '3.528s',
  },
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
];


const sequence = prepareSequence(rawSequence);
console.log(sequence)
runSequence(sequence)

function animationLoop() {
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

function runSequence(seq) {
  function check() {
    if (currentIndex >= seq.length) return;

    const currentTime = audio.currentTime;
    const item = seq[currentIndex];

    if (currentTime >= item.time) {
      item.action();
      currentIndex++;
    }

    requestAnimationFrame(() => check());
  }

  check();
}

function playAudio() {
  if (!isPlay) {
    //audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playBtn.classList.add('player__btn_paused');
    playBtn.textContent = '';

    if (audio.currentTime === 0) {
      //lastSequenceIndex = -1;
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
}

/*--------------- set background ------------------ */

function setBackground(path) {
  const url = `assets/bg-images/${path}.webp`;
  if (imageCache[url]) {
    BODY.style.backgroundImage = `url('${url}')`;
  } else {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageCache[url] = true;
      BODY.style.backgroundImage = `url('${url}')`;
    };
  }
}

/* function setSliderLoop(sec, lastNum, path) {
  console.log(path);
  setTimeout(() => setSliderLoop(sec, lastNum, path), sec);
  let pictureNumber = 1;
  pictureNumber++;
  if (pictureNumber > lastNum) {
    pictureNumber = 1;
  }
  setBackground(`${path}/${pictureNumber}`);
} */

/* function startLoop(durationMs, totalFrames, folder) {
  stopLoop(); // stop last loop

  const frameDuration = durationMs * totalFrames;
  console.log('durationMs ', durationMs, 'totalFrames', totalFrames);
  console.log('frameDuration', frameDuration)

  const loopStartTime = audio.currentTime; // animation's start moment (in seconds) based on the current audio time, synchronize with audio playback.

  function loopFrame() {
    if (!isPlay) return;

    const passedTime = (audio.currentTime - loopStartTime) * 1000; // difference between animation's current time and start time
    console.log('passedTime', passedTime);
    let frameIndex = Math.floor(passedTime / frameDuration) + 1;
    console.log('frameIndex', frameIndex);

    if (frameIndex > totalFrames) {
      frameIndex = totalFrames;
    }

    setBackground(`${folder}/${frameIndex}`);

    currentLoop = requestAnimationFrame(loopFrame);
  }

  loopFrame();
} */

/* function startLoop(frameDurationMs, totalFrames, folder, startTimeInAudio, endTimeInAudio) {
  stopLoop();

  const loopStartTime = startTime;

  function loopFrame() {
    if (!isPlay) return;

    const currentAudioTime = audio.currentTime;

    if (currentAudioTime >= endTimeInAudio) {
      return;
    }

    const passedTime = (currentAudioTime - startTimeInAudio) * 1000;

    let frameIndex = Math.floor(passedTime / frameDurationMs) + 1;
    if (frameIndex > totalFrames) {
      frameIndex = totalFrames;
    }

    setBackground(`${folder}/${frameIndex}`);
    currentLoop = requestAnimationFrame(loopFrame);
  }

  loopFrame();
} */

function startLoop(
  frameDurationMs,
  totalFrames,
  folder,
  startTime = 0,
  endTime = Infinity
) {
  stopLoop();

  const loopStartTime = startTime;

  function loopFrame() {
    if (!isPlay) return;

    const passedMs = (audio.currentTime - loopStartTime) * 1000;

    if (audio.currentTime >= endTime) {
      stopLoop();
      return;
    }

    // index loop:
    const frameIndex =
      (Math.floor(passedMs / frameDurationMs) % totalFrames) + 1;

    setBackground(`${folder}/${frameIndex}`);

    currentLoop = requestAnimationFrame(loopFrame);
  }

  loopFrame();
}

function stopLoop() {
  if (currentLoop) {
    cancelAnimationFrame(currentLoop);
    currentLoop = null;
  }
}

playBtn.addEventListener('click', function () {
  playAudio();
});

