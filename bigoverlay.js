// Create the overlay element
function createOverlay(gridItem) {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "black";
  overlay.style.opacity = "0.5";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "999";
  overlay.style.display = "none"; // Initially hide the overlay
  
  gridItem.appendChild(overlay);
}

// Function to check if the grid item is playing audio
function isGridItemPlaying(gridItem) {
  const audioElement = gridItem.querySelector("audio");
  return audioElement && !audioElement.paused;
}

// Function to show/hide overlay based on the playing grid item
function updateOverlay() {
  const gridItems = document.querySelectorAll(".grid-item");

  for (const gridItem of gridItems) {
    const overlay = gridItem.querySelector("#overlay");

    if (isGridItemPlaying(gridItem)) {
      overlay.style.display = "block"; // Show the overlay
    } else {
      overlay.style.display = "none"; // Hide the overlay
    }
  }
}

// Call the updateOverlay function periodically
setInterval(updateOverlay, 500);
