const myPrototype = { protoProperty: true };
const myObject = Object.create(myPrototype, {
  myProperty: {
    value: true,
    enumerable: true,
  },
});
console.log(myObject);
for (const myKey in myObject) {
  const myValue = myObject[myKey];
  console.log(`${myKey} : ${myValue}`);
}


