//Перевод
const englishLang = document.querySelector(".english");
const russianLang = document.querySelector(".russian");

let forRussianLang;

function setLocalStorageRussian() {
  forRussianLang = localStorage.setItem("Russian", 1);
}

function setLocalStorageEnglish() {
  forRussianLang = localStorage.setItem("Russian", 0);
}

function translateRussian() {
  if (russian == 1) {
    return;
  } else {
    setLocalStorageRussian();
    location.reload();
  }
}

function translateEnglish() {
  if (russian == 0) {
    return;
  } else {
    setLocalStorageEnglish();
    location.reload();
  }
}

russianLang.addEventListener("click", translateRussian);
englishLang.addEventListener("click", translateEnglish);
let russian = localStorage.getItem("Russian");

//Активные кнопки выбора языка
function languageActive() {
  if (russian == 1) {
    russianLang.classList.add("russian-active");
    englishLang.classList.remove("english-active");
  } else {
    russianLang.classList.remove("russian-active");
    englishLang.classList.add("english-active");
  }
}

export { languageActive };
