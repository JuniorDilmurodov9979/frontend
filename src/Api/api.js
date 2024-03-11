import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const api = {
  user: async ({ formData, crud, url }) => {
    try {
      const response = await axios[crud](`${BASE_URL}${url}`, formData, {
        responseType: "json",
      });

      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },
  getMe: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        responseType: "json",
      });

      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
  putData: async () => {
    try {
      const res = await axios.put("http://localhost:5000/user/account");
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  },
};
