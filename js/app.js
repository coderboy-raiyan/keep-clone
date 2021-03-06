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
  let notesInputValue = notesInput.innerText;
  let titleInputValue = titleInput.innerText;
  if (notesInputValue == "" && titleInputValue == "") {
    console.log("Type a note please");
    notePlacehold.classList.remove("d-none");
    titlePlacehold.classList.remove("d-none");
  } else {
    // console.log(notesInputValue);
    // console.log(titleInputValue);
    createDivNotes(titleInputValue, notesInputValue);
    addLocal(titleInputValue, notesInputValue);
    notePlacehold.classList.remove("d-none");
    titlePlacehold.classList.remove("d-none");
  }

  notesInput.textContent = "";
  titleInput.textContent = "";
}

//creat the notes in div
function createDivNotes(titleInput, notesInput) {
  let col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-4 main-col";
  col.innerHTML = `
  <div class="card animate__animated animate__fadeInDown main-card" style="width: 100%; height: 100%">
            <div class="card-body">
              <h5 class="card-title note-title"  contenteditable="true">${titleInput}</h5>
              <p class="card-text note-descrip"  contenteditable="true">
               ${notesInput}
              </p>
              <button class="btn btn-warning" id="btn-delete">Delete</button>
            </div>
          </div>
  `;
  allNotes.appendChild(col);

  //If Some one types without notes title
  let cardtitle = col.querySelector(".card-title");
  if (cardtitle.innerHTML === "") {
    cardtitle.innerHTML = "Empty";
  }
  // Delete Notes
  let delBtn = col.querySelector("#btn-delete");
  delBtn.addEventListener("click", () => {
    col.classList.add("del-tran");
    let keyNotes = getLocal();
    let myNew = keyNotes.filter((keyNote) => keyNote.title !== titleInput);
    localStorage.setItem("userNotes", JSON.stringify(myNew));
    col.remove();
  });
}
// Local storage
let getLocal = () => {
  let userNotes = localStorage.getItem("userNotes");
  let notes = [];
  if (userNotes) {
    notes = JSON.parse(userNotes);
  } else {
    userNotes;
  }
  return notes;
};

let addLocal = (inputTitle, notes) => {
  let keyNotes = getLocal();
  let notesObj = {};
  notesObj.title = inputTitle;
  notesObj.des = notes;
  keyNotes.push(notesObj);
  localStorage.setItem("userNotes", JSON.stringify(keyNotes));
};

let showLocalUI = () => {
  let keyNotes = getLocal();
  keyNotes.forEach((element) => {
    createDivNotes(element.title, element.des);
  });
};
showLocalUI();

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
