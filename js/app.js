const notesInput = document.querySelector(".note-input");
const notePlacehold = document.querySelector(".placeholder");
const titleInput = document.querySelector(".title-input");
const titlePlacehold = document.querySelector(".title-placeholder");
const saveNoteBtn = document.querySelector(".save-btn");
const allNotes = document.querySelector(".all-notes");
// Functional starts here
function togglePalceholder(inputBoxs, inputPlaceHolders) {
  let inputBox = inputBoxs.innerHTML.replace(/(<([^>]+)>)/gi, "");
  if (inputBox.length > 0) {
    inputPlaceHolders.classList.add("d-none");
  } else {
    inputPlaceHolders.classList.remove("d-none");
  }
}

// Get the data from notesInput
function getNotes() {
  let notesInputValue = notesInput.innerHTML;
  let titleInputValue = titleInput.innerHTML;
  if (notesInputValue == "" && titleInputValue == "") {
    console.log("Type a note please");
    notePlacehold.classList.remove("d-none");
    titlePlacehold.classList.remove("d-none");
  } else {
    // console.log(notesInputValue);
    // console.log(titleInputValue);
    createDivNotes(titleInputValue, notesInputValue);
    notePlacehold.classList.remove("d-none");
    titlePlacehold.classList.remove("d-none");
  }

  notesInput.textContent = "";
  titleInput.textContent = "";
}

//creat the notes in div
function createDivNotes(titleInput, notesInput) {
  console.log(titleInput, notesInput);
  let col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-4";
  col.innerHTML = `
  <div class="card animate__animated animate__fadeInDown" style="width: 100%; height: 100%">
            <div class="card-body">
              <h5 class="card-title">${titleInput}</h5>
              <p class="card-text">
               ${notesInput}
              </p>
              <button class="btn btn-warning">Delete</button>
            </div>
          </div>
  `;
  allNotes.appendChild(col);
}

// Event tiggers
notesInput.addEventListener("keyup", function () {
  togglePalceholder(notesInput, notePlacehold);
});
titleInput.addEventListener("keyup", function () {
  togglePalceholder(titleInput, titlePlacehold);
});

saveNoteBtn.addEventListener("click", function () {
  getNotes();
});
