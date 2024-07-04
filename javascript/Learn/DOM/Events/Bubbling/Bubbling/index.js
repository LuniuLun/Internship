document.getElementById("myForm").onclick = function (event) {
  event.preventDefault();
  console.log("event.target:", event.target); // The element is actually pressed
  console.log("this:", this); // The element is having an event handler
};
