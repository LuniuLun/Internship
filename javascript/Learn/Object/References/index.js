let user = { name: "John" };
let admin = user;
admin.name = "Pete"; // changed by the "admin" reference
console.log(user.name); // ! 'Pete', changes are seen from the "user" reference

let a = {};
let b = a; // copy the reference
console.log(a == b); // true, both variables reference the same object
console.log(a === b); // true

let c = {};
let d = {}; // two independent objects
console.log(c == d); // ! false

