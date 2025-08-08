/*------------ set time and date---------------- */

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  TIME.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
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
  let activeLanguage = document.querySelector('.active-language');
  let language = activeLanguage.dataset.language;

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
  let activeLanguage = document.querySelector('.active-language');
  if (activeLanguage.dataset.language === 'ru') {
    currentDate = date.toLocaleDateString('ru-Ru', options);
  } else if (activeLanguage.dataset.language === 'it') {
    currentDate = date.toLocaleDateString('it-It', options);
  }

  DATE.textContent = currentDate;
}

/*---------------- set greeting--------------------- */

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = setGreetings();

  let activeLanguage = document.querySelector('.active-language');
  let greetingText = `Good${timeOfDay}`;
  if (activeLanguage.dataset.language === 'ru') {
    greetingText = `Добр${timeOfDay}`;
  } else if (activeLanguage.dataset.language === 'it') {
    greetingText = `Buon${timeOfDay}`;
  }

  GREETING.textContent = greetingText;
}

function setGreetings() {
  const date = new Date();
  const hours = date.getHours();
  let activeLanguage = document.querySelector('.active-language');
  if (hours >= 23 || hours < 5) {
    switch (activeLanguage.dataset.language) {
      case 'ru':
        return `ой ночи`;
        break;
      case 'it':
        return `a notte`;
        break;
      default:
        return ` night`;
    }
  } else if (hours >= 5 && hours <= 11) {
    switch (activeLanguage.dataset.language) {
      case 'ru':
        return `ое утро`;
        break;
      case 'it':
        return `a mattina`;
        break;
      default:
        return ` morning`;
    }
  } else if (hours > 11 && hours <= 17) {
    switch (activeLanguage.dataset.language) {
      case 'ru':
        return `ый день`;
        break;
      case 'it':
        return ` giorno`;
        break;
      default:
        return ` afternoon`;
    }
  } else if (hours > 17 && hours < 23) {
    switch (activeLanguage.dataset.language) {
      case 'ru':
        return `ый вечер`;
        break;
      case 'it':
        return `a sera`;
        break;
      default:
        return ` evening`;
    }
  }
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

showWeatherBlock.addEventListener('click', function () {
  weather.classList.toggle('weather__popup_open');
});

let isWeather = false;

async function getWeather(event) {
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
}

showWeatherBtn.addEventListener('click', (event) => getWeather(event));

weatherCityInput.addEventListener('input', function() {
  console.log(isWeather)
  if (isWeather) {
    showWeatherBtn.classList.remove('weather__show-btn_hidden');
  }
})

/*-------------------- set quotes -------------------- */

let randomQuote;

function getQuotes() {
  randomQuote = getRandomNum(0, quotes.en.length - 1);

  let activeLanguage = document.querySelector('.active-language');
  switch (activeLanguage.dataset.language) {
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
    playBtn.classList.add('pause');
    playBtn.textContent = '';
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
    playBtn.textContent = 'Listen';
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
  img.src = `assets/bg-images/${path}.jpg`;
  img.onload = () => {
    BODY.style.backgroundImage = `url('assets/bg-images/${path}.jpg')`;
  };
}
//BODY.style.backgroundImage = `url('assets/bg-images/begin.jpg')`;
setBackground(`start/${pictureNumber}`);

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

//setSliderLoop();
/**
 * i have a music track. It has different pieces. Play button has eventListener start set background. The timeout are:
-first background is 'begin.jpg',
- from 00.23.50 background loop from start folder (there are 51 pictures in total) .
-from 01.02.00 background loop from culmination folder (there are 23 pictures in total) .
- from 01.20.00  background loop from start folder
- from 01.20.00  background loop from culmination folder ,
- from 02.17.00  only piano.jpg background until 02.46.00.
-from 02.46.00 background loop from slow folder (11 pictures in total).
At 03.51.00 the music track is finish and the background should stop with the last shown picture
 */

playBtn.addEventListener('click', function() {
  playAudio();

  setBackground('begin');
  // start photos
  setInterval(function() {
    setSliderLoop(2000, 51, 'start');
  }, 23500);
  // culmination
  setInterval(function () {
    setSliderLoop(1500, 23, 'culmination');
  }, 66500);
  setInterval(function () {
    setSliderLoop(4000, 11, 'slow');
  }, 47000);
});

