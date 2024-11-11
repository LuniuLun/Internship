import { forEach } from "../components/forEach";

const mockCallback = jest.fn((x) => 42 + x);

test("forEach mock function", () => {
  forEach([0, 1], mockCallback);

  // Hàm mock được gọi hai lần
  expect(mockCallback.mock.calls).toHaveLength(2);
  console.log(mockCallback.mock.calls);

  // Đối số đầu tiên của lần gọi đầu tiên là 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // Đối số đầu tiên của lần gọi thứ hai là 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // Giá trị trả về của lần gọi đầu tiên là 42
  expect(mockCallback.mock.results[0].value).toBe(42);

  // Giá trị trả về của lần gọi thứ hai là 43
  expect(mockCallback.mock.results[1].value).toBe(43);
});
