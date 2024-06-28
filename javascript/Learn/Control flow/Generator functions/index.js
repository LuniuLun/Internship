function* mySecondaryGenerator() {
  yield "Thirst";
  yield "Fourth";
}

function* myGeneratorFunction() {
  console.log("Start of the generator function.");
  yield "First";
  console.log("Second part of the generator function.");
  yield "Second";
  const firstYield = yield;
  const secondYield = yield firstYield + 100;
  yield secondYield + 10;
  yield* mySecondaryGenerator();
}
const myGeneratorObject = myGeneratorFunction();

console.log(myGeneratorObject);
// > Generator {  }

console.log(typeof myGeneratorObject);
// > "object"

console.log(myGeneratorObject.next());
// > Object { value: "First", done: false }

console.log(myGeneratorObject.next());
// > Object { value: "Second", done: false }

console.log(myGeneratorObject.next());
// > Object { value: undefined, done: false }

console.log(myGeneratorObject.next( 10 )); // Can be thought of as changing the value of the `firstYield` variable to `10
// > Object { value: 110, done: false }

console.log(myGeneratorObject.next( 20 )); // Can be thought of as changing the value of the `secondYield` variable to `20`, _not_ `20 + 100;`
// > Object { value: 30, done: false }

console.log(myGeneratorObject.next());
// > Object { value: "Thirst", done: false }

console.log(myGeneratorObject.next());
// > Object { value: "Fourth", done: false }

console.log(myGeneratorObject.next());
// > Object { value: undefined, done: true }
