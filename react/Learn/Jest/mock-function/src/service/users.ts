import axios from "axios";

class Users {
  static async all() {
    try {
      const resp = await axios.get("https://6709fc51af1a3998baa2c1b0.mockapi.io/users");
      return resp.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

export default Users;
