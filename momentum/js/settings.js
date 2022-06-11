import { apiChange, radioTegChecked } from "./background.js";

//==========================================Показать панель настроек
const settingsBlock = document.querySelector(".settings");
const settingsImage = document.querySelector(".settings-image");
const closeImage = document.querySelector(".close-settings");

function pageSettings() {
  settingsBlock.classList.toggle("settings-visible");
  settingsBlock.classList.toggle("settings");
}

closeImage.addEventListener("click", pageSettings);
settingsImage.addEventListener("click", pageSettings);

//==========================================Настройки (скрыть элементы страницы по клику)
//inputs
const inputTime = document.querySelector(".time-settings");
const inputData = document.querySelector(".data-settings");
const inputGreeting = document.querySelector(".greeting-settings");
const inputQuote = document.querySelector(".quote-settings");
const inputWeather = document.querySelector(".weather-settings");
const inputAudio = document.querySelector(".audio-settings");
//containers
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greetingContainer = document.querySelector(".greeting-container");
const quoteAuthor = document.querySelector(".quote-author");
const weatherBlockAll = document.querySelector(".weather");
const playerBlockAll = document.querySelector(".player");

function timeSettings() {
  inputTime.checked ? time.classList.add("hidden") : time.classList.remove("hidden");
}

function dataSettings() {
  inputData.checked ? date.classList.add("hidden") : date.classList.remove("hidden");
}

function greetingSettings() {
  inputGreeting.checked
    ? greetingContainer.classList.add("hidden")
    : greetingContainer.classList.remove("hidden");
}

function quoteSettings() {
  inputQuote.checked ? quoteAuthor.classList.add("hidden") : quoteAuthor.classList.remove("hidden");
}

function weatherSettings() {
  inputWeather.checked
    ? weatherBlockAll.classList.add("hidden")
    : weatherBlockAll.classList.remove("hidden");
}

function audioSettings() {
  inputAudio.checked
    ? playerBlockAll.classList.add("hidden")
    : playerBlockAll.classList.remove("hidden");
}

inputTime.addEventListener("change", timeSettings);
inputData.addEventListener("change", dataSettings);
inputGreeting.addEventListener("change", greetingSettings);
inputQuote.addEventListener("change", quoteSettings);
inputWeather.addEventListener("change", weatherSettings);
inputAudio.addEventListener("change", audioSettings);

//==========================================Перевод настроек
const apiSettings = document.querySelector(".api");
const imageTegSettings = document.querySelector(".image-teg");
const hiddenBlockSettings = document.querySelector(".hidden-block-settings");
const labelClassicImg = document.querySelector(".label-classic-img");
const labelNatureImg = document.querySelector(".label-nature-img");

const labelTime = document.querySelector(".label-time");
const labelData = document.querySelector(".label-data");
const labelGreeting = document.querySelector(".label-greeting");
const labelQuote = document.querySelector(".label-quote");
const labelWeather = document.querySelector(".label-weather");
const labelAudio = document.querySelector(".label-audio");

function langSettings() {
  const russian = localStorage.getItem("Russian");

  if (russian == 1) {
    apiSettings.textContent = "Для каритнок использовать:";
    imageTegSettings.textContent = "Теги картинок:  ";
    hiddenBlockSettings.textContent = "Скрыть блоки:";
    labelClassicImg.textContent = "Стандартные:";
    labelNatureImg.textContent = "Природа";
    labelTime.textContent = "Время";
    labelData.textContent = "Дата";
    labelGreeting.textContent = "Приветствие";
    labelQuote.textContent = "Цитаты";
    labelWeather.textContent = "Погода";
    labelAudio.textContent = "Музыка";
  } else {
    apiSettings.textContent = "For image use:";
    imageTegSettings.textContent = "Image tags:";
    hiddenBlockSettings.textContent = "Hide blocks:";
    labelClassicImg.textContent = "Standart";
    labelNatureImg.textContent = "Nature";
    labelTime.textContent = "Time";
    labelData.textContent = "Date";
    labelGreeting.textContent = "Greeting";
    labelQuote.textContent = "Quotes";
    labelWeather.textContent = "Weather";
    labelAudio.textContent = "Music";
  }
}

//==========================================Cохранение настроек
const selectAPI = document.querySelector(".changeApi");
const inputClassic = document.querySelector(".classic-img");
const inputNature = document.querySelector(".nature");

let settingsData = {};

inputTime.addEventListener("change", changeObjSettings);
inputData.addEventListener("change", changeObjSettings);
inputGreeting.addEventListener("change", changeObjSettings);
inputQuote.addEventListener("change", changeObjSettings);
inputWeather.addEventListener("change", changeObjSettings);
inputAudio.addEventListener("change", changeObjSettings);
selectAPI.addEventListener("change", changeObjSettings);
inputClassic.addEventListener("change", changeObjSettings);
inputNature.addEventListener("change", changeObjSettings);

function checkSettings() {
  timeSettings();
  dataSettings();
  greetingSettings();
  quoteSettings();
  weatherSettings();
  audioSettings();
  apiChange();
  radioTegChecked();
}

function changeObjSettings() {
  settingsData = {
    time: inputTime.checked,
    data: inputData.checked,
    greeting: inputGreeting.checked,
    quote: inputQuote.checked,
    weather: inputWeather.checked,
    audio: inputAudio.checked,
    apiSelect: selectAPI.value,
    apiTagClassic: inputClassic.checked,
    apiTagNature: inputNature.checked,
  };

  localStorage.setItem("settings", JSON.stringify(settingsData));
}

function getLocalStorageAllSettings() {
  const settingsData = localStorage.getItem("settings");

  const objSettingsData = JSON.parse(settingsData);
  if (objSettingsData !== null || undefined) {
    inputTime.checked = objSettingsData.time;
    inputData.checked = objSettingsData.data;
    inputGreeting.checked = objSettingsData.greeting;
    inputQuote.checked = objSettingsData.quote;
    inputWeather.checked = objSettingsData.weather;
    inputAudio.checked = objSettingsData.audio;
    selectAPI.value = objSettingsData.apiSelect;
    inputClassic.checked = objSettingsData.apiTagClassic;
    inputNature.checked = objSettingsData.apiTagNature;
  }

  checkSettings();
}

window.addEventListener("load", getLocalStorageAllSettings);

export { langSettings };
