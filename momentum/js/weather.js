//===================================================================
//Получение данных о погоде
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");
const city = document.querySelector(".city");

const russian = localStorage.getItem("Russian");

async function getWeather() {
  try {
    const languageOption = russian ? "ru" : "en";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&lang=${languageOption}&appid=0a82e972a39c0996cbfbb3d7d04173c4&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    const temp = data.main.temp;
    temperature.textContent = `${Math.round(temp)}°C`;

    if (russian == 1) {
      wind.textContent = "Скорость ветра: " + Math.round(data.wind.speed) + " м/с";
      humidity.textContent = "Влажность: " + data.main.humidity + "%";
      weatherDescription.textContent = data.weather[0].description;
      // api присылает описание погоды только на русском языке. Поэтому описания нет при переводе на английский!
    } else {
      wind.textContent = "Wind speed: " + Math.round(data.wind.speed) + " m/s";
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
    }
    weatherError.textContent = "";
  } catch (err) {
    weatherError.classList.add("error");
    russian == 1
      ? (weatherError.textContent = "Неправильно указан город!")
      : (weatherError.textContent = "The city is incorrectly specified!");
  }
}

city.addEventListener("change", getWeather);

export { getWeather };
