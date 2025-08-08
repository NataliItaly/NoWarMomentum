const translationObj = {
  en: {
    city: 'enter your city',
    username: 'enter your name',
    today: 'Today is',
    'wars-day': 'day of war in Ukraine',
    'last-day': 'Every day we hope, that today is the last day of war...',
    'wish-peace': 'Peaceful skies over you, ',
    'show-weather': 'Show weather',
    'all-pictures': 'All photos are taken from open sources',
    name: 'Human',
  },
  ru: {
    city: 'введите ваш город',
    username: 'введите ваше имя',
    today: 'Сегодня',
    'wars-day': 'день войны в Украине',
    'last-day':
      'Каждый день мы надеемся, что сегодня - последний день войны...',
    'wish-peace': 'Мирного неба тебе, ',
    'show-weather': 'Показать погоду',
    'all-pictures': 'Все фото взяты из открытых источников',
    name: 'Человек',
  },
  it: {
    city: 'inserisci la tua città',
    username: 'inserisci il tuo nome',
    today: 'Oggi è',
    'wars-day': 'giorno di guerra in Ucraina',
    'last-day':
      "Ogni giorno speriamo che oggi sia l'ultimo giorno di guerra...",
    'wish-peace': 'Pace sia con te, ',
    'show-weather': 'Mostra meteo',
    'all-pictures': 'Tutte le foto sono prese da fonti aperte',
    name: 'Essere umano',
  },
};

const translationWrapper = document.querySelector('.translation-btn-wrapper');
const translationText = document.querySelectorAll('[data-translation]');

translationWrapper.addEventListener('click', function (event) {
  if (event.target.classList.contains('translation-btn')) {
    translationBtn.forEach((item) => item.classList.remove('active-language'));
    event.target.classList.add('active-language');

    let language = event.target.getAttribute('data-language');

    QUOTE.textContent = quotes[language][randomQuote].text;
    AUTHOR.textContent = quotes[language][randomQuote].quote__author;

    console.log(isWeather);
    if (isWeather) {
      getWeather(event);
    }

    translationText.forEach((item) => {
      let dataText =
        item.getAttribute(
          'data-translation'
        ); /*получаем значение атрибута data у всех элементов для переводa */
      if (item.placeholder) {
        item.placeholder = translationObj[language][item.dataset.translation];
      }
      item.textContent = translationObj[language][dataText];
    });
  }
});
