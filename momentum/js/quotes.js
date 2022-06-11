//===================================================================
//Показ цитат
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

const russian = localStorage.getItem("Russian");

//Случайная цитата при загрузке страницы
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getSQuoteNext(data) {
  const firstQuote = 1;
  const lastQuote = 64;

  let randomEasy = getRandomInt(firstQuote, lastQuote);
  quote.textContent = data[randomEasy].text;
  author.textContent = data[randomEasy].author;
}

async function getQuotes() {
  let quotes;
  russian == 1 ? (quotes = "quotes/dataru.json") : (quotes = "quotes/dataen.json");
  const res = await fetch(quotes);
  const data = await res.json();
  const firstQuote = 1;
  const lastQuote = 64;

  let randomNotEasy = getRandomInt(firstQuote, lastQuote);
  quote.textContent = data[randomNotEasy].text;
  author.textContent = data[randomNotEasy].author;

  //Случайная цитата при клике на иконку
  changeQuote.addEventListener("click", () => getSQuoteNext(data));
}

export { getQuotes };
