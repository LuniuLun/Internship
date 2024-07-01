// VAR
console.log(varVariable); // undefined (do hoisting)
var varVariable = "This is a var variable";
console.log(varVariable); // 'This is a var variable'

function varTest() {
  var varVariable = "Inside function";
  console.log(varVariable); // 'Inside function'
}
varTest();
console.log(varVariable); // 'This is a var variable'

if (true) {
  var varVariable = "Inside block";
  console.log(varVariable); // 'Inside block'
}
console.log(varVariable); // 'Inside block' (no block scope)

// LET
try {
  console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
} catch (e) {
  console.log(e.message);
}
let letVariable = "This is a let variable";
console.log(letVariable); // 'This is a let variable'

function letTest() {
  let letVariable = "Inside function";
  console.log(letVariable); // 'Inside function'
}
letTest();
console.log(letVariable); // 'This is a let variable'

if (true) {
  let letVariable = "Inside block";
  console.log(letVariable); // 'Inside block'
}
console.log(letVariable); // 'This is a let variable' (block scope)

// CONST
try {
  console.log(constVariable); // ReferenceError: Cannot access 'constVariable' before initialization
} catch (e) {
  console.log(e.message);
}
const constVariable = "This is a const variable";
console.log(constVariable); // 'This is a const variable'

try {
  constVariable = "Trying to change"; // TypeError: Assignment to constant variable.
} catch (e) {
  console.log(e.message);
}

function constTest() {
  const constVariable = "Inside function";
  console.log(constVariable); // 'Inside function'
}
constTest();
console.log(constVariable); // 'This is a const variable'

if (true) {
  const constVariable = "Inside block";
  console.log(constVariable); // 'Inside block'
}
console.log(constVariable); // 'This is a const variable' (block scope)

// const with object
const constObject = { key: "value" };
console.log(constObject); // { key: 'value' }

constObject.key = "new value";
console.log(constObject); // { key: 'new value' }

try {
  constObject = { newKey: "newValue" }; // TypeError: Assignment to constant variable.
} catch (e) {
  console.log(e.message);
}

// OBJECT
const car = {
  brand: {
    name: "Ford",
  },
  color: "blue",
};

console.log(car.brand.name);
console.log(car["brand"]["name"]);
console.log(car.brand["name"]);
console.log(car["brand"].name);
