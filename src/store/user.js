import {defineStore} from "pinia";
import axios from "@/plugins/axios.js";

export const user = defineStore("user", {
  state: () => ({
    user: {},
  }),

  getters: {
    getUsers() {
      return this.user;
    },
  },
  actions: {
    async createUser(data) {
      try {
        const response = await axios.post("/users", data);
        console.log("Registratsiyadan muvaffaqiyatli o‘tdingiz!", response.data);
        this.user = response.data;
        return response.data;
      } catch (error) {
        console.error("Registratsiyada xatolik yuz berdi:", error.response?.data || error.message);
        throw error;
      }
    },
  },
});
