// Initialize the array to store data
var notes = [];
var edit_buttons = [];
var delete_buttons = [];
var cur_edit = 0;
var cur_delete = 0;
var count = 0;
// If the localstorage is empty, meaning we first come, initialize data
if (localStorage.getItem('notes') == null) {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('edit', JSON.stringify(edit_buttons));
    localStorage.setItem('delete', JSON.stringify(delete_buttons));
    localStorage.count = count;
}

// We try to initialize all document object by searching their id.
var add = document.getElementById("add-dialog");
var add_button = document.getElementById("alert3");
var add_save = document.getElementById("add-save");
var edit_save = document.getElementById("edit-save");
var delete_save = document.getElementById("delete-save");
var table = document.getElementById("crud-table");
var edit = document.getElementById("edit-dialog");
var Delete = document.getElementById("delete-dialog");

// Show the table if we refresh using localstorage
show();

// If click add, we show dialog for input
add_button.addEventListener ('click', function addMessage() {
    add.showModal();
    document.getElementById("add-title").value = '';
    document.getElementById("add-date").value = '';
    document.getElementById("add-summary").value = '';
});

// If click save for add, we store new info in localstorage, and call display for table
add_save.addEventListener ('click', function add_saveMessage() {
    notes = JSON.parse(localStorage.getItem('notes'));
    count = parseInt(localStorage.count);
    // We clean the data
    let clean1 = DOMPurify.sanitize(document.getElementById("add-title").value);
    let clean2 = DOMPurify.sanitize(document.getElementById("add-date").value);
    let clean3 = DOMPurify.sanitize(document.getElementById("add-summary").value);
    notes.push({
        'title' : clean1,
        'date' : clean2,
        'summary' : clean3
    });
    count++;
    localStorage.count = count;
    localStorage.setItem('notes', JSON.stringify(notes));
    display();
});

// If click save for edit, we modify the specific row using int cur_edit.
edit_save.addEventListener ('click', function edit_saveMessage() {
    var list = JSON.parse(localStorage.getItem('notes'));
    // We clean the data
    let clean1 = DOMPurify.sanitize(document.getElementById("edit-title").value);
    let clean2 = DOMPurify.sanitize(document.getElementById("edit-date").value);
    let clean3 = DOMPurify.sanitize(document.getElementById("edit-summary").value);
    list[cur_edit]['title'] = clean1;
    list[cur_edit]['date'] = clean2;
    list[cur_edit]['summary'] = clean3;
    
    //Update the table
    table.rows[cur_edit+1].cells[0].innerHTML = list[cur_edit]['title'];
    table.rows[cur_edit+1].cells[1].innerHTML = list[cur_edit]['date'];
    table.rows[cur_edit+1].cells[2].innerHTML = list[cur_edit]['summary'];
    localStorage.setItem('notes', JSON.stringify(list));
});

// If click save for delete, we delete that row.
delete_save.addEventListener ('click', function detele_saveMessage() {
   notes = JSON.parse(localStorage.getItem('notes'));
   edit_buttons = JSON.parse(localStorage.getItem('edit'));
   delete_buttons = JSON.parse(localStorage.getItem('delete'));
   
   //We need to decrease each array's size by one
   notes.splice(cur_delete, 1);
   edit_buttons.splice(cur_delete, 1);
   delete_buttons.splice(cur_delete, 1);
   localStorage.setItem('notes', JSON.stringify(notes));
   localStorage.setItem('edit', JSON.stringify(edit_buttons));
   localStorage.setItem('delete', JSON.stringify(delete_buttons));
   table.deleteRow(cur_delete+1);
});

// Function to add row to table
function display() {
    var list = JSON.parse(localStorage.getItem('notes'));
    count = parseInt(localStorage.count);
    // Index for table, x for id of buttons
    var index = list.length - 1;
    var x = count-1;
    var row = table.insertRow();

    // Update table with new row
    row.insertCell(0).innerHTML = list[index]['title'];
    row.insertCell(1).innerHTML = list[index]['date'];
    row.insertCell(2).innerHTML = list[index]['summary'];
    row.insertCell(3).innerHTML = `<button id='bt-edit${x}'>Edit</button>`;

    // add listener for edit button
    document.getElementById(`bt-edit${x}`).onclick = function reply_edit() {
        edit_buttons = JSON.parse(localStorage.getItem('edit'));
        cur_edit = edit_buttons.indexOf(this.id);
        document.getElementById("edit-title").value = table.rows[cur_edit+1].cells[0].innerHTML;
        document.getElementById("edit-date").value = table.rows[cur_edit+1].cells[1].innerHTML;
        document.getElementById("edit-summary").value = table.rows[cur_edit+1].cells[2].innerHTML;
        edit.showModal();
    };

    row.insertCell(4).innerHTML = `<button id='bt-delete${x}'>Delete</button>`;

    // add listener for delete button
    document.getElementById(`bt-delete${x}`).onclick = function reply_delete() {
        delete_buttons = JSON.parse(localStorage.getItem('delete'));
        cur_delete = delete_buttons.indexOf(this.id);
        Delete.showModal();
    };
    
    // We load the data into localstorage
    edit_buttons = JSON.parse(localStorage.getItem('edit'));
    delete_buttons = JSON.parse(localStorage.getItem('delete'));

    edit_buttons.push("bt-edit"+x);
    delete_buttons.push("bt-delete"+x);

    localStorage.setItem('edit', JSON.stringify(edit_buttons));
    localStorage.setItem('delete', JSON.stringify(delete_buttons));
}

// Function to show table result when refresh
function show() {
    notes = JSON.parse(localStorage.getItem('notes'));
    edit_buttons = JSON.parse(localStorage.getItem('edit'));
    delete_buttons = JSON.parse(localStorage.getItem('delete'));

    // Loop through all data in localstorage
    for (var i = 0; i < notes.length; i++) {
        var row = table.insertRow();

        // We update table
        row.insertCell(0).innerHTML = notes[i]['title'];
        row.insertCell(1).innerHTML = notes[i]['date'];
        row.insertCell(2).innerHTML = notes[i]['summary'];
        row.insertCell(3).innerHTML = `<button id=${edit_buttons[i]}>Edit</button>`;

        // add listener for edit
        document.getElementById(edit_buttons[i]).onclick = function reply_edit() {
            cur_edit = edit_buttons.indexOf(this.id);
            document.getElementById("edit-title").value = table.rows[cur_edit+1].cells[0].innerHTML;
            document.getElementById("edit-date").value = table.rows[cur_edit+1].cells[1].innerHTML;
            document.getElementById("edit-summary").value = table.rows[cur_edit+1].cells[2].innerHTML;
            edit.showModal();
        };

        // add listener for delete
        row.insertCell(4).innerHTML = `<button id=${delete_buttons[i]}>Delete</button>`;
        document.getElementById(delete_buttons[i]).onclick = function reply_delete() {
            cur_delete = delete_buttons.indexOf(this.id);;
            Delete.showModal();
        };
    }
}
