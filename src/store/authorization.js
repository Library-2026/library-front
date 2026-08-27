import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const authorization = defineStore("authorization", {
  actions: {
    async auth(data) {
      try {
        const response = await axios.post(
          "/users/auth",
          data
        );

        console.log("Token olindi:", response.data);

        localStorage.setItem(
          "accessToken",
          response.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          response.data.refreshToken
        );

        return response.data;
      } catch (error) {
        console.error(
          "Token olishda xatolik:",
          error.response?.data || error.message
        );

        throw error;
      }
    },
  },
});
