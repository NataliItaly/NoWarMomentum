import {QUOTE, AUTHOR, quotes} from './variables.js';

let randomQuote;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setQuotes() {
  randomQuote = getRandomNum(0, quotes.en.length - 1);
  QUOTE.textContent = quotes.en[randomQuote].text;
  AUTHOR.textContent = quotes.en[randomQuote].author;
}
