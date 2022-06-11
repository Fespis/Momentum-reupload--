import playList from "../music/playList.js";

//===================================================================
//Плейлист
for (let i = 0; i < playList.length; i++) {
  const playListContainer = document.querySelector(".play-list");

  const li = document.createElement("li");

  li.classList.add("play-item");
  li.textContent = playList[i].title;
  li.dataset.lielement = i;
  playListContainer.append(li);
  playListContainer.firstChild.classList.add("item-active");

  li.addEventListener("click", () => playAudioToClickOnName(i));
}

//Аудио
const liElement = document.querySelectorAll(".play-item");
const audioPlayer = document.querySelector(".audio-player");
const playOrPause = document.querySelector(".play");
const playOrNext = document.querySelector(".play-next");
const playOrPrev = document.querySelector(".play-prev");
const volumeSlider = document.querySelector(".volume_slider");
const seekSlider = document.querySelector(".seek_slider");
const currentTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");

//Проигрывание и пауза
const audio = new Audio();
let playNum = 0;
let isPlay = false;
let updateTimer;
audioPlayer.src = playList[playNum].src;

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audioPlayer.play();
    playOrPause.classList.add("pause");
    updateTimer = setInterval(setUpdate, 400);
  } else {
    isPlay = false;
    audioPlayer.pause();
    playOrPause.classList.toggle("pause");
    clearInterval(updateTimer);
  }
}

playOrPause.addEventListener("click", playAudio);

//Громкость
function setVolume() {
  audioPlayer.volume = volumeSlider.value / 100;
}

volumeSlider.addEventListener("input", setVolume);

//Продолжительность
function seekTo() {
  const seekTo = audioPlayer.duration * (seekSlider.value / 100);
  audioPlayer.currentTime = seekTo;
  updateTimer = setInterval(setUpdate, 400);
}

function changeInputCurrentTime() {
  clearInterval(updateTimer);
}

seekSlider.addEventListener("change", seekTo);
seekSlider.addEventListener("input", changeInputCurrentTime);

//Таймер
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audioPlayer.duration)) {
    seekPosition = audioPlayer.currentTime * (100 / audioPlayer.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    let currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audioPlayer.duration / 60);
    let durationSeconds = Math.floor(audioPlayer.duration - durationMinutes * 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
    totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

//Запуск трека по клику на название
function playAudioToClickOnName(numberOfLiComponent) {
  const activeItem = document.querySelector(".item-active");

  activeItem.classList.toggle("item-active");
  clearInterval(updateTimer);
  audioPlayer.src = playList[numberOfLiComponent].src;
  isPlay = false;
  playAudio();
  liElement[numberOfLiComponent].classList.toggle("item-active");
}

//Следующий трек
function playNext() {
  const activeItem = document.querySelector(".item-active");

  let numberOfActivItem = activeItem.dataset.lielement;
  clearInterval(updateTimer);
  liElement[numberOfActivItem].classList.toggle("item-active");
  isPlay = false;
  numberOfActivItem++;
  if (numberOfActivItem > playList.length - 1) numberOfActivItem = 0;
  audioPlayer.src = playList[numberOfActivItem].src;
  playAudio();
  liElement[numberOfActivItem].classList.toggle("item-active");
}

//Предыдущий трек
function playPrev() {
  const activeItem = document.querySelector(".item-active");

  let numberOfActivItem = activeItem.dataset.lielement;
  clearInterval(updateTimer);
  liElement[numberOfActivItem].classList.toggle("item-active");
  isPlay = false;
  numberOfActivItem--;
  if (numberOfActivItem == -1) numberOfActivItem = playList.length - 1;
  audioPlayer.src = playList[numberOfActivItem].src;
  playAudio();
  liElement[numberOfActivItem].classList.toggle("item-active");
}

playOrNext.addEventListener("click", playNext);
playOrPrev.addEventListener("click", playPrev);
//Событие на окончание трека
audio.addEventListener("ended", playNext);
audioPlayer.addEventListener("ended", playNext);
