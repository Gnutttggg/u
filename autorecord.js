audioPlayer.addEventListener("play", function () {
  if (autoRecordCheckbox.checked) {
    startAutoRecording();
  }
});

function startAutoRecording() {
  let chunks = [];
  
  
  toggleRecording();

}
