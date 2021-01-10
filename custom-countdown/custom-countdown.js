// constants
const imputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// global variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = '';
let countdownActive;
let savedCountdown;

// set date input min with today's dateEl
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

// populate countdown/complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
      const now = new Date().getTime(); // ms
      const distance = countdownValue - now;
      const days = Math.floor(distance/day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      // hide input
      imputContainer.hidden = true;

      // if countdown ended show complete
      if (distance < 0 ) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
      }
      else {
        // show countdown in progress
        // populate countdown
        countdownElTitle.textContent = `${countdownTitle}`; // template string : use back ticks to convert var to string
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
      }
    }, second);
}

// take values from form input
function updateCountdown(e) {
  e.preventDefault(); // prevent def behavior of net access and page refresh
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  // save title and date to local storage
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // check for valid date
  if (countdownDate === '') {
    alert('Please select a date for a countdown');
  }
  else {
    // get number version of current Date, update document
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// reset all values
function reset() {
  // hide countdowns, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  imputContainer.hidden = false;
  // stop countdown
  clearInterval(countdownActive);
  // reset values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

// restore previous countdown
function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    imputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);

//  on load, check local local localStorage
restorePreviousCountdown();
