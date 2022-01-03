const tablesBox = document.querySelector(".tables");
const table = document.querySelector(".table");
const tableBtn = document.querySelector(".table>button");

const tableHiddenBtn = document.querySelector(".tableHiddenBtn");
const modiBtn = document.querySelector(".modi");

let disappear = false;
let modi = false;
let students = [];
let colorGreen = true;
const REDTABLE = "redTable";
const STUDENTS_KEY = "students";
const TABLEHIDDENBTN_KEY = "tableHiddenBtn";
const TABLECOLORCHANGEBTN_KEY = "tableColorChangeBtn";
const MODIONBTN_KEY = "modiOnBtn";
const MODI_KEY = "modi";

function modiOn() {
  if (modi === false) {
    modi = true;
  } else {
    modi = false;
  }
  modiBtnStyleChange();
}

function disappearOn() {
  if (disappear === false) {
    disappear = true;
  } else {
    disappear = false;
  }
  tableHidden();
}

function tableHidden() {
  if (disappear === true) {
    table.style.opacity = "0";
  } else {
    table.style.opacity = "1";
  }
}

function modiBtnStyleChange() {
  if (modi === true) {
    modiBtn.classList.add(MODIONBTN_KEY);
    localStorage.setItem(MODI_KEY, MODIONBTN_KEY);
    tableBtn.classList.add(TABLEHIDDENBTN_KEY);
    localStorage.setItem("tableButton_class", TABLEHIDDENBTN_KEY);
    tableBtn.classList.remove(TABLECOLORCHANGEBTN_KEY);
    localStorage.removeItem(TABLECOLORCHANGEBTN_KEY);
    location.reload();
  } else {
    modiBtn.classList.remove(MODIONBTN_KEY);
    localStorage.removeItem(MODI_KEY);
    tableBtn.classList.add(TABLECOLORCHANGEBTN_KEY);
    localStorage.setItem("tableButton_class", TABLECOLORCHANGEBTN_KEY);
    tableBtn.classList.remove(TABLEHIDDENBTN_KEY);
    localStorage.removeItem(TABLEHIDDENBTN_KEY);
    location.reload();
  }
}

if (table.style.opacity == "0") {
  disappear = true;
}

modiBtn.addEventListener("click", modiOn);

const savedModiOnBtn = localStorage.getItem(MODI_KEY);
const savedtableButton = localStorage.getItem("tableButton_class");

if (savedModiOnBtn !== null) {
  modiBtn.classList.add(savedModiOnBtn);
  modi = true;
}
if (savedtableButton !== null) {
  tableBtn.classList.add(savedtableButton);
}
if (modi === true) {
  tableBtn.classList.remove(TABLECOLORCHANGEBTN_KEY);
  const tableHiddenBtn = document.querySelector(".tableHiddenBtn");
  tableHiddenBtn.addEventListener("click", disappearOn);
}

function colorChange() {
  if (colorGreen !== true) {
    location.reload();
    table.classList.remove(REDTABLE);
    localStorage.removeItem(REDTABLE);
    deleteUl();
    deleteForm();
    colorGreen = true;
  } else {
    localStorage.setItem(REDTABLE, REDTABLE);
    table.classList.add(REDTABLE);
    colorGreen = false;

    const form = document.createElement("form");
    const input = document.createElement("input");
    input.placeholder = "학생 이름";
    form.classList.add("studentId");
    input.classList.add("studentIdInput");
    table.appendChild(form);
    form.appendChild(input);

    form.addEventListener("submit", saveStudent);
  }
}

function saveStudent(event) {
  event.preventDefault();
  const studentForm = document.querySelector(".studentId");
  const studentInput = document.querySelector(".studentIdInput");

  if (studentInput.placeholder === "학생 이름") {
    studentName = studentInput.value;
    studentInput.value = "";
    studentInput.placeholder = "학생 학번";
  } else if (studentInput.placeholder === "학생 학번") {
    studentId = studentInput.value;
    studentInput.value = "";
    table.id = studentId;
    studentInput.placeholder = "결석 사유";
  } else if (studentInput.placeholder === "결석 사유") {
    studentReason = studentInput.value;
    studentInput.value = "";
    table.id = Date.now();
    localStudent();
  }
  if (studentInput.placeholder === "결석 사유") {
    studentForm.addEventListener("submit", deleteForm);
  }
}

function localStudent() {
  const studentObj = {
    tableId: table.id,
    name: studentName,
    id: studentId,
    reason: studentReason,
  };
  students.push(studentObj);
  paintSpan(studentObj);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function paintSpan(newStudent) {
  const ul = document.createElement("ul");
  ul.id = newStudent.tableId;
  const liName = document.createElement("li");
  liName.innerHTML = newStudent.name;
  const liId = document.createElement("li");
  liId.innerHTML = newStudent.id;
  const liReason = document.createElement("li");
  liReason.innerHTML = newStudent.reason;

  table.appendChild(ul);
  ul.appendChild(liName);
  ul.appendChild(liId);
  ul.appendChild(liReason);
}
function deleteForm() {
  const studentForm = document.querySelector(".studentId");
  const studentInput = document.querySelector(".studentIdInput");
  studentForm.remove();
  studentInput.remove();
}
function deleteUl() {
  const ul = document.querySelector(".table>ul");
  ul.remove();
  students = [];
  localStorage.removeItem(STUDENTS_KEY);
}
const savedRedTable = localStorage.getItem(REDTABLE);
const savedStudents = localStorage.getItem(STUDENTS_KEY);

if (savedRedTable !== null) {
  colorGreen = false;
  table.classList.add(REDTABLE);
} else {
  colorGreen = true;
}
if (savedStudents !== null) {
  const parsedStudents = JSON.parse(savedStudents);
  students = parsedStudents;
  parsedStudents.forEach(paintSpan);
}

const tableColorChangeBtn = document.querySelector(".tableColorChangeBtn");
tableColorChangeBtn.addEventListener("click", colorChange);
