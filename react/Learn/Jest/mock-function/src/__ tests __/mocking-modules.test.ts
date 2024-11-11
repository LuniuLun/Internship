import axios from "axios";
import Users from "../service/users";

// Mock the entire axios module
jest.mock("axios");

// Get the mocked version of axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("should fetch users", async () => {
  // Prepare mock data with the correct structure
  const users = [
    {
      address: "bob_smith",
      email: "bob.smith@example.com",
      phoneNumber: "555-1234",
      password: "password123",
      fullName: "Bob Smith",
      user_id: "1",
    },
  ];

  // Mock response structure
  const resp = { data: users };

  // Ensure the mock is configured to return the mock data
  mockedAxios.get.mockResolvedValue(resp);

  // Call Users.all() and expect it to return the mock data
  const data = await Users.all();
  console.log(data); // This should log the mock data

  // Assertions to check if data is as expected
  expect(data).toEqual(users); // Ensure data matches the mock
  expect(data[0]).toHaveProperty("username"); // Check if 'username' exists
  expect(data[0]).toHaveProperty("email"); // Check if 'email' exists
  expect(data.length).toBeGreaterThan(0); // Ensure there's at least one user
});
