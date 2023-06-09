document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".container");

  container.innerHTML = "";

 fetchTrackData()
    .then((tracks) => {
      // Iterate over the retrieved track data
      Object.keys(tracks).forEach((key) => {
        const track = tracks[key];
        
        // Create a new grid item element
        const newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");

        // Create an audio element for the track
        const audioElement = document.createElement("audio");
        audioElement.src = track.audioUrl;
        audioElement.controls = true;
        // Create a container for the audio intro element
      const audioIntroContainer = document.createElement("div");
      audioIntroContainer.classList.add("audio-intro-container");

      // Create the audio intro element
      const audioIntroElement = document.createElement("p");
      audioIntroElement.classList.add("keyword");
      audioIntroElement.style.fontSize = "16px";
      audioIntroElement.style.fontFamily = "sans-serif";

      // Set the innerHTML of the audio intro element

const genre = track.genre;
const keykey = track.key;
 const rhythm = track.rhythm;
const color = track.color;
const intensity = track.intensity;
const instrument = track.instrument;
const chords = JSON.parse(track.chords); // Parse the JSON string to convert it back to an array

const rhythmDisplay = `<strong>${rhythm}</strong>`;
const colorDisplay = `<strong>${color}</strong>`;
const intensityDisplay = `<strong>${intensity}</strong>`;
const chordsDisplay = chords.join(" - "); // Join the chord values with a separator

const chordsDisplayElement = document.createElement("span");
chordsDisplayElement.style.fontWeight = "bold";
chordsDisplayElement.style.fontSize = "15px";
chordsDisplayElement.style.fontStyle = "italic";
chordsDisplayElement.style.color = "#666666";
chordsDisplayElement.innerHTML = chordsDisplay;

audioIntroElement.innerHTML = `${rhythmDisplay}, ${colorDisplay}, ${intensityDisplay}, ${instrument}<br>`;
audioIntroElement.appendChild(chordsDisplayElement);


newGridItem.appendChild(audioIntroContainer);
      // Append the audio intro element to the container
      audioIntroContainer.appendChild(audioIntroElement);
newGridItem.dataset.genre = genre;
newGridItem.dataset.key = keykey;
newGridItem.dataset.rhythm = rhythm;
newGridItem.dataset.color = color;
newGridItem.dataset.intensity = intensity;
newGridItem.dataset.instrument = instrument;
newGridItem.dataset.chords = JSON.stringify(chords);

const trackName = `Track #${trackCount}`;


      // Increment the track count for the next upload
      trackCount++;
const trackNameElement = document.createElement("p");        
        trackNameElement.classList.add("track-name");
         trackNameElement.textContent = trackName;


        // Create a play button element
      const playPauseButton = document.createElement('button');
  playPauseButton.classList.add('play-pause-button');
playPauseButton.innerHTML = "&#9654;";


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

if (audioPlayer.src !== track.audioUrl) {
  audioPlayer.src = track.audioUrl; // Set the source of the audio player
  
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


        // Append the play button to the new grid item
        newGridItem.appendChild(playPauseButton);
        newGridItem.appendChild(audioElement);
        audioElement.style.display = "none";

newGridItem.appendChild(audioPlayer);
        // Add the grid item to the grid container
        container.appendChild(newGridItem);

      });
    })
    .catch((error) => {
      console.error("Error retrieving grid items:", error);
    });
});


