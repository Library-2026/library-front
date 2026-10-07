import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const mediaObject = defineStore("mediaObject", {
  state() {
    return {
      media: null,
    };
  },
  getters: {
    getMedia() {
      return this.media;
    },
  },
  actions: {
    async createMedia(data) {
      try {
        const response = await axios.post(
          "/media_objects",
          data
        );

        console.log("Fayl joylandi:", response.data);

        this.media = response.data["@id"];

        return this.media;
      } catch (error) {
        console.error(
          "Fayl joylashda xatolik:",
          error.response?.data || error
        );

        throw error;
      }
    },
  },
});
