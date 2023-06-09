const chordFiltersContainer = document.getElementById("chordFiltersContainer");

const labelElement = document.createElement("label");
labelElement.textContent = "Main Progression: ";
chordFiltersContainer.appendChild(labelElement);

for (let i = 1; i <= 8; i++) {
  const selectElement = document.createElement("select");
  selectElement.id = `chordFilter${i}`;


  const chordOptions = ["", "I", "ii", "iii", "IV", "V", "vi", "vii"];
  chordOptions.forEach(function(chord) {
    const optionElement = document.createElement("option");
    optionElement.value = chord;
    optionElement.textContent = chord;
    selectElement.appendChild(optionElement);
  });

  selectElement.addEventListener("change", function() {
    filterGridItems();
  });

  chordFiltersContainer.appendChild(selectElement);
}

function filterGridItems() {
  const selectedChords = [];

  for (let i = 1; i <= 8; i++) {
    const selectElement = document.getElementById(`chordFilter${i}`);
    const selectedChord = selectElement.value;
    selectedChords.push(selectedChord);
  }

  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach(function(gridItem) {
    const audioIntroElement = gridItem.querySelector(".keyword");

    if (audioIntroElement) {
      const displayedChords = audioIntroElement.dataset.chords;

      if (displayedChords) {
        const displayedChordsArray = JSON.parse(displayedChords);
        const shouldShow = displayedChordsArray.some(function(chord) {
          return selectedChords.includes(chord) || selectedChords.includes("");
        });

        gridItem.style.display = shouldShow ? "block" : "none";
      }
    }
  });
}

