function addTodo() {
  // reading values from input fields
  var iname = myform.iname.value;
  var category = myform.category.value;
  var priority = myform.priority.value;

  if (iname.trim() === "" || category.trim() === "" || priority.trim() === "") {
    return;
  }

  var today = new Date();
  var dd = today.getDate() <= 9 ? "0" + today.getDate() : today.getDate();
  var month =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  var year = today.getFullYear();

  today = `${dd}/${month}/${year}`;

  var data = localStorage.getItem("todolist");
  data = data ? data.split(",") : [];

  data.push(iname, category, priority, today);

  localStorage.setItem("todolist", data.toString());

  // append data to table
  createTable();

  // form reset
  formClear();
}

function createTable() {
  var data = localStorage.getItem("todolist").split(",");

  var table = document.getElementById("todotbl");

  var row = table.insertRow();
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  var cell3 = row.insertCell();
  var cell4 = row.insertCell();
  var cell5 = row.insertCell();

  for (let i = 0; i < data.length; i += 4) {
    cell1.innerHTML = data[i];
    cell2.innerHTML = data[i + 1];
    cell3.innerHTML = data[i + 2];
    cell4.innerHTML = data[i + 3];
  }

  var btn = document.createElement("button");
  var txt = document.createTextNode("Delete");
  btn.appendChild(txt);
  btn.setAttribute("onclick", "bdelete(this)");
  btn.setAttribute("class", "btn btn-danger");
  cell5.appendChild(btn);

  var btn = document.createElement("button");
  var txt = document.createTextNode("Update");
  btn.appendChild(txt);
  btn.setAttribute("onclick", "bupdate(this)");
  btn.setAttribute("class", "btn btn-info");
  cell5.appendChild(btn);
}

function formClear() {
  document.getElementById("todoForm").reset();
}

window.onload = function () {
  var data = localStorage.getItem("todolist").split(",");

  if (data.length === 0 || data[0].trim() === "") {
    return;
  }

  for (let i = 0; i < data.length; i += 4) {
    var table = document.getElementById("todotbl");

    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();

    cell1.innerHTML = data[i];
    cell2.innerHTML = data[i + 1];
    cell3.innerHTML = data[i + 2];
    cell4.innerHTML = data[i + 3];

    var btn = document.createElement("button");
    var txt = document.createTextNode("Delete");
    btn.appendChild(txt);
    btn.setAttribute("onclick", "bdelete(this)");
    btn.setAttribute("class", "btn btn-danger");
    cell5.appendChild(btn);

    var btn = document.createElement("button");
    var txt = document.createTextNode("Modify");
    btn.appendChild(txt);
    btn.setAttribute("onclick", "bmodify(this)");
    btn.setAttribute("class", "btn btn-info");
    cell5.appendChild(btn);
  }
};

function bdelete(row) {
  var table = document.getElementById("todotbl");
  var index = row.parentNode.parentNode.rowIndex;
  table.deleteRow(index);

  var data = localStorage.getItem("todolist").split(",");
  data.splice((index - 1) * 4, 4);
  localStorage.setItem("todolist", data.toString());
}

function bmodify(row) {
  document
    .getElementById("btnupdate")
    .setAttribute("class", "d-inline-block btn btn-primary");
  var idx = row.parentNode.parentNode.rowIndex;
  localStorage.setItem("ino", idx);
  var table = document.getElementById("todotbl");
  document.getElementById("iname").value = table.rows[idx].cells[0].innerHTML;
  document.getElementById("category").value =
    table.rows[idx].cells[1].innerHTML;
  document.getElementById("priority").value =
    table.rows[idx].cells[2].innerHTML;
  document.getElementById("btnupdate").setAttribute("onclick", "bupdate()");
}

function bupdate() {
  var idx = localStorage.getItem("ino");
  var table = document.getElementById("todotbl");
  table.rows[idx].cells[0].innerHTML = myform.iname.value;
  table.rows[idx].cells[1].innerHTML = myform.category.value;
  table.rows[idx].cells[2].innerHTML = myform.priority.value;
  document.getElementById("btnupdate").setAttribute("class", "d-none");

  var data = localStorage.getItem("todolist").split(",");
  var i = (idx - 1) * 4;
  data[i] = myform.iname.value;
  data[i + 1] = myform.category.value;
  data[i + 2] = myform.priority.value;
  localStorage.setItem("todolist", data.toString());

  formClear();
}
