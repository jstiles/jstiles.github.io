const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//  Music
const songs = [
  {
    name: 'GoingHome',
    displayName: 'Going Home',
    artist: 'JAMRS',
  },
  {
    name: 'Pop',
    displayName: 'Pop',
    artist: 'JAMRS',
  },
  {
    name: 'RileysBlues',
    displayName: 'Rileys Blues',
    artist: 'JAMRS',
  },
  {
    name: 'TheBox',
    displayName: 'The Box',
    artist: 'JAMRS',
  },
  {
    name: 'Bloomster',
    displayName: 'Bloomster',
    artist: 'JAMRS',
  },

  {
    name: 'Changing',
    displayName: 'Changing',
    artist: 'JAMRS',
  },
  {
    name: 'CorporateSwill',
    displayName: 'CorporateSwill',
    artist: 'JAMRS',
  },
  {
    name: 'Elevator',
    displayName: 'Elevator',
    artist: 'JAMRS',
  },
  {
    name: 'FourSongs',
    displayName: 'FourSongs',
    artist: 'JAMRS',
  },
  {
    name: 'MondayMorningBlues',
    displayName: 'MondayMorningBlues',
    artist: 'JAMRS',
  },
  {
    name: 'ThreeBlueGrassTunes',
    displayName: 'Three Blue GrassTunes',
    artist: 'JAMRS',
  },
  {
    name: 'R8',
    displayName: 'R8',
    artist: 'JAMRS',
  },
  {
    name: 'SpanishTune',
    displayName: 'SF',
    artist: 'JAMRS',
  },
  {
    name: 'V33',
    displayName: 'V33',
    artist: 'JAMRS',
  },
  {
    name: 'Dreams',
    displayName: 'Dreams',
    artist: 'JAMRS',
  },
  {
    name: 'Spike',
    displayName: 'Spike',
    artist: 'JAMRS',
  }
];

// check if playing
let isPlaying = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();

}

// pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();

}

// event listener play or pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update DOM, remember there is innerText and textContent, which is better? see mozilla docs
// use rendering paint flash feature to see what gets re-drawn, reflow each time click or hover mouse.
// for this project it does not matter that much but always verify before using.
// Ex. replace testContent with innerText to check out.
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  // console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// on load select first song
loadSong(songs[songIndex]);

// update progress bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calc display for duration
    const durationMinutes = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay switching to avoid element NanN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calc display for current time
    const currentMinutes = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// bonus points, figure out how to add volume control !!!
// see HTML Audio Video Events
// set progress bar position when you click on it
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX/width)*duration;
}

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);  // jump to next song when come to end.
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
