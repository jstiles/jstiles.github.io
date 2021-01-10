const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
  button.disabled = !button.disabled
}

// passing joke to voice rss api
function tellMe(joke) {
  //console.log('tell me : ', joke)
  // Important note.  Do not include API keys in your source code for deployment.
  // The function using the API key should be a server side function that
  // access to the key but no one else can view.
  
  VoiceRSS.speech({
    key: '51a667b1a41e4e69a037bed64d4cdae3',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// get jokes from joke api
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      // use back ticks, easier to add strings together
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text to speech
    tellMe(joke);
    // disable button so user can click before joke finishes
    toggleButton();

  } catch (error) {
    // catch errors here
    console.log('[Error] : ', error);
  }
}
//
//getJokes();

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
