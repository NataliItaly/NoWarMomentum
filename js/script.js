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
  let activeLanguage = document.querySelector(".active-language");
  let language = activeLanguage.dataset.language;

  warsDayCount.textContent = realDiff;
  if (language === "en") {
    warsDayCount.textContent = `the ${realDiff}nth`;
  }
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  /*function getWarDays() {
  let today = new Date();
  console.log(today);
  let warBegin = new Date(2022, 1, 24, 0, 0, 0);
  console.log(warBegin);
  console.log(today.getTime());
  console.log(warBegin.getTime());
  console.log(
    Math.ceil((today.getTime() - warBegin.getTime()) / (1000 * 60 * 60 * 24))
  );
} */

  let currentDate = date.toLocaleDateString("en-Br", options);
  let activeLanguage = document.querySelector(".active-language");
  if (activeLanguage.dataset.language === "ru") {
    currentDate = date.toLocaleDateString("ru-Ru", options);
  } else if (activeLanguage.dataset.language === "it") {
    currentDate = date.toLocaleDateString("it-It", options);
  }

  DATE.textContent = currentDate;
}

/*---------------- set greeting--------------------- */

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = setGreetings();

  let activeLanguage = document.querySelector(".active-language");
  let greetingText = `Good${timeOfDay}`;
  if (activeLanguage.dataset.language === "ru") {
    greetingText = `????????${timeOfDay}`;
  } else if (activeLanguage.dataset.language === "it") {
    greetingText = `Buon${timeOfDay}`;
  }

  GREETING.textContent = greetingText;
}

function setGreetings() {
  const date = new Date();
  const hours = date.getHours();
  let activeLanguage = document.querySelector(".active-language");
  if (hours >= 23 || hours < 5) {
    switch (activeLanguage.dataset.language) {
      case "ru":
        return `???? ????????`;
        break;
      case "it":
        return `a notte`;
        break;
      default:
        return ` night`;
    }
  } else if (hours >= 5 && hours <= 11) {
    switch (activeLanguage.dataset.language) {
      case "ru":
        return `???? ????????`;
        break;
      case "it":
        return `a mattina`;
        break;
      default:
        return ` morning`;
    }
  } else if (hours > 11 && hours <= 17) {
    switch (activeLanguage.dataset.language) {
      case "ru":
        return `???? ????????`;
        break;
      case "it":
        return ` giorno`;
        break;
      default:
        return ` afternoon`;
    }
  } else if (hours > 17 && hours < 23) {
    switch (activeLanguage.dataset.language) {
      case "ru":
        return `???? ??????????`;
        break;
      case "it":
        return `a sera`;
        break;
      default:
        return ` evening`;
    }
  }
}

/*-------------------------------------------------- */

/*--------------- set local storage ---------------- */

function setLocalStorage() {
  localStorage.setItem("cityInput", cityInput.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("cityInput")) {
    cityInput.value = localStorage.getItem("cityInput");
  }
}
window.addEventListener("load", getLocalStorage);

/*--------------- set background ------------------ */

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

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let pictureNumber = getRandomNum(1, 91);

function setBackground() {
  const img = new Image();
  img.src = `assets/bg-images/${pictureNumber}.jpg`;
  img.onload = () => {
    BODY.style.backgroundImage = `url('assets/bg-images/${pictureNumber}.jpg')`;
  };
}
setBackground();

function setSliderLoop() {
  setTimeout(setSliderLoop, 1500);
  pictureNumber++;
  if (pictureNumber >= 93) {
    pictureNumber = 1;
  }
  setBackground();
}

setSliderLoop();

/*-------------------- set slider ---------------------- */

/* slideNext.addEventListener("click", getSlideNext);

function getSlideNext() {
  pictureNumber += 1;
  if (pictureNumber >= 92) {
    pictureNumber = 1;
  }
  setBackground();
}

slidePrev.addEventListener("click", getSlidePrev);

function getSlidePrev() {
  pictureNumber -= 1;
  if (pictureNumber <= 0) {
    pictureNumber = 91;
  }
  setBackground();
  console.log("?");
} */

/*------------------- set weather ------------------ */

showWeatherBlock.addEventListener("click", function () {
  weather.classList.toggle("open-weather");
});

let isWeather = false;

async function getWeather() {
  let cityName = cityInput.value;
  let activeLanguage = document.querySelector(".active-language");
  let language = activeLanguage.dataset.language;
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${language}&appid=5c08670149a0b1a4dc7a372a3d5e5333&units=metric`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}??C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    if (weatherError.textContent) weatherError.textContent = "";

    if (language === "ru") {
      wind.textContent = `???????????????? ??????????: ${data.wind.speed} ??/??`;
      humidity.textContent = `?????????????????? ??????????????: ${data.main.humidity}%`;
    } else if (language === "it") {
      wind.textContent = `Vento: ${data.wind.speed} m/s`;
      humidity.textContent = `Umidit??: ${data.main.humidity}%`;
    }
    isWeather = true;
    weatherWrapper.classList.add("open-forecast");
  } catch (error) {
    weatherError.textContent = "Please enter valid city name";
    if (language === "ru") {
      weatherError.textContent = "????????????????????, ?????????????? ???????????? ???????????????? ????????????";
    } else if (language === "it") {
      weatherError.textContent =
        "Si prega di inserire il nome corretto della citt??";
    }
    temperature.textContent = "";
    humidity.textContent = "";
    weatherDescription.textContent = "";
    wind.textContent = "";
    weatherIcon.style.display = "none";
  }
  if (cityName === undefined) {
    weatherError.textContent = "Please enter valid city name";
  }
}

showWeather.addEventListener("click", getWeather);

/*-------------------- set quotes -------------------- */

let randomQuote;

function getQuotes() {
  randomQuote = getRandomNum(0, quotes.en.length - 1);

  let activeLanguage = document.querySelector(".active-language");
  switch (activeLanguage.dataset.language) {
    case "ru":
      QUOTE.textContent = quotes.ru[randomQuote].text;
      AUTHOR.textContent = quotes.ru[randomQuote].author;
      break;
    case "it":
      QUOTE.textContent = quotes.it[randomQuote].text;
      AUTHOR.textContent = quotes.it[randomQuote].author;
      break;
    default:
      QUOTE.textContent = quotes.en[randomQuote].text;
      AUTHOR.textContent = quotes.en[randomQuote].author;
  }
}

getQuotes();

changeQuote.addEventListener("click", getQuotes);

/*------------------ set player -------------------- */

for (let i = 0; i < trackList.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = trackList[i].title;
  playList.append(li);
}

let isPlay = false;
let playNum = 0;
const playItem = document.querySelectorAll(".play-item");
playItem[playNum].classList.add("active");

showTrack.textContent = document.querySelector(".active").textContent;

const audio = new Audio();
function playAudio() {
  if (!isPlay) {
    audio.src = trackList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playBtn.classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("pause");
  }
}
playBtn.addEventListener("click", playAudio);

function playNext() {
  playNum += 1;

  if (playNum >= trackList.length) {
    playNum = 0;
  }
  playItem.forEach((item) => item.classList.remove("active"));
  playItem[playNum].classList.add("active");
  showTrack.textContent = document.querySelector(".active").textContent;
  if (isPlay === true) {
    audio.src = trackList[playNum].src;
    audio.currentTime = 0;
    audio.play();
  }
}

playNextBtn.addEventListener("click", playNext);

function playPrev() {
  playNum -= 1;
  if (playNum < 0) {
    playNum = trackList.length - 1;
  }
  playItem.forEach((item) => item.classList.remove("active"));
  playItem[playNum].classList.add("active");
  showTrack.textContent = document.querySelector(".active").textContent;
  if (isPlay === true) {
    audio.src = trackList[playNum].src;
    audio.currentTime = 0;
    audio.play();
  }
}

playPrevBtn.addEventListener("click", playPrev);

for (let i = 0; i < playItem.length; i++) {
  playItem[i].addEventListener("click", function choosePlayItem() {
    playItem.forEach((item) => item.classList.remove("active"));
    playItem[i].classList.add("active");
    showTrack.textContent = document.querySelector(".active").textContent;
    playNum = i;
    if (isPlay === true) {
      audio.src = trackList[playNum].src;
      audio.currentTime = 0;
      audio.play();
    }
  });
}

/*------------------------------------------------------------------------------- */

showPlaylistBtn.addEventListener("click", function () {
  showPlaylistBtn.classList.toggle("open");
  playList.classList.toggle("open");
});

/*-------------------------------------------------------------------------------- */

changeLanguageBtn.addEventListener("click", function () {
  translationBtn.forEach((item) => item.classList.toggle("open"));
});
