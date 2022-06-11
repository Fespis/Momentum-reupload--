import { langSettings } from "./settings.js";
import { background } from "./background.js";
import { languageActive } from "./language.js";
import { getQuotes } from "./quotes.js";
import { langNameUserPlaceholder } from "./saveData.js";
import { showTime, showDate, getTimeOfDay } from "./time.js";
import { getWeather } from "./weather.js";

langSettings();
background();
languageActive();
getQuotes();
langNameUserPlaceholder();
showTime();
showDate();
getTimeOfDay();
getWeather();
