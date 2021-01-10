// instead of creating all these globals to the window object on the global object
// we could one single object that contains all these propertiers to clean up code

// Never use userAgent, always check for feature as done below. 
// navigator.userAgent tells you what browser, confusing string to use
// problematic, userAgent prone to error, don't use.
// just check for the feature like we are doing.

const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');


// Play & Pause ----------------------------------- //
//using video HTML5 element using play and pause/paused methods
// https://www.w3schools.com/tags/ref_av_dom.asp
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// on video end show play button
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// calc display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);  // round to nearest whole value
  let seconds = Math.floor(time % 60);    // round remainder
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  // console.log(minutes, seconds);
  return `${minutes}:${seconds}`;
}

// update pregress bar as video plays
function updateProgress() {
  // console.log('currentTime', video.currentTime, 'duration', video.duration);
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`; // template string
  // secure way and faster way to change text rather than inner html element
  currentTime.textContent = `${displayTime(video.currentTime)} /`;  // call fuction and add back slash
  duration.textContent = `${displayTime(video.duration)}`;
}

// click progress bar to seek within video
function setProgress(e) {
  // divide where we clicked by total width
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  //console.log('newTime = ', newTime);
}

// Volume Controls --------------------------- //

let lastVolume = 1;  // set opening volume to 1, 100% volume

// volume bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  //console.log('volume = ', volume);

  // change icon depending on volume,
  // going to use 4 possible icons here,  too many types don't use class list replace
  // reset all css classes so all removed and add back just the ones we want each newTime
  volumeIcon.className = '';  // vol icon has no css what so ever
  // add back a different icon depending on level
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }
  else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }
  else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// mute/unmute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {   // if video volume greater than zero
    lastVolume = video.volume;
    video.volume = 0;  // muted
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {  // was zero
    // mute to unmute toggle
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  // console.log('video playback rate : ', video.playbackRate);
  // console.log('selected value : ', speed.value);
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
// could just determine at top what browser is being used
// rather than all this if else crazyness for openFullscreen and closeFullscreen

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  // center video on page
  video.classList.add('video-fullscreen');
}
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  // switch back video for non-full screen
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// toggle full screen  -- could change logic to use ternnary operator
// ternary : !fullscreen ? openFullscreen(player) : closeFullscreen();
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
