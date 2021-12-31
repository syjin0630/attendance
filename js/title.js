const title = document.body.querySelector("h1");
const dateBox = title.querySelector("date");
const gradeForm = title.querySelector(".grade");
const gradeInput = gradeForm.querySelector("input");
const classForm = title.querySelector(".class");
const classInput = classForm.querySelector("input");
const gradeSpan = title.querySelector(".grade_span");
const classSpan = title.querySelector(".class_span");

const HIDDEN_CLASSNAME = "hidden";
const GRADE_KEY = "grade";
const CLASS_KEY = "class";

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dateNumber = String(date.getDate()).padStart(2, "0");
  let day = date.getDay();

  if (day === 1) {
    day = "MON";
  } else if (day === 2) {
    day = "TUE";
  } else if (day === 3) {
    day = "WED";
  } else if (day === 4) {
    day = "THU";
  } else if (day === 5) {
    day = "FRI";
  } else if (day === 6) {
    day = "SAT";
  } else if (day === 0) {
    day = "SUN";
  }

  dateBox.innerHTML = `${year}.${month}.${dateNumber}.${day}❤️ `;
}
getDate();
setInterval(getDate, 86400000);

function seeGradeForm() {
  localStorage.removeItem(GRADE_KEY);
  location.reload();
  gradeForm.classList.remove(HIDDEN_CLASSNAME);
  gradeInput.classList.remove(HIDDEN_CLASSNAME);
  gradeSpan.classList.add(HIDDEN_CLASSNAME);
}
function gradePush() {
  const grade = gradeInput.value;
  gradeInput.value = "";
  localStorage.setItem(GRADE_KEY, grade);

  paintingGrade(grade);
}
function paintingGrade(grade) {
  gradeForm.classList.add(HIDDEN_CLASSNAME);
  gradeInput.classList.add(HIDDEN_CLASSNAME);
  gradeSpan.innerText = grade;
  gradeSpan.classList.remove(HIDDEN_CLASSNAME);
}
function seeClassForm() {
  localStorage.removeItem(CLASS_KEY);
  location.reload();
  classForm.classList.remove(HIDDEN_CLASSNAME);
  classInput.classList.remove(HIDDEN_CLASSNAME);
  classSpan.classList.add(HIDDEN_CLASSNAME);
}
function classPush() {
  const class_n = classInput.value;
  classInput.value = "";

  localStorage.setItem(CLASS_KEY, class_n);

  paintingClass(class_n);
}
function paintingClass(class_n) {
  classForm.classList.add(HIDDEN_CLASSNAME);
  classInput.classList.add(HIDDEN_CLASSNAME);
  classSpan.innerText = `­ ${class_n}`;
  classSpan.classList.remove(HIDDEN_CLASSNAME);
}

const savedGradeNumner = localStorage.getItem(GRADE_KEY);
const savedClassNumner = localStorage.getItem(CLASS_KEY);

if (savedGradeNumner !== null) {
  paintingGrade(savedGradeNumner);
  gradeSpan.addEventListener("click", seeGradeForm);
} else {
  gradeForm.addEventListener("submit", gradePush);
}

if (savedClassNumner !== null) {
  paintingClass(savedClassNumner);
  classSpan.addEventListener("click", seeClassForm);
} else {
  classForm.addEventListener("submit", classPush);
}
