const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances); // > [ <a> ]

test("myMock1 should record instances", () => {
  expect(myMock1.mock.instances.length).toBe(1);
});

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts); // > [ <b> ]

test("myMock2 should record contexts", () => {
  expect(myMock2.mock.contexts[0]).toBe(b);
});
