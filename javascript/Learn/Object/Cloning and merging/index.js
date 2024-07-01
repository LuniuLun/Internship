
let user = {
  name: "John",
  age: 30,
};
let clone = {}; // the new empty object

// TODO: let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it
console.log(user.name); // * still John in the original object

// * assign
let otherUser = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// TODO: copies all properties from permissions1 and permissions2 into user
Object.assign(otherUser, permissions1, permissions2);

// * now user = { name: "John", canView: true, canEdit: true }
console.log(otherUser.name); // John
console.log(otherUser.canView); // true
console.log(otherUser.canEdit); // true

// * Nested cloning: structuredClone
user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};
clone = Object.assign({}, user);
console.log(user.sizes === clone.sizes); // ! true, same object
// user and clone share sizes
user.sizes.width = 60; // change a property from one place
console.log(clone.sizes.width); // ! 60, get the result from the other one

let otherClone = structuredClone(user);
console.log(user.sizes === otherClone.sizes); // ! false, different objects
// user and otherClone are totally unrelated now
user.sizes.width = 70; // change a property from one place
console.log(otherClone.sizes.width); // ! 60, not related
