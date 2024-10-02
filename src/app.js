var speakers = [];
let words_string = "Ah Um Er Well So Like But Repeats Other";
var words = {};
var speaker_div_id = 0;
words_string = words_string.split(" ");
words_string.forEach(function (word) {
  words[String(word)] = 0;
});
console.log(words);
function addSpeaker(speaker) {
  if (speaker != "") {
  } else {
    speaker = {
      name: "",
      counts: words,
    };
  }
  speakers.push(speaker);
  renderSpeakers();
}

function findSpeakerTotal(speaker) {
  var total = 0;
  for (let key in speaker.counts) {
    total += speaker.counts[key];
  }
  return total;
}

// Function to render speaker entries on the page
function renderSpeakers() {
  const speakersDiv = document.getElementById("speakers");
  speakersDiv.innerHTML = "";
  speaker_div_id = 0
  speakers.forEach((speaker, index) => {
    const speakerDiv = document.createElement("div");
    speakerDiv.className = "speaker-entry";

    speaker_div_id += 1;
    speakerDiv.id = "speakerDiv " + String(speaker_div_id);

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Speaker Name: ";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = speaker.name;
    nameInput.addEventListener("input", (event) => {
      speaker.name = event.target.value;
    });

    speakerDiv.appendChild(nameLabel);
    speakerDiv.appendChild(nameInput);

    const totalLabel = document.createElement("label");
    totalLabel.id = "totalLabel";
    totalLabel.textContent = "Total: 0";
    totalLabel.textContent = "Total: " + findSpeakerTotal(speaker);

    for (const word in speaker.counts) {
      const countContainer = document.createElement("div");
      countContainer.className = "count-container";

      const countLabel = document.createElement("label");
      countLabel.textContent = `${word}: `;

      const countDisplay = document.createElement("span");
      countDisplay.textContent = speaker.counts[word];

      const incrementButton = document.createElement("button");
      incrementButton.textContent = "+";
      incrementButton.className = "button-primary";
      incrementButton.addEventListener("click", () => {
        speaker.counts[word]++;
        totalLabel.textContent = "Total: " + findSpeakerTotal(speaker);
        countDisplay.textContent = speaker.counts[word];
      });
      const dincrementButton = document.createElement("button");
      dincrementButton.textContent = "-";
      dincrementButton.className = "button-primary";
      dincrementButton.addEventListener("click", () => {
        var tempcount = speaker.counts[word] - 1;
        console.log(findSpeakerTotal(speaker));
        if (tempcount < 0) tempcount = 0;
        else {
          speaker.counts[word] = tempcount;
          totalLabel.textContent = "Total: " + findSpeakerTotal(speaker);
        }
        countDisplay.textContent = speaker.counts[word];
      });

      countContainer.appendChild(countLabel);
      countContainer.appendChild(countDisplay);
      countContainer.appendChild(dincrementButton);
      countContainer.appendChild(incrementButton);

      speakerDiv.appendChild(countContainer);
    }

    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes: ";

    const notesTextarea = document.createElement("textarea");
    notesTextarea.rows = 4;
    notesTextarea.cols = 40;
    notesTextarea.value = speaker.notes || "";
    notesTextarea.addEventListener("input", (event) => {
      speaker.notes = event.target.value;
    });

    const removeSpeakerButton = document.createElement("button");
    removeSpeakerButton.textContent = "Remove Speaker";
    removeSpeakerButton.className = "button-primary";
    removeSpeakerButton.addEventListener("click", () => {
      document.getElementById(speakerDiv.id).remove();
      const index = speakers.indexOf(speaker);
      if (index !== -1) {
        speakers.splice(index, 1);
      }

      console.log(speakers);
    });

    speakerDiv.appendChild(totalLabel);
    speakerDiv.appendChild(removeSpeakerButton);
    speakerDiv.appendChild(notesLabel);
    speakerDiv.appendChild(notesTextarea);

    speakersDiv.appendChild(speakerDiv);
  });
}

// Function to generate the report
function generateReport() {
  if (!speakers.length) {
    alert("Add Speaker first");
    return;
  }

  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = "";

  // Wrap the table in a div to control scrolling
  const tableContainer = document.createElement("div");
  tableContainer.id = "reportTableContainer";
  tableContainer.style = "overflow-y: auto; height: 400px;"; // Set a fixed height as needed

  const table = document.createElement("table");
  table.className = "report-table";

  // Ensure the table layout supports sticky header
  table.style = "width: 100%; border-collapse: collapse;";

  // Table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Name";
  headerRow.appendChild(nameHeader);

  for (const word in speakers[0].counts) {
    const wordHeader = document.createElement("th");
    wordHeader.textContent = word;
    headerRow.appendChild(wordHeader);
  }
  const totalHeader = document.createElement("th");
  totalHeader.textContent = "Total";
  headerRow.appendChild(totalHeader);
  const notesHeader = document.createElement("th");
  notesHeader.textContent = "Notes";
  headerRow.appendChild(notesHeader);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body for scrolling
  const tbody = document.createElement("tbody");
  speakers.forEach((speaker) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = speaker.name;
    row.appendChild(nameCell);

    for (const word in speaker.counts) {
      const countCell = document.createElement("td");
      countCell.textContent = speaker.counts[word];
      row.appendChild(countCell);
    }
    const totalCell = document.createElement("td")
    totalCell.textContent = findSpeakerTotal(speaker);
    row.appendChild(totalCell);
    const notesCell = document.createElement("td");
    notesCell.className = "note-cell";
    notesCell.textContent = speaker.notes || ""; // Display notes or an empty string if notes are not available
    row.appendChild(notesCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  tableContainer.appendChild(table);
  reportDiv.appendChild(tableContainer);
}

//Function to export the report
function exportReport() {
  const reportData = [];

  // Create an array of objects containing speaker data
  speakers.forEach((speaker) => {
    const speakerData = {
      name: speaker.name,
      counts: { ...speaker.counts }, // Create a copy of the counts object
    };
    reportData.push(speakerData);
  });

  // Convert the report data to a JSON string
  const reportJSON = JSON.stringify(reportData, null, 2);

  // Create a new anchor element for downloading the report
  const downloadAnchor = document.createElement("a");
  downloadAnchor.href = `data:text/json;charset=utf-8,${encodeURIComponent(reportJSON)}`;

  let now = new Date();
  let date = now.toLocaleDateString();
  let time = now.toLocaleTimeString();
  let currentDateTime = `Toastmasters ${date} ${time}.json`;
  downloadAnchor.download = currentDateTime;
  downloadAnchor.click();
}

//Function to import a report
function importReport() {
  document.getElementById("fileInput").click();
  document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log(jsonData);
          jsonData.forEach(function (speaker) {
            console.log(speaker);
            addSpeaker(speaker);
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  });
}

// Function to toggle the script text section
function toggleScript() {
  const scriptText = document.getElementById("scriptText");
  scriptText.classList.toggle("hidden");
}

// Event listener for the "Hide/Show Script" button
const toggleScriptBtn = document.getElementById("toggleScriptBtn");
toggleScriptBtn.addEventListener("click", toggleScript);

// Event listener for the "Add Speaker" button
const addSpeakerBtn = document.getElementById("addSpeakerBtn");
addSpeakerBtn.addEventListener("click", () => {
  addSpeaker("");

});

// Event listener for the "Export Report" button
const exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", exportReport);

// Event listener for the "Generate Report" button
const generateReportBtn = document.getElementById("generateReportBtn");
generateReportBtn.addEventListener("click", generateReport);

// Event listener for the "Import Report" button
const importReportBtn = document.getElementById("importReportBtn");
importReportBtn.addEventListener("click", () => {
  importReport();
});

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  speakers = [];
  renderSpeakers();
});
