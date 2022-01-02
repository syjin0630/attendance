const tablesBox = document.querySelector(".tables");
const table = tablesBox.querySelector(".table");
const tableBtn = table.querySelector(".tableBtn");
const modiBtn = document.querySelector(".modi");

let disappear = false;
let modiOn = false;
let students = [];
let colorGreen = true;
const REDTABLE = "redTable";
const STUDENTS_KEY = "students";

//modi 버튼 눌러진 상태에서 table 클릭하면 table 안 보이게 하기

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

tableBtn.addEventListener("click", colorChange);
