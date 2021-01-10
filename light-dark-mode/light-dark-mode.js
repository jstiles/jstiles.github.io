const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
const lightColor = `rgb(255 255 255 / 50%)`;
const darkColor = `rgb(0 0 0 / 50%)`;
const darkTheme = 'dark';
const lightTheme = 'light';
const enableDarkMode = true;
const disableDarkMode = false;

// dark or light images
function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

//  toggle light or dark Mode
function toggleDarkLightMode(isDark) {
  // use ternary operator and refactor light and dark functions to this one.
  nav.style.backgroundColor = isDark ? '${darkColor}' : '${lightColor}';
  textBox.style.backgroundColor = isDark ? '${lightColor}' : '${darkColor}';
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
  isDark ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') :
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
  isDark ? imageMode(darkTheme) : imageMode(lightTheme);
}

// switch theme dynamically
function switchTheme(event) {
  // console.log(event)
  // console.log(event.target.checked)
  // toggle highest level element
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement

  if (event.target.checked) {
    // pass in key value pair (theme, theme type)
    //console.log("dark theme")
    document.documentElement.setAttribute('data-theme', darkTheme);
    // save dark or light mode state to reload next time
    localStorage.setItem('theme', darkTheme);
    toggleDarkLightMode(enableDarkMode);
  } else {
    //console.log("light theme")
    document.documentElement.setAttribute('data-theme', lightTheme);
    localStorage.setItem('theme', lightTheme);
    toggleDarkLightMode(disableDarkMode);
  }
}

// event listener
toggleSwitch.addEventListener('change', switchTheme);

// check local storage for switchTheme
const currentTheme = localStorage.getItem('theme');
//console.log(currentTheme);
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme == darkTheme) {
    toggleSwitch.checked = true;
    toggleDarkLightMode(true);
  }
}
