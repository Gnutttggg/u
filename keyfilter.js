document.addEventListener("DOMContentLoaded", function() {
  const keySelect = createDropDown("Key", ["", "C", "Cm", "C#", "C#m", "D", "Dm", "Eb", "Ebm", "E", "Em", "F", "F#", "Fm", "F#m", "G", "G#", "Gm", "G#m", "A", "Am", "Bb", "Bbm", "B", "Bm"], modal.content);

  // Get the existing HTML element with the id "keyselect"
  const keySelectElement = document.getElementById("keyselect");

  // Clear any existing options
  keySelectElement.innerHTML = "";

  // Add the options to the "Key" select dropdown
  keySelect.options.forEach(function(option) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    keySelectElement.appendChild(optionElement);
  });
});
