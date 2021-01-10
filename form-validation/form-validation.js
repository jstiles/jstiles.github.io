const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

// the button is going to submit the form but the event is on the form itself

let isValid = false;
let passwordsMatch = false;

// functions

function validateForm() {
  // using constraint API
  isValid = form.checkValidity();
  //console.log('isValid = ', isValid);
  // style main message for an error
  if (!isValid) {
    message.textContent = 'Please fill out all fields';
    message.style.color = 'red';  // override using inline css style
    messageContainer.style.borderColor = 'red';
    return;
  }
  // see if passwords match
  if (password1El.value === password2El.value) {
    passwordsMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
  } else {
    passwordsMatch = false;
    message.textContent = 'Password Mismatch!';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }
  // if form is valid and paswords match
  if (isValid && passwordsMatch) {
    message.textContent = 'Successfully Registered';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

// store form date
function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  };
  // do something with user data, normally pass to a DB
  console.log(user);
}

function processFormData(e) {
    // note default form behavior, sends and refreshes page immediatly
    e.preventDefault();
    //console.log(e);
    // validate form
    validateForm();
    if (isValid && passwordsMatch) {
      storeFormData();
    }
}


// event listener
form.addEventListener('submit', processFormData);
