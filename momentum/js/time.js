//===================================================================
// Часы, минуты, секунды
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");

const russian = localStorage.getItem("Russian");

function showTime() {
  const timeTime = new Date();
  const currentTime = timeTime.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, setTimeout, 1000);
}

// Месяц, день недели, число
const date = document.querySelector(".date");

function showDate() {
  const dateDate = new Date();
  const options = { day: "numeric", month: "long", weekday: "long", timeZone: "UTC" };
  let currentDate;
  russian == 1
    ? (currentDate = dateDate.toLocaleDateString("ru-RU", options))
    : (currentDate = dateDate.toLocaleDateString("en-US", options));
  date.textContent = currentDate;
}

// Ночь(0-6), утро(6-12), день(12-18), вечер(18-24)
function getTimeOfDay() {
  const hours = new Date().getHours();
  if (russian == 1) {
    if (hours < 6) {
      greeting.textContent = "Доброй ночи,";
    } else if (hours >= 6 && hours < 12) {
      greeting.textContent = "Доброе утро,";
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = "Добрый день,";
    } else {
      greeting.textContent = "Добрый вечер,";
    }
  } else {
    if (hours < 6) {
      greeting.textContent = "Goodnight,";
    } else if (hours >= 6 && hours < 12) {
      greeting.textContent = "Good morning,";
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = "Good day,";
    } else {
      greeting.textContent = "Good evening,";
    }
  }
}

export { showTime, showDate, getTimeOfDay };
