const myMock = jest.fn();
console.log(myMock()); // This call will print 'undefined' because the mock has no defined behavior yet.

myMock
  .mockReturnValueOnce(10) // First call will return 10
  .mockReturnValueOnce("x") // Second call will return 'x'
  .mockReturnValue(true); // All subsequent calls will return true

// Wrapping the example in a Jest test
test("mock function should return specified values in order", () => {
  expect(myMock()).toBe(10); // First call returns 10
  expect(myMock()).toBe("x"); // Second call returns 'x'
  expect(myMock()).toBe(true); // Third call returns true
  expect(myMock()).toBe(true); // Fourth call also returns true
});
