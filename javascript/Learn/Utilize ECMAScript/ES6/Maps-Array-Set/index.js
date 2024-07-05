// Example of Array
let array = [1, 2, 3, 3, 4, 5];
console.log("Initial Array:", array);

// Example of Set
let set = new Set([1, 2, 3, 3, 4, 1, 5]);
console.log("Initial Set (only unique values):", set);

// Adding a new value to the Set
set.add(6);
console.log("Set after adding the value 6:", set);

// Removing a value from the Set
set.delete(2);
console.log("Set after removing the value 2:", set);

// Example of Map
let map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
console.log("Initial Map:", map);

// Accessing a value based on the key
console.log("Value of key 'a':", map.get('a'));

// Updating the value of a key
map.set('a', 10);
console.log("Map after updating the value of key 'a':", map);

// Checking if the Map contains the key 'b'
console.log("Map contains the key 'b':", map.has('b'));
