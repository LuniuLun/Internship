let selectedTd;

document.querySelector("table").onclick = function (event) {
  let td = event.target.closest("td");

  if (!td) return;

  if (!this.contains(td)) return;

  highlight(td);
};

function highlight(td) {
  if (selectedTd) {
    selectedTd.classList.remove("highlight");
  }
  selectedTd = td;
  selectedTd.classList.add("highlight");
}
