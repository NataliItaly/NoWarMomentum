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
  //let activeLanguage = document.querySelector('.active-language');
  let language = 'en';  //activeLanguage.dataset.language;

   warsDayCount.textContent =  language === 'en' ? `the ${realDiff}nth` : realDiff;
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
  /*let activeLanguage = document.querySelector('.active-language');
  if (activeLanguage.dataset.language === 'ru') {
    currentDate = date.toLocaleDateString('ru-Ru', options);
  } else if (activeLanguage.dataset.language === 'it') {
    currentDate = date.toLocaleDateString('it-It', options);
  }*/

  DATE.textContent = currentDate;
}

/*--------------- set local storage ---------------- */

function setLocalStorage() {
  localStorage.setItem('weatherCityInput', weatherCityInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('weatherCityInput')) {
    weatherCityInput.value = localStorage.getItem('weatherCityInput');
  }
}
window.addEventListener('load', getLocalStorage);


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

/*------------------- set weather ------------------ */

/* showWeatherBlock.addEventListener('click', function () {
  weather.classList.toggle('weather__popup_open');
}); */

//let isWeather = false;

/* async function getWeather(event) {
  event.preventDefault();

  let cityName = weatherCityInput.value;
  let activeLanguage = document.querySelector('.active-language');
  let language = activeLanguage.dataset.language;
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${language}&appid=5c08670149a0b1a4dc7a372a3d5e5333&units=metric`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather__icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    if (weatherError.textContent) weatherError.textContent = '';

    if (language === 'ru') {
      wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
      humidity.textContent = `Влажность воздуха: ${data.main.humidity}%`;
    } else if (language === 'it') {
      wind.textContent = `Vento: ${data.wind.speed} m/s`;
      humidity.textContent = `Umidità: ${data.main.humidity}%`;
    }
    isWeather = true;
    weatherWrapper.classList.add('open-forecast');

    event.target.classList.add('weather__show-btn_hidden');
  } catch (error) {
    weatherError.textContent = 'Please enter valid city name';
    if (language === 'ru') {
      weatherError.textContent = 'Пожалуйста, введите верное название города';
    } else if (language === 'it') {
      weatherError.textContent =
        'Si prega di inserire il nome corretto della città';
    }
    temperature.textContent = '';
    humidity.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    weatherIcon.style.display = 'none';
  }
  if (cityName === undefined) {
    weatherError.textContent = 'Please enter valid city name';
  }
} */

//showWeatherBtn.addEventListener('click', (event) => getWeather(event));

/* weatherCityInput.addEventListener('input', function() {
  console.log(isWeather)
  if (isWeather) {
    showWeatherBtn.classList.remove('weather__show-btn_hidden');
  }
}) */

/*-------------------- set quotes -------------------- */

let randomQuote;

function getQuotes() {
  randomQuote = getRandomNum(0, quotes.en.length - 1);

  let activeLanguage = 'en'; //document.querySelector('.active-language').dataset.language;
  switch (activeLanguage) {
    case 'ru':
      QUOTE.textContent = quotes.ru[randomQuote].text;
      AUTHOR.textContent = quotes.ru[randomQuote].quote__author;
      break;
    case 'it':
      QUOTE.textContent = quotes.it[randomQuote].text;
      AUTHOR.textContent = quotes.it[randomQuote].quote__author;
      break;
    default:
      QUOTE.textContent = quotes.en[randomQuote].text;
      AUTHOR.textContent = quotes.en[randomQuote].quote__author;
  }
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);

/*------------------ set player -------------------- */

let isPlay = false;

const audio = new Audio();

function playAudio() {
  if (!isPlay) {
    audio.src = 'assets/sounds/audio.mp3';
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    //playBtn.classList.add('pause');
    playBtn.innerHTML = '<img src="../assets/svg/pause.svg" alt="pause" class="pause-img">';
  } else {
    audio.pause();
    isPlay = false;
    //playBtn.classList.remove('pause');
    playBtn.innerHTML = 'Listen';
  }
}

/*--------------- set background ------------------ */

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let pictureNumber = getRandomNum(1, 51);
let currentLoop = null; // active interval

function setBackground(path) {
  const img = new Image();
  img.src = `assets/bg-images/${path}.webp`;
  img.onload = () => {
    BODY.style.backgroundImage = `url('assets/bg-images/${path}.webp')`;
  };
}

//setBackground(`start/${pictureNumber}`);

function setSliderLoop(sec, lastNum, path) {
  console.log(path)
  setTimeout(() => setSliderLoop(sec, lastNum, path), sec);
  let pictureNumber = 1;
  pictureNumber++;
  if (pictureNumber > lastNum) {
    pictureNumber = 1;
  }
  setBackground(`${path}/${pictureNumber}`);
}

function startSequence() {
  setBackground('begin');
  VIDEO.classList.add('video-animated-smoke-clear');
    BODY.style.transition = 'background 0s linear';

  // 2080ms
  // 00:22.70 — start1
  setTimeout(() => {
    startLoop(1176, 17, 'start1')
  }, 23700);

  // 00:43:80 start2 faster
  setTimeout(() => {
    BODY.style.transition = 'background 0.6s linear';

    startLoop(1176, 19, 'start2')
  }, 43700);

  // 01:01.80 — explosion
  setTimeout(() => {
    startLoop(588, 13, 'explosion');
    BODY.style.transition = 'background 0s linear';
  }, 61800);

  // 01:21.00 — police
  setTimeout(() => {
    startLoop(1176, 24, 'police')
    BODY.style.transition = 'background 0.6s linear';

  }, 80412);

  // 01:39.80 — start3
  setTimeout(() => startLoop(1176, 27, 'start3'), 109800);

  // 02:17.00 — piano.jpg
  setTimeout(() => {
    stopLoop();
    setBackground('piano');
    VIDEO.classList.add('video-animated-smoke-light');
  }, 137600);

  // 02:45.70 — slow loop
  setTimeout(() => {
    BODY.style.transition = 'background 2.352s linear';

    startLoop(4702, 12, 'slow');
    //VIDEO.classList.add('video-animated-full');
  }, 163700);

  // 03:51.00 — end
  setTimeout(() => {
    VIDEO.classList.remove('video-animated-smoke-light');
    VIDEO.classList.remove('video-animated-smoke-clear');
    VIDEO.classList.add('video-animated-smoke-full');

    setBackground('slow/9');
    stopLoop();
  }, 231000);
}

function startLoop(interval, totalImages, folder) {
  stopLoop(); // stop last loop
  pictureIndex = 1;
  currentLoop = setInterval(() => {
    setBackground(`${folder}/${pictureIndex}`);
    pictureIndex++;
    if (pictureIndex > totalImages) pictureIndex = 1;
  }, interval);
}

function stopLoop() {
  if (currentLoop) {
    clearInterval(currentLoop);
    currentLoop = null;
  }
}

playBtn.addEventListener('click', function() {
  playAudio();

  startSequence();
});

