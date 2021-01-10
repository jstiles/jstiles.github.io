const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt user to select media stream, pass to video element then display
async function selectMediaStream() {
  try {
    // wait for user to select screen they want to share
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // pass media stream to video obj as source object
    videoElement.srcObject = mediaStream;
    // when metadata is loaded call function to play video
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    // catch error here
    console.log('whoops, error here: ', error);
  }
}

button.addEventListener('click', async () => {
  // disable button
  button.disabled = true;
  // start picture in Picture
  await videoElement.requestPictureInPicture();
  // reset button
  button.disabled = false;
});


// On Load
selectMediaStream();
