function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

        if(username == "admin" && password == "admin") {
            alert("Login sucessfully");
            window.location.href="/index.html";
            return false;
        } else {
            alert("Wrong username or password");
        }
}

// showNotes function to display notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesElm = document.getElementById("notes");
  
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    let html = "";
  
    notesObj.forEach(function (element, index) {
      html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
          </div>
        </div>`;
    });
  
    if (notesObj.length != 0) {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
  }
  
  // addBtn click event handler to add notes to localStorage
  let addBtn = document.getElementById("addButton");
  addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
  
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
  
    showNotes();
  });
  
  // deleteNote function to delete a note from localStorage
  function deleteNote(index) {
    let notes = localStorage.getItem("notes");
  
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index, 1);
  
    localStorage.setItem("notes", JSON.stringify(notesObj));
  
    showNotes();
  }
  
  showNotes();