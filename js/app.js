console.log("Welcome to my Notes App");
showNotes();
//if user adds a note add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt"); //the textarea
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; //we are making an array notesObj which will store my notes
  } else {
    notesObj = JSON.parse(notes); //stored as object
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj)); //stringify because local storage me we have  to store as string only
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

//function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; //we are making an array notesObj which will store my notes
  } else {
    notesObj = JSON.parse(notes); //stored as object
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    //forEach because ye ek array hai
    html += `<div class=" noteCard my-2 mx-2 card" style="width: 18rem">
          
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1} </h5>
          <p class="card-text"> ${element} </p>
          <button id="${index}" onclick = "deleteNote(this.id)" class="btncolor btn"> Delete Note </button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else
    notesElm.innerHTML = `Nothing to show! Use Add a Note section to add notes. `;
}

//function to delete a Note
function deleteNote(index) {
  //  console.log("I am deleting" , index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; //we are making an array notesObj which will store my notes
  } else {
    notesObj = JSON.parse(notes); //stored as object
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//search functionality to filter notes

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});
