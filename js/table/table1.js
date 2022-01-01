const tablesBox = document.querySelector(".tables");
const table = tablesBox.querySelector(".table");

let colorGreen = true;
const REDTABLE = "redTable";

function colorChange() {
  if (colorGreen !== true) {
    table.classList.remove(REDTABLE);
    localStorage.removeItem(REDTABLE);
    colorGreen = true;
  } else {
    localStorage.setItem(REDTABLE, REDTABLE);
    table.classList.add(REDTABLE);
    colorGreen = false;
  }
}
const savedRedTable = localStorage.getItem(REDTABLE);

if (savedRedTable !== null) {
  colorGreen = false;
  table.classList.add(REDTABLE);
} else {
  colorGreen = true;
}

table.addEventListener("click", colorChange);
