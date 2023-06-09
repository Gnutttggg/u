const timer = document.createElement("div");
timer.classList.add("timer");
let startTime, elapsedTime = 0, timerInterval;
window.timerElement = timer;
timer.style.color = "white";
timer.style.display = "none";

function resetTimer() {
  elapsedTime = 0;
  clearInterval(timerInterval);
  timerInterval = null;
  timer.innerHTML = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    if (audioPlayer.paused) {
      stopTimer();
    } else {
      updateTimer();
    }
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(time) {
  // Your formatting logic here
  return time.toString();
}

function updateTimer() {
  const currentTime = audioPlayer.currentTime * 1000; // Convert to milliseconds
  const formattedTime = currentTime.toFixed(0); // Format and remove decimal places
  timer.innerHTML = formattedTime;
}

audioPlayer.addEventListener("play", function() {
  startTimer();
});

audioPlayer.addEventListener("pause", function() {
  stopTimer();
});

audioPlayer.addEventListener("ended", function() {
  stopTimer();
});

audioPlayer.addEventListener("timeupdate", function() {
  if (!audioPlayer.paused) {
    updateTimer();
  }
});


// GRID TIMER
const gridTimer = document.createElement("div");
gridTimer.classList.add("timer");
let startGridTime, elapsedGridTime = 0, timerGridInterval;

gridTimer.style.color = "black";
gridTimer.style.display = "none";

function resetGridTimer() {
  elapsedGridTime = 0;
  clearInterval(timerGridInterval);
  timerGridInterval = null;
  gridTimer.innerHTML = formatTime(elapsedGridTime);
}

function startGridTimer() {
  startGridTime = Date.now() - elapsedGridTime;
  timerGridInterval = setInterval(function () {
    if (gridAudioPlayer.paused) {
      stopGridTimer();
    } else {
      updateGridTimer();
    }
  }, 10);
}

function stopGridTimer() {
  clearInterval(timerGridInterval);
}

function formatTime(milliseconds) {
  return milliseconds.toFixed(0);
}

function updateGridTimer() {
  const currentGridTime = gridAudioPlayer.currentTime * 1000; // Convert to milliseconds
  const formattedGridTime = formatTime(currentGridTime); // Format the time
  gridTimer.innerHTML = formattedGridTime;
}

gridAudioPlayer.addEventListener("play", function() {
  startGridTimer();
});

gridAudioPlayer.addEventListener("pause", function() {
  stopGridTimer();
});

gridAudioPlayer.addEventListener("ended", function() {
  stopGridTimer();
});

gridAudioPlayer.addEventListener("timeupdate", function() {
  if (!gridAudioPlayer.paused) {
    updateGridTimer();
  }
});


// RECORDING TIMER
const recordingTimer = document.createElement("div");
recordingTimer.classList.add("timer");
let startRecordingTime, elapsedRecordingTime = 0, timerRecordingInterval;

recordingTimer.style.color = "black";
recordingTimer.style.display = "none";

function resetRecordingTimer() {
  elapsedRecordingTime = 0;
  clearInterval(timerRecordingInterval);
  timerRecordingInterval = null;
  recordingTimer.innerHTML = formatTime(elapsedRecordingTime);
}

function startRecordingTimer() {
  startRecordingTime = Date.now() - elapsedRecordingTime;
  timerRecordingInterval = setInterval(function () {
    if (demoPlayer.paused) {
      stopRecordingTimer();
    } else {
      updateRecordingTimer();
    }
  }, 10);
}

function stopRecordingTimer() {
  clearInterval(timerRecordingInterval);
}

function formatTime(milliseconds) {
  return milliseconds.toFixed(0);
}

function updateRecordingTimer() {
  const currentRecordingTime = demoPlayer.currentTime * 1000; // Convert to milliseconds
  const formattedRecordingTime = formatTime(currentRecordingTime); // Format the time
  recordingTimer.innerHTML = formattedRecordingTime;
}

demoPlayer.addEventListener("play", function() {
  startRecordingTimer();
});

demoPlayer.addEventListener("pause", function() {
  stopRecordingTimer();
});

demoPlayer.addEventListener("ended", function() {
  stopRecordingTimer();
});

demoPlayer.addEventListener("timeupdate", function() {
  if (!demoPlayer.paused) {
    updateRecordingTimer();
  }
});

const starredOverlay = document.querySelector(".starredoverlay");
starredOverlay.appendChild(recordingTimer);

