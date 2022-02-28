// Initialize the array to store data
var notes = [];
var edit_buttons = [];
var delete_buttons = [];
var cur_edit = 0;
var cur_delete = 0;
var count = 0;
// If the localstorage is empty, meaning we first come, initialize data
if (localStorage.getItem('notes2') == null) {
    localStorage.setItem('notes2', JSON.stringify(notes));
    localStorage.setItem('edit2', JSON.stringify(edit_buttons));
    localStorage.setItem('delete2', JSON.stringify(delete_buttons));
    localStorage.count = count;
}

// We try to initialize all document object by searching their id.
var add = document.getElementById("add-dialog2");
var add_button = document.getElementById("alert4");
var add_save = document.getElementById("add-save2");
var edit_save = document.getElementById("edit-save2");
var delete_save = document.getElementById("delete-save2");
var table = document.getElementById("crud-table2");
var edit = document.getElementById("edit-dialog2");
var Delete = document.getElementById("delete-dialog2");

// Show the table if we refresh using localstorage
show();

// If click add, we show dialog for input
add_button.addEventListener ('click', function addMessage() {
    add.showModal();
    document.getElementById("add-title2").value = '';
    document.getElementById("add-date2").value = '';
    document.getElementById("add-summary2").value = '';
});

// If click save for add, we store new info in localstorage, and call display for table
add_save.addEventListener ('click', function add_saveMessage() {
    notes = JSON.parse(localStorage.getItem('notes2'));
    count = parseInt(localStorage.count);
    // We clean the data
    let clean1 = DOMPurify.sanitize(document.getElementById("add-title2").value);
    let clean2 = DOMPurify.sanitize(document.getElementById("add-date2").value);
    let clean3 = DOMPurify.sanitize(document.getElementById("add-summary2").value);
    notes.push({
        'title' : clean1,
        'date' : clean2,
        'summary' : clean3
    });
    count++;
    localStorage.count = count;
    localStorage.setItem('notes2', JSON.stringify(notes));
    display();
});

// If click save for edit, we modify the specific row using int cur_edit.
edit_save.addEventListener ('click', function edit_saveMessage() {
    var list = JSON.parse(localStorage.getItem('notes2'));

    // We clean the data
    let clean1 = DOMPurify.sanitize(document.getElementById("edit-title2").value);
    let clean2 = DOMPurify.sanitize(document.getElementById("edit-date2").value);
    let clean3 = DOMPurify.sanitize(document.getElementById("edit-summary2").value);
    list[cur_edit]['title'] = clean1;
    list[cur_edit]['date'] = clean2;
    list[cur_edit]['summary'] = clean3;
    
    //Update the table
    table.rows[cur_edit+1].cells[0].innerHTML = list[cur_edit]['title'];
    table.rows[cur_edit+1].cells[1].innerHTML = list[cur_edit]['date'];
    table.rows[cur_edit+1].cells[2].innerHTML = list[cur_edit]['summary'];
    localStorage.setItem('notes2', JSON.stringify(list));
});

// If click save for delete, we delete that row.
delete_save.addEventListener ('click', function detele_saveMessage() {
   notes = JSON.parse(localStorage.getItem('notes2'));
   edit_buttons = JSON.parse(localStorage.getItem('edit2'));
   delete_buttons = JSON.parse(localStorage.getItem('delete2'));

   //We need to decrease each array's size by one
   notes.splice(cur_delete, 1);
   edit_buttons.splice(cur_delete, 1);
   delete_buttons.splice(cur_delete, 1);
   localStorage.setItem('notes2', JSON.stringify(notes));
   localStorage.setItem('edit2', JSON.stringify(edit_buttons));
   localStorage.setItem('delete2', JSON.stringify(delete_buttons));
   table.deleteRow(cur_delete+1);
});

// Function to add row to table
function display() {
    var list = JSON.parse(localStorage.getItem('notes2'));
    count = parseInt(localStorage.count);

    // Index for table, x for id of buttons
    var index = list.length - 1;
    var x = count-1;
    var row = table.insertRow();

    // Update table with new row
    row.insertCell(0).innerHTML = list[index]['title'];
    row.insertCell(1).innerHTML = list[index]['date'];
    row.insertCell(2).innerHTML = list[index]['summary'];
    row.insertCell(3).innerHTML = `<button id='bt-edit${x}' class='edit_b'><img src="pencil.jpeg"/></button>`;
    document.getElementById(`bt-edit${x}`).onclick = function reply_edit() {
        edit_buttons = JSON.parse(localStorage.getItem('edit2'));
        cur_edit = edit_buttons.indexOf(this.id);
        
         // add listener for edit button
        document.getElementById("edit-title2").value = table.rows[cur_edit+1].cells[0].innerHTML;
        document.getElementById("edit-date2").value = table.rows[cur_edit+1].cells[1].innerHTML;
        document.getElementById("edit-summary2").value = table.rows[cur_edit+1].cells[2].innerHTML;
        edit.showModal();
    };
    
    // add listener for delete button
    row.insertCell(4).innerHTML = `<button id='bt-delete${x}' class='delete_b'><img src="trash.png"/></button>`;
    document.getElementById(`bt-delete${x}`).onclick = function reply_delete() {
        delete_buttons = JSON.parse(localStorage.getItem('delete2'));
        cur_delete = delete_buttons.indexOf(this.id);
        Delete.showModal();
    };
    
    // We load the data into localstorage
    edit_buttons = JSON.parse(localStorage.getItem('edit2'));
    delete_buttons = JSON.parse(localStorage.getItem('delete2'));

    edit_buttons.push("bt-edit"+x);
    delete_buttons.push("bt-delete"+x);

    localStorage.setItem('edit2', JSON.stringify(edit_buttons));
    localStorage.setItem('delete2', JSON.stringify(delete_buttons));
}

// Function to show table result when refresh
function show() {
    notes = JSON.parse(localStorage.getItem('notes2'));
    edit_buttons = JSON.parse(localStorage.getItem('edit2'));
    delete_buttons = JSON.parse(localStorage.getItem('delete2'));

    // Loop through all data in localstorage
    for (var i = 0; i < notes.length; i++) {
        var row = table.insertRow();

        // We update table
        row.insertCell(0).innerHTML = notes[i]['title'];
        row.insertCell(1).innerHTML = notes[i]['date'];
        row.insertCell(2).innerHTML = notes[i]['summary'];
        row.insertCell(3).innerHTML = `<button id=${edit_buttons[i]} class='edit_b'><img src="pencil.jpeg"/></button>`;

        // add listener for edit
        document.getElementById(edit_buttons[i]).onclick = function reply_edit() {
            cur_edit = edit_buttons.indexOf(this.id);
            document.getElementById("edit-title2").value = table.rows[cur_edit+1].cells[0].innerHTML;
            document.getElementById("edit-date2").value = table.rows[cur_edit+1].cells[1].innerHTML;
            document.getElementById("edit-summary2").value = table.rows[cur_edit+1].cells[2].innerHTML;
            edit.showModal();
        };

        // add listener for delete
        row.insertCell(4).innerHTML = `<button id=${delete_buttons[i]} class='delete_b'><img src="trash.png"/></button>`;
        document.getElementById(delete_buttons[i]).onclick = function reply_delete() {
            cur_delete = delete_buttons.indexOf(this.id);;
            Delete.showModal();
        };
    }
}