// move all text into <span>
// they occupy exactly the place necessary for the text,
for (let li of tree.querySelectorAll("li")) {
  let span = document.createElement("span");
  li.prepend(span);
  span.append(span.nextSibling); // move the text node into span
}

// catch clicks on whole tree
tree.onclick = function (event) {
  if (event.target.tagName != "SPAN") {
    return;
  }

  let childrenContainer = event.target.parentNode.querySelector("ul");
  if (!childrenContainer) return; // no children

  childrenContainer.hidden = !childrenContainer.hidden;
};
