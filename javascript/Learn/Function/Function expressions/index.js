function defer(f, ms) {
  return function () {
    // ! Arrow functions also have no arguments variable.
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert("Hello, " + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
