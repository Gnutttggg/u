const uploadButton = document.getElementById("uploadButton");
const filtersContainer = document.querySelector(".allfilters");
let trackCount = 1; // Track count starts from 1
const uploadHeading = document.getElementById("uploadHeading");

const selectFileButton = document.createElement("button");
selectFileButton.textContent = "Select file from computer";
selectFileButton.style.position = "fixed";
selectFileButton.style.top = "350px";
selectFileButton.style.left = "50px";
document.body.appendChild(selectFileButton);
selectFileButton.style.display = "none";
uploadHeading.style.display = "none";

uploadButton.addEventListener("click", function() {
  // Trigger the file upload dialog
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";
  fileInput.style.display = "none";
  filtersContainer.style.display = "none";
  selectFileButton.style.display = "block";
  uploadHeading.style.display = "block";

    var clickHandler = function() {
  document.body.appendChild(fileInput);
  fileInput.click();
  };
  selectFileButton.addEventListener("click", clickHandler);

  // Wait for the user to select a file
  fileInput.addEventListener("change", function(event) {
    // Hide "select file" button
    selectFileButton.style.display = "none";

    const file = event.target.files[0];



    const reader = new FileReader();
    // Remove the event listener
    selectFileButton.removeEventListener("click", clickHandler);
    reader.addEventListener("load", function() {
      const audioDataUrl = reader.result;
      const audioElement = new Audio(audioDataUrl);
      

      // Create the modal dialog for the intro description
      const modal = createModalDialog();

      // Create a new track name
      const trackName = `Track #${trackCount}`;


      // Increment the track count for the next upload
      trackCount++;


      // Create the genre select dropdown      
      const genreSelect = createDropDown("Genre", ["", "Pop", "Rock", "Jazz", "Hip Hop"], modal.content);
      // Create the key select dropdown
      const keySelect = createDropDown("Key", ["", "C", "Cm", "C#", "C#m", "D", "Dm", "Eb", "Ebm", "E", "Em", "F", "F#", "Fm", "F#m", "G", "G#", "Gm", "G#m", "A", "Am", "Bb", "Bbm", "B", "Bm"], modal.content);

      // Create the intro description drop-down selections
      const rhythmSelect = createDropDown("Rhythm", ["", "Dynamic", "Smooth", "Sliding", "Drifting"], modal.content);
      const colorSelect = createDropDown("Color", ["", "Warm", "Cold", "Colorful", "Stark"], modal.content);
      const intensitySelect = createDropDown("Intensity", ["", "Aggressive", "Soft", "Moderate"], modal.content);
      const instrumentSelect = createDropDown("Instrument", ["", "Piano", "Guitar", "Bass"], modal.content);
      const chordSelects = [];

      for (let i = 1; i <= 8; i++) {
        const chordSelect = createDropDown(`chord ${i}`, ["", "I", "ii", "iii", "IV", "V", "vi", "vii"], modal.content);
        chordSelects.push(chordSelect);
      }

      // Add a CSS class to the container elements -> To fix their position
      genreSelect.container.classList.add("dropdown-genre");
      keySelect.container.classList.add("dropdown-key");
      rhythmSelect.container.classList.add("dropdown-rhythm");
      colorSelect.container.classList.add("dropdown-color");
      intensitySelect.container.classList.add("dropdown-intensity");
      instrumentSelect.container.classList.add("dropdown-instrument");

chordSelects.forEach((chordSelect, index) => {
  const chordContainerClass = `dropdown-chord-${index + 1}`;
  if (chordSelect.container) {
    chordSelect.container.classList.add(chordContainerClass);
  }
});



      // Create a submit button for the modal dialog
      const submitButton = document.createElement("button");
      submitButton.textContent = "Publish";
      submitButton.classList.add("submit-button"); // Add the CSS class to the button

      // Add a click event listener to handle the form submission
      submitButton.addEventListener("click", function() {
        // show filters again
        filtersContainer.style.display = "block";
        uploadHeading.style.display = "none";

        
        // Create a new grid item to display the uploaded audio
        const newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");
        newGridItem.appendChild(audioElement);
        newGridItem.appendChild(timer);


        // Name the tracks
        const trackNameElement = document.createElement("p");        
        trackNameElement.classList.add("track-name");
        trackNameElement.style.fontWeight = "bold";
         trackNameElement.textContent = trackName;
        newGridItem.appendChild(trackNameElement);
        

        const overlayTrackName = document.createElement("p");
        overlayTrackName.classList.add("track-name");
        overlayTrackName.style.fontWeight = "bold";
        overlayTrackName.style.color = "white";
        overlayTrackName.style.position = "fixed";
overlayTrackName.style.left = "30px";
         overlayTrackName.textContent = trackName;
        const audioPlayerOverlay = document.getElementById("audioPlayerOverlay")
        audioPlayerOverlay.appendChild(overlayTrackName);




// "&#10074;&#10074;"; // Pause symbol (||)
// "&#9654;"; // play symbol       

// Create the play/pause button
const playPauseButton = document.createElement("button");
playPauseButton.classList.add("play-pause-button");
playPauseButton.innerHTML = "&#9654;";
newGridItem.appendChild(playPauseButton);
newGridItem.appendChild(audioPlayer);


let playbackPosition = 0; // Variable to store the current playback position

playPauseButton.addEventListener("click", function() {
showAudioPlayer();  
  const currentlyPlaying = document.querySelector(".grid-item .play-pause-button[data-playing='true']");
  
  if (currentlyPlaying && currentlyPlaying !== playPauseButton) {
    const audioPlayerToPause = currentlyPlaying.parentNode.querySelector("audio");
    audioPlayerToPause.pause();
    audioPlayerToPause.currentTime = 0; // Reset the playback position of the previously playing audio
    currentlyPlaying.innerHTML = "&#9654;"; // Set the innerHTML to play symbol (►)
    currentlyPlaying.removeAttribute("data-playing");
  }

if (audioPlayer.src !== audioDataUrl) {
  audioPlayer.src = audioDataUrl; // Set the source of the audio player
  
  const loadedMetadataHandler = function() {
    playbackPosition = 0; // Reset the playback position when a new audio is loaded
    audioPlayer.currentTime = playbackPosition; // Set the playback position
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Set the innerHTML to pause symbol (||)
    playPauseButton.setAttribute("data-playing", "true");
    audioPlayer.removeEventListener("loadedmetadata", loadedMetadataHandler); // Remove the event listener
  };
  
  audioPlayer.addEventListener("loadedmetadata", loadedMetadataHandler);
}

  else {
    if (audioPlayer.paused) {
      audioPlayer.currentTime = playbackPosition; // Set the playback position
      audioPlayer.play();
      playPauseButton.innerHTML = "&#10074;&#10074;"; // Set the innerHTML to pause symbol (||)
      playPauseButton.setAttribute("data-playing", "true");
    } else {
      audioPlayer.pause();
      playbackPosition = audioPlayer.currentTime; // Store the current playback position
      playPauseButton.innerHTML = "&#9654;"; // Set the innerHTML to play symbol (►)
      playPauseButton.removeAttribute("data-playing");
    }
  }
});

  const currentGridItem = audioPlayer.parentNode;
  


        const audioIntroElement = document.createElement("p");
        audioIntroElement.classList.add("keyword");
        audioIntroElement.dataset.genre = genreSelect.value;
        audioIntroElement.dataset.key = keySelect.value;
        audioIntroElement.dataset.rhythm = rhythmSelect.value;
        audioIntroElement.dataset.color = colorSelect.value;
        audioIntroElement.dataset.intensity = intensitySelect.value;
        audioIntroElement.dataset.instrument = instrumentSelect.value;

        const chordValues = chordSelects.map(chordSelect => chordSelect.value).filter(value => value !== "");
        audioIntroElement.dataset.chords = JSON.stringify(chordValues);
        let chordsDisplay = "";
        if (chordValues.length > 0) {
          if (chordValues.length > 1) {
            chordsDisplay = chordValues.join(" - ");
          } else {
            chordsDisplay = chordValues[0];
          }
        }
        audioIntroElement.innerHTML = `${rhythmSelect.value}, ${colorSelect.value}, ${intensitySelect.value}, ${instrumentSelect.value}<br>${chordsDisplay}`;
      // Create a container for the audio intro element
      const audioIntroContainer = document.createElement("div");
      audioIntroContainer.classList.add("audio-intro-container");

  // Set the CSS properties for centering the element
audioIntroContainer.style.display = "flex";
audioIntroContainer.style.justifyContent = "center";
audioIntroContainer.style.alignItems = "center";

// Add the audio intro element to the container
audioIntroContainer.appendChild(audioIntroElement);

// Add the audio intro container to the grid item
newGridItem.appendChild(audioIntroContainer);

        // Add the new grid item element to the container
        const container = document.querySelector(".container");
        container.appendChild(newGridItem);

        // Close the modal dialog
        closeModalDialog(modal);
      });

      // Add the drop-downs and submit button to the modal dialog
      modal.content.appendChild(genreSelect.container);
      modal.content.appendChild(keySelect.container);
      modal.content.appendChild(rhythmSelect.container);
      modal.content.appendChild(colorSelect.container);
      modal.content.appendChild(intensitySelect.container);
      modal.content.appendChild(instrumentSelect.container);
      chordSelects.forEach(chordSelect => {
        modal.content.appendChild(chordSelect.container);
      });

      // Create a wrapper container for the submit button
      const submitContainer = document.createElement("div");
      submitContainer.classList.add("submit-container");
      submitContainer.appendChild(submitButton);
      modal.content.appendChild(submitContainer);

    });

    reader.readAsDataURL(file);
  });
});




function createModalDialog() {
  // Create the modal overlay
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  // Create the modal content container
  const content = document.createElement("div");
  content.classList.add("modal-content");

  // Append the content to the overlay
  overlay.appendChild(content);

  // Append the overlay to the document body
  document.body.appendChild(overlay);

  // Return the modal dialog components
  return {
    overlay: overlay,
    content: content
  };
}

function closeModalDialog(modal) {
  // Remove the modal dialog components from the document body
  document.body.removeChild(modal.overlay);
}

// ...

function createDropDown(label, options, parentElement) {
  const selectElement = document.createElement("select");

  // Create the label element
  const labelElement = document.createElement("label");
  labelElement.textContent = label + ": ";
  labelElement.appendChild(selectElement);

  // Create the container element
  const containerElement = document.createElement("div");
  containerElement.appendChild(labelElement);

  // Create the options and append them to the select element
  options.forEach(function(option) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });

  // Add change event listener to capture selected value
  selectElement.addEventListener("change", function() {
    labelElement.value = selectElement.value;
  });

  // Append the container element to the parent element
  parentElement.appendChild(containerElement);

  // Return the select element and label
  return {
    container: containerElement,
    label: label,
    get value() {
      return selectElement.value;
    }
  };
}


// 2 PART OF THE SCRIPT (RECORDING)

const recordButton = document.getElementById("recordButton");
const audioPlayer = document.getElementById("audioPlayer");
const overlay = document.getElementById("overlay");
const audioPlayerOverlay = document.createElement("div");
const buttonContainer = document.querySelector(".button-container");
let permissionGranted = false;
let mediaRecorder;
let chunks = [];
let isRecording = false;
let stream; // Declare the stream variable in the outer scope
let activeGridItem = null; // Track the active grid item

audioPlayerOverlay.id = "audioPlayerOverlay";
document.body.appendChild(audioPlayerOverlay);

function showAudioPlayer() {
  audioPlayer.style.display = "block";
  audioPlayerOverlay.style.display = "block";
  buttonContainer.style.display = "block";
  recordButtonOverlay.style.display = "block";
}

function playAudio(url) {
  if (audioPlayer.paused || audioPlayer.src !== url) {
    audioPlayer.src = url;
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
  showAudioPlayer();
}


navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (streamObj) {
    stream = streamObj; // Store the stream object in the outer stream variable
    permissionGranted = true;
  })
  .catch(function (err) {
    console.error("Error requesting microphone permission: ", err);
  });




  // second part of script

const recStart = document.getElementById("recStart");
const recStop = document.getElementById("recStop");


let startTimestamp, stopTimestamp;

recordButtonOverlay.addEventListener("click", toggleRecording);


function toggleRecording() {
    let chunks = [];
  if (!startTimestamp) {
    startTimestamp = Date.now();
    recStart.innerHTML = timer.innerHTML;
    // To hide recStart element
recStart.style.display = "block";

  } else {
    stopTimestamp = Date.now();
    recStop.innerHTML = timer.innerHTML;
// To hide recStop element
recStop.style.display = "block";
  }

 // SET DELAY TIME
const timerValue = timer.innerHTML;
const numericValue = parseFloat(timerValue);
const delayTime = isNaN(numericValue) ? 0 : numericValue - 18;

 console.log("Delay Time:", delayTime);
  if (!permissionGranted) {
    console.error("Microphone permission not granted.");
    return;
  }

  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;

    recordButton.innerHTML = '<i class="fas fa-microphone"></i>';
    overlay.style.pointerEvents = "none";
  } else {
    if (audioPlayer && audioPlayer.src !== "" && !audioPlayer.paused) {
      recordingStartTime = audioPlayer.currentTime;
      overlay.style.pointerEvents = "auto";

      mediaRecorder = new MediaRecorder(stream); 
 // Use the stored stream object
    
      mediaRecorder.start();
      isRecording = true;

      recordButton.innerHTML = '<i class="fas fa-square"></i>';

      mediaRecorder.addEventListener("dataavailable", function (event) {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", function () {
        const currentGridItem = audioPlayer.parentNode;

        const recordedAudio = new Blob(chunks, { type: "audio/wav" });
        const demoButton = createDemoButton(currentGridItem, recordedAudio);
        currentGridItem.appendChild(demoButton);

        isRecording = false;
        recordButton.innerHTML = '<i class="fas fa-microphone"></i>';

        
  


function playAudioWithoutPlayer(gridItem) {
  const audioElement = gridItem.querySelector('audio');
  if (!audioElement) {
    console.error('Audio element not found in the grid item.');
    return;
  }
  
  const url = audioElement.src;
  
  if (audioPlayer.paused || audioPlayer.src !== url) {
    audioPlayer.src = url;
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}


// demo button
function createDemoButton(gridItem, recordedAudio) {
  const demoButton = document.createElement("button");
  demoButton.classList.add("demo-button");
  demoButton.innerHTML = "Demo";
  demoButton.setAttribute("data-audio-url", URL.createObjectURL(recordedAudio)); // Store the recorded audio URL

  let isDemoPlaying = false; // Track the demo playback state

  demoButton.addEventListener("click", function () {
    playAudioWithoutPlayer(gridItem);
   
    event.stopPropagation();

    // Remove previous demo recording, if any
    const previousDemoRecording = gridItem.querySelector(".demo-recording");
    if (previousDemoRecording) {
      previousDemoRecording.parentNode.removeChild(previousDemoRecording);
    }

    const demoRecording = new Audio();
    demoRecording.classList.add("demo-recording");
    demoRecording.src = demoButton.getAttribute("data-audio-url"); // Retrieve the recorded audio URL from the button

    const audioContext = new (AudioContext || webkitAudioContext)();
    const audioElement = demoRecording;

    const eqNode1 = audioContext.createBiquadFilter();
    eqNode1.type = 'peaking'; // Use a peaking filter for boosting/cutting specific frequencies
    eqNode1.frequency.value = 800; // Adjust the frequency to target the mid-range
    eqNode1.gain.value = 4;

    const eqNode2 = audioContext.createBiquadFilter();
    eqNode2.type = 'peaking';
    eqNode2.frequency.value = 150; // Adjust the frequency to target the low-range
    eqNode2.gain.value = -1;

    const compressorNode = audioContext.createDynamicsCompressor();
    compressorNode.threshold.value = -10; // Adjust the threshold to control compression intensity
    compressorNode.ratio.value = 8; 

    const bufferNode = audioContext.createBufferSource();
    const bufferSizeInSeconds = 0.017;
    const bufferSize = Math.floor(audioContext.sampleRate * bufferSizeInSeconds);

    bufferNode.buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    // Start the buffer node immediately

    const sourceNode = audioContext.createMediaElementSource(audioElement);
    sourceNode.connect(eqNode1);
    eqNode1.connect(eqNode2);
    eqNode2.connect(compressorNode);
    compressorNode.connect(audioContext.destination);

    bufferNode.connect(audioContext.destination);

    if (isDemoPlaying) {
      demoRecording.pause();
      isDemoPlaying = false;
    } else {
      setTimeout(function () {
        demoRecording.play();
        bufferNode.start(0);
        isDemoPlaying = true;
      }, delayTime); // Delay the playback by the specified delayTime
          // Reset chunks array
        chunks = [];
    }

  });

  return demoButton;
}


const gridItems = document.getElementsByClassName("grid-item");
for (let i = 0; i < gridItems.length; i++) {
  const currentGridItem = gridItems[i];

  const demoButton = createDemoButton(currentGridItem, recordedAudio);
  currentGridItem.appendChild(demoButton);

  // Store the recorded audio in the parent node of the audio player
  const audioPlayer = currentGridItem.querySelector("audio");
  const recordedAudio = new Blob(chunks, { type: "audio/wav" });
  audioPlayer.parentNode.recordedAudio = recordedAudio;

}



        // Reset the recording state
        isRecording = false;
        recordButton.innerHTML = '<i class="fas fa-microphone"></i>';
      });
    }
  }
}



function formatTime(time) {
  return time.toString();
}


function padZero(num, size) {
  let padded = "000000000" + num;
  return padded.substr(padded.length - size);
}
