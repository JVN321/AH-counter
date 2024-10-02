let speakers = [];
let words_string = "Ah Um Er Well So Like But Repeats Other";
var words = {};

words_string = words_string.split(" ");
words_string.forEach(function (word) {
  words[String(word)] = 0;
});
console.log(words);
function addSpeaker() {
  console.log(words)
  const speaker = {
    name: "",
    counts: words

  };

  speakers.push(speaker);
  renderSpeakers();
}

// Function to render speaker entries on the page
function renderSpeakers() {
  const speakersDiv = document.getElementById("speakers");
  speakersDiv.innerHTML = "";

  speakers.forEach((speaker, index) => {
    const speakerDiv = document.createElement("div");
    speakerDiv.className = "speaker-entry";

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
        countDisplay.textContent = speaker.counts[word];
      });
      const dincrementButton = document.createElement("button");
      dincrementButton.textContent = "-";
      dincrementButton.className = "button-primary";
      dincrementButton.addEventListener("click", () => {
        speaker.counts[word]--;
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

function generateReport_old() {
  if (!speakers.length) {
    alert("Add Speaker first");
    return;
  }

  const reportDiv = document.getElementById("report");
  reportDiv.innerHTML = "";

  const table = document.createElement("table");
  table.className = "report-table";

  // Table header
  const headerRow = document.createElement("tr");

  const nameHeader = document.createElement("th");
  nameHeader.textContent = "Name";
  headerRow.appendChild(nameHeader);

  for (const word in speakers[0].counts) {
    const wordHeader = document.createElement("th");
    wordHeader.textContent = word;
    headerRow.appendChild(wordHeader);
  }

  const notesHeader = document.createElement("th");
  notesHeader.textContent = "Notes";
  headerRow.appendChild(notesHeader);

  table.appendChild(headerRow);

  // Table rows for each speaker
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

    const notesCell = document.createElement("td");
    notesCell.className = "note-cell";
    notesCell.textContent = speaker.notes || ""; // Display notes or an empty string if notes are not available
    row.appendChild(notesCell);

    let lastCell = document.createElement("td");
    lastCell.textContent = " ";
    row.appendChild(lastCell);

    table.appendChild(row);
  });

  reportDiv.appendChild(table);
}

// Function to export the report
// function exportReport() {
//   const reportData = [];

//   // Create an array of objects containing speaker data
//   speakers.forEach((speaker) => {
//     const speakerData = {
//       name: speaker.name,
//       counts: { ...speaker.counts } // Create a copy of the counts object
//     };
//     reportData.push(speakerData);
//   });

//   // Convert the report data to a JSON string
//   const reportJSON = JSON.stringify(reportData, null, 2);

//   // Create a new anchor element for downloading the report
//   const downloadAnchor = document.createElement("a");
//   downloadAnchor.href = `data:text/json;charset=utf-8,${encodeURIComponent(
//     reportJSON
//   )}`;
//   downloadAnchor.download = "report.json";
//   downloadAnchor.click();
// }

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
addSpeakerBtn.addEventListener("click", addSpeaker);

// Event listener for the "Export Report" button
// const exportBtn = document.getElementById("exportBtn");
// exportBtn.addEventListener("click", exportReport);

// Event listener for the "Generate Report" button
const generateReportBtn = document.getElementById("generateReportBtn");
generateReportBtn.addEventListener("click", generateReport);
