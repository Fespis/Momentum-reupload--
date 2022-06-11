//===================================================================
// Запомнить Город и Имя
const city = document.querySelector(".city");
const nameUser = document.querySelector(".name");

const russian = localStorage.getItem("Russian");

function langNameUserPlaceholder() {
  if (russian == 1) {
    nameUser.placeholder = "[Укажите имя]";
  } else {
    nameUser.placeholder = "[Enter your name]";
  }
}

function setLocalStorageCityName() {
  localStorage.setItem("nameUser", nameUser.value);
  localStorage.setItem("city", city.value);
}

function getLocalStorageCityName() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  if (localStorage.getItem("nameUser")) {
    nameUser.value = localStorage.getItem("nameUser");
  }
}

window.addEventListener("beforeunload", setLocalStorageCityName);
window.addEventListener("load", getLocalStorageCityName);

export { langNameUserPlaceholder };
