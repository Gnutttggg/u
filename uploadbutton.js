const uploadButton = document.getElementById("uploadButton");
const filtersContainer = document.querySelector(".allfilters");
const searchContainer = document.querySelector(".search-container");
let trackCount = 1; // Track count starts from 1
const uploadHeading = document.getElementById("uploadHeading");
const chooseFilterOverlay = document.getElementById("chooseFilterOverlay");
const filterHeading = document.getElementById("filterHeading");
const starredoverlay = document.querySelector(".starredoverlay");
const bookmarkButton = document.getElementById("bookmarkButton");
const pulsingCircle = document.createElement("div");
pulsingCircle.classList.add("pulsing-circle");
const demoPlayer = document.getElementById("demoPlayer");
  const volumeControlDiv = document.querySelector('.volume-control');
  volumeControlDiv.style.display = 'none';
const bookmarkDemoButton = document.getElementById("bookmarkDemoButton");
bookmarkDemoButton.style.display = "none";
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
  searchContainer.style.display = "none";
  selectFileButton.style.display = "block";
  uploadHeading.style.display = "block";
  uploadButton.style.backgroundColor = "transparent";
  uploadButton.style.fontWeight = "bold";
  chooseFilterOverlay.style.display = "block";


    var clickHandler = function() {


  document.body.appendChild(fileInput);
  fileInput.click();
  
  };
  
    selectFileButton.addEventListener("click", clickHandler, { once: true });

chooseFilterOverlay.addEventListener("click", function(event) {
  // Hide the filters and reset other elements as needed
  filtersContainer.style.display = "block";
  searchContainer.style.display = "block";
  selectFileButton.style.display = "none";
  uploadHeading.style.display = "none";
  uploadButton.style.backgroundColor = "black";
  uploadButton.style.fontWeight = "normal";
  chooseFilterOverlay.style.display = "none";
  event.stopPropagation();

  // Remove the event listener from the upload button
  selectFileButton.removeEventListener("click", clickHandler);
});


let currentTrackIndex = 0;


function playAudio() {
  const audioPlayer = document.getElementById("audioPlayer");

  if (currentTrackIndex >= 0 && currentTrackIndex < gridItems.length) {
    const trackElement = gridItems[currentTrackIndex];
    const audioElement = trackElement.querySelector("audio");

    const playHandler = function() {
      audioPlayer.play();
      audioPlayer.removeEventListener("loadedmetadata", playHandler);
    };

    if (audioPlayer.paused || audioPlayer.src !== audioElement.src) {
      audioPlayer.src = audioElement.src;
      audioPlayer.addEventListener("loadedmetadata", playHandler);
    } else {
      audioPlayer.pause();
    }

    showAudioPlayer();
  }

}



  // Wait for the user to select a file
// Wait for the user to select a file
fileInput.addEventListener("change", function(event) {
    
  // Hide "select file" button
  selectFileButton.style.display = "none";



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
      const genreSelect = createDropDown("Genre", ["", "Pop", "Rock", "Jazz", "Hip-Hop", "Trap", "RnB", "Electronic", "Reggae", "Latin", "Funk/Soul", "Country","Folk", "Blues"], modal.content);
      // Create the key select dropdown
      const keySelect = createDropDown("Key", ["", "C", "Cm", "C#", "C#m", "D", "Dm", "Eb", "Ebm", "E", "Em", "F", "F#", "Fm", "F#m", "G", "G#", "Gm", "G#m", "A", "Am", "Bb", "Bbm", "B", "Bm"], modal.content);

      // Create the intro description drop-down selections
      const rhythmSelect = createDropDown("Rhythm", ["", "Dynamic", "Smooth", "Sliding", "Drifting"], modal.content);
      const colorSelect = createDropDown("Color", ["", "Warm", "Cold", "Colorful", "Stark"], modal.content);
      const intensitySelect = createDropDown("Intensity", ["", "Aggressive", "Soft", "Moderate"], modal.content);
      const instrumentSelect = createDropDown("Instrument", ["", "Drum-and-bass", "Guitar", "Electric guitar", "Pluck", "Bass", "Strings", "Piano", "Synth", "Flute", "Violin", "Brass", "Vocal sample", "Sound FX", "Banjo", "Sitar", "Harmonica", "Ukelele"], modal.content);
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

// Create the input boxes for URLs
const linkInputsContainer = document.createElement("div");
linkInputsContainer.classList.add("link-inputs-container");
const linkInputsLabel = document.createElement("label");
linkInputsLabel.textContent = "Link(s) to purchase your track: ";
linkInputsLabel.classList.add("label");

// Append the label as the first child of the container
linkInputsContainer.appendChild(linkInputsLabel);

for (let i = 1; i <= 3; i++) {
  const linkInput = document.createElement("input");
  linkInput.setAttribute("type", "text");
  linkInput.setAttribute("placeholder", `Link ${i}`);
  linkInputsContainer.appendChild(linkInput);
}

      // Create a submit button for the modal dialog
      const submitButton = document.createElement("button");
      submitButton.textContent = "Publish";
      submitButton.classList.add("submit-button"); // Add the CSS class to the button

      // Add a click event listener to handle the form submission
      submitButton.addEventListener("click", function() {

        // show filters again
        filtersContainer.style.display = "block";
        uploadHeading.style.display = "none";
        uploadButton.style.backgroundColor = "black";
      uploadButton.style.fontWeight = "normal";
        chooseFilterOverlay.style.display = "none";
        searchContainer.style.display = "block";
  


        // Create a new grid item to display the uploaded audio
        const newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");

        newGridItem.appendChild(audioElement);
        newGridItem.appendChild(gridTimer);



        // Name the tracks
        const trackNameElement = document.createElement("p");        
        trackNameElement.classList.add("track-name");
         trackNameElement.textContent = trackName;
       


        





// "&#10074;&#10074;"; // Pause symbol (||)
// "&#9654;"; // play symbol       

// Create the play/pause button
  const playPauseButton = document.createElement('button');
  playPauseButton.classList.add('play-pause-button');
playPauseButton.innerHTML = "&#9654;";
newGridItem.appendChild(playPauseButton);
newGridItem.appendChild(audioPlayer);

let playbackPosition = 0; // Variable to store the current playback position
let isAudioPlaying = false;
  const overlayStar = document.createElement("span");
overlayStar.classList.add("overlay-star");
playPauseButton.addEventListener("click", function() {
  playPauseButton.style.fontSize = "25px";
  if (isRecording) {
    stopRecording();
  }

  // SHOW THE OVERLAY TRACK NAME
  const overlayTrackName = document.createElement("p");
overlayTrackName.classList.add("overlay-track-name");
overlayTrackName.style.fontWeight = "bold";
overlayTrackName.style.color = "white";
overlayTrackName.style.position = "fixed";
overlayTrackName.style.left = "30px";
overlayTrackName.textContent = "Playing: " + trackName;


const audioPlayerOverlay = document.getElementById("audioPlayerOverlay");

// Remove any existing overlay track name
const existingTrackName = audioPlayerOverlay.querySelector(".overlay-track-name");
if (existingTrackName) {
  existingTrackName.remove();
}

audioPlayerOverlay.appendChild(overlayTrackName);

 // SHOWING IT ON TOP
  const demoTrackName = document.createElement("p");
demoTrackName.classList.add("demo-track-name");
demoTrackName.style.fontWeight = "bold";
demoTrackName.style.color = "white";
demoTrackName.style.position = "fixed";
demoTrackName.style.left = "169px";
demoTrackName.style.top = "4px";
demoTrackName.textContent = trackName;

topoverlay = document.querySelector(".topoverlay");
// Remove any existing overlay track name
const existingDemoTrack = topoverlay.querySelector(".demo-track-name");
if (existingDemoTrack) {
  existingDemoTrack.remove();
}

topoverlay.appendChild(demoTrackName);


// OVERLAY STAR

overlayStar.style.color = "white";
overlayStar.style.position = "fixed";
overlayStar.style.fontSize = "30px";
overlayStar.style.cursor = "pointer";
overlayStar.innerHTML = "&#9734";

const existingStar = audioPlayerOverlay.querySelector(".overlay-star");
if (existingStar) {
  existingStar.remove();
}

audioPlayerOverlay.appendChild(overlayStar);
overlayStar.addEventListener("click", function() {


  if (!isStarred) {
    overlayStar.style.color = "yellow";
    overlayStar.classList.add("starred"); // Apply the "starred" style
  } else {
    overlayStar.style.color = "white";
    overlayStar.classList.remove("starred"); // Remove the "starred" style
  }
    starButton.dispatchEvent(new Event("click"));
});

if (!isStarred) {
  overlayStar.style.color = "white";
} else {
  overlayStar.style.color = "yellow";
}

///
  const overlayFindButton = document.createElement("p");
overlayFindButton.classList.add("overlay-find-button");
overlayFindButton.style.fontWeight = "bold";
overlayFindButton.style.color = "white";
overlayFindButton.style.position = "fixed";
overlayFindButton.textContent = "Find";

const existingFindButton = audioPlayerOverlay.querySelector(".overlay-find-button");
if (existingFindButton) {
  existingFindButton.remove();
}

audioPlayerOverlay.appendChild(overlayFindButton);
overlayFindButton.style.cursor = "pointer";
overlayFindButton.style.color = "blue";
overlayFindButton.addEventListener("click", function () {
  if (isLinkInfoVisible) {
    // If link information is already visible, hide it
    linkValuesContainer.style.display = "none";
    linkValuesContainer.innerHTML = "";
  } else {
    // If link information is not visible, show it
    const linkInputs = linkInputsContainer.querySelectorAll("input");
    const linkValues = Array.from(linkInputs).map((input) => input.value);

    linkValuesContainer.innerHTML = "";

    const titleElement = document.createElement("h2");
    titleElement.textContent = "Purchase track at:";
    linkValuesContainer.appendChild(titleElement);

    linkValues.forEach((value, index) => {
      const linkValueElement = document.createElement("p");
      const linkElement = document.createElement("a");
      linkElement.href = value;
      linkElement.textContent = `${value}`;
      linkElement.style.color = "blue";
      linkValueElement.appendChild(linkElement);
      linkValuesContainer.appendChild(linkValueElement);
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", function () {
      linkValuesContainer.style.display = "none";
      linkValuesContainer.innerHTML = "";
      isLinkInfoVisible = false;
    });
    linkValuesContainer.appendChild(closeButton);

    linkValuesContainer.style.display = "block";
    linkValuesContainer.style.position = "fixed";
    linkValuesContainer.style.top = "50%";
    linkValuesContainer.style.left = "50%";
    linkValuesContainer.style.width = "30%";
    linkValuesContainer.style.height = "30%";
    linkValuesContainer.style.color = "white";
    linkValuesContainer.style.transform = "translate(-50%, -50%)";
    linkValuesContainer.style.backgroundColor = "black";
    linkValuesContainer.style.opacity = "0.9";
    linkValuesContainer.style.padding = "20px";
    linkValuesContainer.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    linkValuesContainer.style.zIndex = "9999";
  }

  isLinkInfoVisible = !isLinkInfoVisible; // Toggle the visibility state



});

///

showAudioPlayer();  
gridAudioPlayer.pause();
overlay.style.display = "none";
demoOverlay.style.display = "block";
demoOverlay.style.pointerEvents = "auto";
//headphoneButtonContainer.style.display = "block";

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

let isStarred = false; // Initial state is not starred
  const starButton = document.createElement("span");
starButton.classList.add("star-button");
starButton.innerHTML = "&#9734;"; // Star symbol

// Add a click event listener to handle starring/unstarring the grid item

starButton.addEventListener("click", function() {
  isStarred = !isStarred; // Toggle the starred state
  if (isStarred) {
    starButton.style.color = "yellow";
    overlayStar.style.color = "yellow";
    starButton.classList.add("starred"); // Apply the "starred" style

    console.log(`Starred track: ${trackName}`); // Log the track name when starred
  } else {
    starButton.style.color = "black";
    overlayStar.style.color = "white";
    starButton.classList.remove("starred"); // Remove the "starred" style

    console.log(`Unstarred track: ${trackName}`); // Log the track name when unstarred
  }

});



// FIND TRACKS
const findTrackButton = document.createElement("button");
findTrackButton.classList.add("find-track-button");
findTrackButton.innerHTML = "Find";
findTrackButton.style.fontWeight = "bold";
const linkValuesContainer = document.createElement("div");
linkValuesContainer.classList.add("link-values-container");

let isLinkInfoVisible = false; // Track the visibility state of link information

findTrackButton.addEventListener("click", function () {
  if (isLinkInfoVisible) {
    // If link information is already visible, hide it
    linkValuesContainer.style.display = "none";
    linkValuesContainer.innerHTML = "";
  } else {
    // If link information is not visible, show it
    const linkInputs = linkInputsContainer.querySelectorAll("input");
    const linkValues = Array.from(linkInputs).map((input) => input.value);

    linkValuesContainer.innerHTML = "";



    const titleElement = document.createElement("h2");
    titleElement.textContent = "Purchase track at:";
    linkValuesContainer.appendChild(titleElement);
linkValues.forEach((value, index) => {
  const linkValueElement = document.createElement("p");
  const linkElement = document.createElement("a");
  linkElement.href = value;
  linkElement.textContent = `${value}`;
  linkElement.style.color = "blue";
  linkValueElement.appendChild(linkElement);
  linkValuesContainer.appendChild(linkValueElement);
});


        const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", function () {
      linkValuesContainer.style.display = "none";
      linkValuesContainer.innerHTML = "";
      isLinkInfoVisible = false;
    });
    linkValuesContainer.appendChild(closeButton);
   


    linkValuesContainer.style.display = "block";
    linkValuesContainer.style.position = "fixed";
    linkValuesContainer.style.top = "50%";
    linkValuesContainer.style.left = "50%";
    linkValuesContainer.style.width = "30%";
    linkValuesContainer.style.height = "30%";
    linkValuesContainer.style.color = "white";
    linkValuesContainer.style.transform = "translate(-50%, -50%)";
    linkValuesContainer.style.backgroundColor = "black";
    linkValuesContainer.style.opacity = "0.9";
    linkValuesContainer.style.padding = "20px";
    linkValuesContainer.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    linkValuesContainer.style.zIndex = "9999";
  }

  isLinkInfoVisible = !isLinkInfoVisible; // Toggle the visibility state
});



document.body.appendChild(linkValuesContainer);





        const audioIntroElement = document.createElement("p");
        audioIntroElement.classList.add("keyword");
        audioIntroElement.dataset.genre = genreSelect.value;
        audioIntroElement.dataset.key = keySelect.value;
        audioIntroElement.dataset.rhythm = rhythmSelect.value;
        audioIntroElement.dataset.color = colorSelect.value;
        audioIntroElement.dataset.intensity = intensitySelect.value;
        audioIntroElement.dataset.instrument = instrumentSelect.value;
audioIntroElement.style.fontSize = "16px";
audioIntroElement.style.fontFamily = "sans-serif";
const rhythm = `<strong>${rhythmSelect.value}</strong>`;
const color = `<strong>${colorSelect.value}</strong>`;
const intensity = `<strong>${intensitySelect.value}</strong>`;

        const chordValues = chordSelects.map(chordSelect => chordSelect.value).filter(value => value !== "");
        audioIntroElement.dataset.chords = JSON.stringify(chordValues);
        let chordsDisplay = "";
        if (chordValues.length > 0) {
          if (chordValues.length > 1) {
            chordsDisplay = chordValues.join("  -  ");
          } else {
            chordsDisplay = chordValues[0];
          }
          chordsDisplay = `<span style="font-weight: bold; font-size: 15px; font-style: italic; color: #666666;">${chordsDisplay}</span>`;
        }
        audioIntroElement.innerHTML = `${rhythm}, ${color}, ${intensity}, ${instrumentSelect.value}<br>${chordsDisplay}`;
      // Create a container for the audio intro element
      const audioIntroContainer = document.createElement("div");
      audioIntroContainer.classList.add("audio-intro-container");



// Add the audio intro element to the container
audioIntroContainer.appendChild(audioIntroElement);

// Add the audio intro container to the grid item
newGridItem.appendChild(audioIntroContainer);
// Call the saveTextElements function to save the text elements to Firebase
const file = event.target.files[0];

// Upload audio file to Firebase Storage
uploadAudioFile(file)
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(audioUrl => {
    // Save track information (including text elements) to Firebase Realtime Database
    const trackData = {
      audioUrl: audioUrl,
      genre: genreSelect.value,
      key: keySelect.value,
      rhythm: rhythmSelect.value,
      color: colorSelect.value,
      intensity: intensitySelect.value,
      instrument: instrumentSelect.value,
      chords: JSON.stringify(chordValues)
    };

    return saveTrackInfo(trackData);
  })
  .then((trackId) => {
    console.log('Track information saved successfully with track ID:', trackId);
    // Additional code here if needed
  })
  .catch((error) => {
    console.error('Error saving track information:', error);
  });


// Create a star button

const leftContainer = document.createElement("div");
leftContainer.classList.add("left-container");
leftContainer.appendChild(starButton);
leftContainer.appendChild(findTrackButton);

const contentContainer = document.createElement("div");
contentContainer.classList.add("content-container");
// Add the star button and track name to the content container
contentContainer.appendChild(leftContainer);
contentContainer.appendChild(trackNameElement);


newGridItem.appendChild(contentContainer);
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
        modal.content.appendChild(linkInputsContainer);
      });

      // Create a wrapper container for the submit button
      const submitContainer = document.createElement("div");
      submitContainer.classList.add("submit-container");
      submitContainer.appendChild(submitButton);
      modal.content.appendChild(submitContainer);

    });

// Starring the tracks
const showStarredButton = document.getElementById("showStarredButton");
const gridItems = document.querySelectorAll(".grid-item");
let isFilterActive = false;
const starIcon = document.querySelector(".star-icon");

for (const item of gridItems) {
  const starButton = item.querySelector(".star-button");

}

showStarredButton.addEventListener("click", function() {
  // Toggle the filter state
  isFilterActive = !isFilterActive;

  rhythmFilterDropdown.value = "";
  colorFilterDropdown.value = "";
  intensityFilterDropdown.value = "";
  instrumentFilterDropdown.value = "";
  chordFilterDropdown.forEach(chordFilter => {
    chordFilter.value = "";
  });
  genreFilterDropdown.value = "";
  keyFilterDropdown.value = "";

  if (isFilterActive) {
    // Filter and show only the starred grid items
    const starredGridItems = Array.from(gridItems).filter(item => {
      const starButton = item.querySelector(".star-button");
      return starButton && starButton.classList.contains("starred");
    });

    // Iterate through all grid items and hide them by default
    for (const item of gridItems) {
      item.style.display = "none";
    }

    // Show only the starred grid items
    for (const item of starredGridItems) {
      item.style.display = "block";
    }

    showStarredButton.classList.add("active");
    starIcon.style.color = "yellow"; // Set the star icon color to yellow
  } else {
    // Reset the visibility of all grid items
    for (const item of gridItems) {
      item.style.display = "block";
    }



    showStarredButton.classList.remove("active");
    starIcon.style.color = "black"; // Set the star icon color to white
  }
});





     reader.readAsDataURL(event.target.files[0]);
  });
});


const showStarredContainer = document.createElement("div");
showStarredContainer.classList.add("show-starred-container");
showStarredContainer.appendChild(showStarredButton);
starredoverlay.appendChild(showStarredContainer);

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
const autoRecordCheckbox = document.getElementById("autoRecordCheckbox");
starredoverlay.appendChild(autoRecordCheckbox);
const overlay = document.getElementById("overlay");
const demoOverlay = document.getElementById("demoOverlay");
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
  bookmarkButton.style.display = "block";
  bookmarkButton.style.opacity = "0.6";
  bookmarkButton.style.pointerEvents = "none";
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

const tooContainer = document.createElement("div");
tooContainer.classList.add("too-container");
const label = document.createElement("label");
const tooQuestion = document.createElement("span");
tooQuestion.textContent = "How's your vocal playback?";
tooQuestion.style.color = "black";
tooQuestion.style.marginLeft = "70%";
tooQuestion.style.fontSize = "14px";
tooQuestion.style.width = "500px";

starredoverlay.appendChild(tooQuestion);


const tooLateButton = document.createElement("button");
tooLateButton.innerHTML = "Too late";
tooLateButton.classList.add("too-late-button");
tooLateButton.addEventListener("click", function () {
  // Handle "Too late?" button click
  if (isUsingHeadphones) {
    uniqueDelayTime -= 45;
  } else {
    uniqueDelayTime -= 45;
  }

  tooLateButton.classList.add("clicked");

  setTimeout(function () {
    tooLateButton.classList.remove("clicked");
  }, 170);
});
const tooEarlyButton = document.createElement("button");
tooEarlyButton.innerHTML = "Too early";
tooEarlyButton.classList.add("too-early-button");
tooEarlyButton.addEventListener("click", function () {
  // Handle "Too early?" button click
  if (isUsingHeadphones) {
    uniqueDelayTime += 45;
  } else {
    uniqueDelayTime += 45;
  }

  tooEarlyButton.classList.add("clicked");

  setTimeout(function () {
    tooEarlyButton.classList.remove("clicked");
  }, 170);
});
tooContainer.appendChild(tooEarlyButton);
tooContainer.appendChild(tooLateButton);


var isUsingHeadphones = true; // Set it to true initially

// Create the checkbox input element
const headphoneCheckbox = document.createElement("input");
headphoneCheckbox.type = "checkbox";
headphoneCheckbox.id = "headphoneCheckbox";
headphoneCheckbox.checked = true; // Check the checkbox by default

// Create the label for the checkbox
const headphoneLabel = document.createElement("label");
headphoneLabel.htmlFor = "headphoneCheckbox";
headphoneLabel.textContent = "Wearing headphones";

// Add event listener to the checkbox
headphoneCheckbox.addEventListener("change", function() {
  isUsingHeadphones = headphoneCheckbox.checked; // Update the variable value based on checkbox state
});


// Append the checkbox and label to the container
const headphoneContainer = document.createElement("div");
headphoneContainer.classList.add("headphone-container");

headphoneContainer.appendChild(headphoneCheckbox);
headphoneContainer.appendChild(headphoneLabel);
headphoneCheckbox.classList.add("headphone-checkbox");
headphoneLabel.classList.add("headphone-label");

starredoverlay.appendChild(headphoneContainer);
starredoverlay.appendChild(tooContainer);


recordButtonOverlay.addEventListener("click", toggleRecording);
let uniqueDelayTime = 0;


 

function toggleRecording() {

    let chunks = [];


 // SET DELAY TIME
  const recordButton = document.getElementById("recordButton");
   audioPlayer.addEventListener("ended", function() {
  recordButton.innerHTML = '<i class="fas fa-microphone"></i>'; // Change recordButton inner HTML to the microphone icon
  
  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
  }
});

let bookmarkTime; // Declare the bookmarkTime variable outside the event listeners

bookmarkButton.addEventListener("click", function () {
  if (isRecording) {
    const currentTime = Math.floor(audioPlayer.currentTime * 1000);
    console.log("Bookmark Time:", currentTime);

    // Store the bookmark time in the variable
    bookmarkTime = currentTime;

    // Perform any additional actions with the bookmark time

    // Example: Create a bookmark object and store the time
    const bookmark = {
      time: currentTime,
      description: "Bookmark description",
    };
    // Add the bookmark to an array or perform any necessary logic
  }
});

bookmarkDemoButton.addEventListener("click", function () {
  // Use the bookmarkTime variable in this function
  if (bookmarkTime) {
    gridAudioPlayer.currentTime = bookmarkTime / 1000; // Convert bookmark time to seconds
  }
});


if (recordButton.innerHTML === '<i class="fas fa-microphone"></i>') {
  // SET DELAY TIME
  const timerValue = timer.innerHTML;
  const numericValue = parseFloat(timerValue);
  
  if (autoRecordCheckbox.checked && isUsingHeadphones) {
    delayTime = -355; // Set delay time to 0 if auto record checkbox is checked
  } else if (autoRecordCheckbox.checked) {
    delayTime = -242;
  } else if (isUsingHeadphones) {
    console.log("Using headphones");
    // Perform actions specific to using headphones
    // For example, set a longer delay time
    delayTime = isNaN(numericValue) ? 0 : numericValue - 286;
  } else {
    console.log("Not using headphones");
    // Perform actions specific to not using headphones
    // For example, set a shorter delay time
    delayTime = isNaN(numericValue) ? 0 : numericValue - 163;
  }

    console.log("Delay Time:", delayTime);

  }
  if (!permissionGranted) {
    console.error("Microphone permission not granted.");
    return;
  }

  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    overlay.style.pointerEvents = "none";

    recordButton.innerHTML = '<i class="fas fa-microphone"></i>';
    
  } else {
    if (audioPlayer && audioPlayer.src !== "" && !audioPlayer.paused) {
      bookmarkButton.style.opacity = "1";
bookmarkButton.style.pointerEvents = "auto";

      recordingStartTime = audioPlayer.currentTime;

      mediaRecorder = new MediaRecorder(stream); 
 // Use the stored stream object
    
      mediaRecorder.start();
      isRecording = true;
      overlay.style.pointerEvents = "auto";

      recordButton.innerHTML = '<i class="fas fa-square"></i>';
updateRed()
      overlay.style.display = "block";

      const gridItem = audioPlayer.closest(".grid-item");
        

      mediaRecorder.addEventListener("dataavailable", function (event) {
        chunks.push(event.data);

      });




      mediaRecorder.addEventListener("stop", function () {
        bookmarkButton.style.opacity = "0.6";
        bookmarkButton.style.pointerEvents = "none";
pulsingCircle.style.display = "none";
        overlay.style.display = "none";
        gridAudioPlayer.currentTime = 0;
const gridItems = document.querySelectorAll(".grid-item");
let currentGridItem = null;
let isAudioPlaying = false;

for (const gridItem of gridItems) {
  const audioElement = gridItem.querySelector("audio");
  
  if (audioElement && audioElement.src === audioPlayer.src) {
    currentGridItem = gridItem;
    isAudioPlaying = !audioElement.paused;
    break; // Stop the loop once the matching grid item is found
  }
}


        const recordedAudio = new Blob(chunks, { type: "audio/wav" });
        const demoButton = createDemoButton(currentGridItem, recordedAudio, delayTime);
        currentGridItem.appendChild(demoButton);



const audioContext = new AudioContext();
const fileReader = new FileReader();

fileReader.onload = function (event) {
  const arrayBuffer = event.target.result;

  audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
    const audioData = audioBuffer.getChannelData(0); // Assuming mono audio

    let peak = 0;
    for (let i = 0; i < audioData.length; i++) {
      const absSample = Math.abs(audioData[i]);
      if (absSample > peak) {
        peak = absSample;
      }
    }

    const peakVolumeDB = 20 * Math.log10(peak);

    console.log("Peak Volume (dB):", peakVolumeDB);
  });
};

fileReader.readAsArrayBuffer(recordedAudio);

// PLAYING THE AUDIO PLAYERS FOR DEMO
function playAudioWithoutPlayer(gridItem) {
   playDemoPlayer(gridItem) 
  const audioElement = gridItem.querySelector("audio");
  if (!audioElement) {
    console.error("Audio element not found in the grid item.");
    return;
  }

  const gridAudioPlayer = document.getElementById("gridAudioPlayer");
  const url = audioElement.src;

  if (!gridAudioPlayer.paused && gridAudioPlayer.src === url) {
    gridAudioPlayer.pause();
  } else {
    if (gridAudioPlayer.src !== url) {
      gridAudioPlayer.src = url;
    }
    gridAudioPlayer.play();
  }

  gridAudioPlayer.style.display = "block"; // Show the grid audio player
}

function playDemoPlayer(gridItem) {
  const demoRecording = new Audio();
  demoRecording.classList.add("demo-recording");
  demoRecording.src = demoButton.getAttribute("data-audio-url"); // Retrieve the recorded audio URL from the button

  

volumeSlider.addEventListener("input", function() {
  const volume = parseFloat(volumeSlider.value);
  demoPlayer.volume = volume;
});
  const url = demoRecording.src;

  if (!demoPlayer.paused && demoPlayer.src === url) {
    demoPlayer.pause();
  } else {
    if (demoPlayer.src !== url) {
      demoPlayer.src = url;
    }
    demoPlayer.play();
  }
  demoPlayer.style.display = "none"; // Show the demo audio player
  volumeControlDiv.style.display = 'block';
}



// Create DEMO BUTTON
function createDemoButton(gridItem, recordedAudio, delayTime) {

  //CREATE DEMO BUTTON 
  const demoButton = document.createElement("button");
  demoButton.classList.add("demo-button");
  demoButton.innerHTML = "Demo";
  demoButton.setAttribute("data-audio-url", URL.createObjectURL(recordedAudio)); // Store the recorded audio URL
 demoButton.setAttribute("data-delay-time", delayTime); // Set the delay time as a data attribute


const demoPlayPause = document.createElement("button");
  demoPlayPause.classList.add("demo-play-pause");
  demoPlayPause.innerHTML = "";
const playSymbol = "&#9658;"; // Unicode character for play symbol
  const pauseSymbol = "&#10074;&#10074;"; 

    demoPlayPause.innerHTML = playSymbol;


currentGridItem.appendChild(demoPlayPause);




  // CLICK DEMO BUTTON
  demoButton.addEventListener("click", function () {
    recordButton.style.opacity = "0.6";
    bookmarkDemoButton.style.display = "block";
    bookmarkButton.style.opacity = "1";
bookmarkButton.style.pointerEvents = "auto";
let bookmarkTime; // Declare the bookmarkTime variable outside the event listeners

bookmarkButton.addEventListener("click", function () {
    const currentTime = Math.floor(gridAudioPlayer.currentTime * 1000);
    console.log("Bookmark Time:", currentTime);

    // Store the bookmark time in the variable
    bookmarkTime = currentTime;

    // Perform any additional actions with the bookmark time

    // Example: Create a bookmark object and store the time
    const bookmark = {
      time: currentTime,
      description: "Bookmark description",
    };
    // Add the bookmark to an array or perform any necessary logic
  });

bookmarkDemoButton.addEventListener("click", function () {
  // Use the bookmarkTime variable in this function
  if (bookmarkTime) {
    gridAudioPlayer.currentTime = bookmarkTime / 1000; // Convert bookmark time to seconds
  }
});


    const recordAgainText = document.createElement("button");
  recordAgainText.innerHTML = "Record again";
  recordAgainText.classList.add("record-again-text");


  // Add a click event listener to the document to handle hiding the text
  const handleDocumentClick = function (event) {
    const isInsideDemoButton = event.target === demoButton || demoButton.contains(event.target);
    const isInsideRecordAgainText = event.target === recordAgainText || recordAgainText.contains(event.target);

    if (!isInsideDemoButton && !isInsideRecordAgainText) {
      recordAgainText.remove();
      recordButton.style.opacity = "1";
      document.removeEventListener("click", handleDocumentClick);
    }
  };

  audioPlayer.addEventListener("play", handleDocumentClick);

currentGridItem.appendChild(recordAgainText);
    demoPlayPause.innerHTML = "";
    demoOverlay.style.display = "none";
    demoOverlay.style.pointerEvents = "none";
        if (gridAudioPlayer.paused) {
      demoPlayPause.innerHTML = pauseSymbol;
    } else {
      demoPlayPause.innerHTML = playSymbol;
    }
      demoPlayPause.style.display = "block";
  
topoverlay.appendChild(bookmarkDemoButton);

  // Set a timeout to hide the demo play pause button after 2 seconds
  setTimeout(function() {
    demoPlayPause.style.display = "none";
  }, 3000);
    playAudioWithoutPlayer(gridItem);
   audioPlayer.pause();
   overlay.style.display = "block";
   overlay.style.pointerEvents = "auto";
  uniqueDelayTime = parseFloat(demoButton.getAttribute("data-delay-time"));
    event.stopPropagation();

        const demoButtons = document.querySelectorAll(".demo-button");
    demoButtons.forEach(button => {
      button.classList.remove("active");
    });

    // Add the 'active' class to the clicked demo button
    demoButton.classList.add("active");

    // Remove previous demo recording, if any
    const previousDemoRecording = gridItem.querySelector(".demo-recording");
    if (previousDemoRecording) {
      previousDemoRecording.parentNode.removeChild(previousDemoRecording);
    }






  });

  return demoButton;

}


        // Reset the recording state

        isRecording = false;

        recordButton.innerHTML = '<i class="fas fa-microphone"></i>';
      });
    }
  }
}





function updateRed() {
  const gridItems = document.querySelectorAll(".grid-item");
  let currentGridItem = null;
  let isAudioPlaying = false;

  for (const gridItem of gridItems) {
    const audioElement = gridItem.querySelector("audio");
    if (audioElement && audioElement.src === audioPlayer.src) {
      currentGridItem = gridItem;
      break; // Stop the loop once the matching grid item is found
    }
  }
currentGridItem.appendChild(pulsingCircle);
  // Remove the previous current grid item styling
   if (!currentGridItem || !isAudioPlaying) {
    pulsingCircle.style.display = "none";

  }

  // Add the current grid item styling
  if (currentGridItem) {
    pulsingCircle.style.display = "block";

  }
}



function formatTime(time) {
  return time.toString();
}


function padZero(num, size) {
  let padded = "000000000" + num;
  return padded.substr(padded.length - size);
}




gridAudioPlayer.addEventListener("timeupdate", function() {
  const gridTime = gridAudioPlayer.currentTime * 1000;
  const demoTime = gridTime - uniqueDelayTime; // Convert delayTime to milliseconds
  
  console.log("Unique Delay Time:", uniqueDelayTime);

  if (demoTime >= 0) {

    demoPlayer.currentTime = demoTime / 1000;
    demoPlayer.muted = false; // Unmute the demo player when it's time to play
 
  } else {
    demoPlayer.currentTime = 0;
    demoPlayer.muted = true; // Mute the demo player when it's not yet time to play
  }
});
gridAudioPlayer.addEventListener("play", function() {
  demoPlayer.play();

const audioContext = new (AudioContext || webkitAudioContext)();
let sourceNode;


if (!sourceNode) {
  // Disconnect the current sourceNode if it exists
  sourceNode = audioContext.createMediaElementSource(demoPlayer);
}




const eqNode2 = audioContext.createBiquadFilter();
eqNode2.type = 'highpass';
eqNode2.frequency.value = 180;
eqNode2.gain.value = 0;

const eqNode3 = audioContext.createBiquadFilter();
eqNode3.type = 'peaking';
eqNode3.frequency.value = 350; // Adjust the frequency to target the high-range
eqNode3.gain.value = -3; // Adjust the gain as needed

const eqNode4 = audioContext.createBiquadFilter();
eqNode4.type = 'peaking';
eqNode4.frequency.value = 5000; // Adjust the frequency to target the mid-range
eqNode4.gain.value = 2.5; // Adjust the gain as needed

const eqNode5 = audioContext.createBiquadFilter();
eqNode5.type = 'lowpass';
eqNode5.frequency.value = 18000; // Adjust the frequency as needed

// Cascading four first-order filters for 24 dB/octave slope
const filter1 = audioContext.createBiquadFilter();
filter1.type = 'lowpass';
filter1.frequency.value = eqNode5.frequency.value;
filter1.Q.value = 1 / Math.sqrt(2);

const filter2 = audioContext.createBiquadFilter();
filter2.type = 'lowpass';
filter2.frequency.value = eqNode5.frequency.value;
filter2.Q.value = 1 / Math.sqrt(2);

const filter3 = audioContext.createBiquadFilter();
filter3.type = 'lowpass';
filter3.frequency.value = eqNode5.frequency.value;
filter3.Q.value = 1 / Math.sqrt(2);

const filter4 = audioContext.createBiquadFilter();
filter4.type = 'lowpass';
filter4.frequency.value = eqNode5.frequency.value;
filter4.Q.value = 1 / Math.sqrt(2);

// Connect the filters in series
eqNode5.connect(filter1);
filter1.connect(filter2);
filter2.connect(filter3);
filter3.connect(filter4);
filter4.connect(eqNode3);

const eqNode6 = audioContext.createBiquadFilter();
eqNode6.type = 'peaking';
eqNode6.frequency.value = 8000; // Adjust the frequency as needed
eqNode6.gain.value = 1; // Adjust the gain as needed

const compressorNode = audioContext.createDynamicsCompressor();
compressorNode.threshold.value = -19;
compressorNode.ratio.value = 6;
compressorNode.attack.value = 0.3;
compressorNode.release.value = 0.01;

const gainNode = audioContext.createGain();
gainNode.gain.value = 1.25;

console.log("Adding audio effects...");

sourceNode.connect(eqNode2);
eqNode2.connect(eqNode4);
eqNode4.connect(eqNode5);
eqNode5.connect(eqNode6);
eqNode6.connect(compressorNode);
compressorNode.connect(gainNode);
gainNode.connect(audioContext.destination);
});

gridAudioPlayer.addEventListener("pause", function() {
  demoPlayer.pause();
});

// PLAYING AND PAUSING THE AUDIO PLAYERS FOR DEMO
function playPauseGridAudio() {
  const gridAudioPlayer = document.getElementById("gridAudioPlayer");

  if (gridAudioPlayer.paused) {
    gridAudioPlayer.play();
  } else {
    gridAudioPlayer.pause();
  }
}

function playPauseDemoAudio() {
  const demoPlayer = document.getElementById("demoPlayer");

  if (demoPlayer.paused) {
    demoPlayer.play();
  } else {
    demoPlayer.pause();
  }
}

document.body.style.fontFamily = "sans-serif";
