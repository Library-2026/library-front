import {defineStore} from "pinia";
import axios from "@/plugins/axios.js";

export const category = defineStore("category", {
  state() {
    return {
      categories: [],
      category: {}
    };
  },
  getters: {
    getCategories() {
      return this.categories;
    },
    getCategory() {
      return this.category;
    }
  },
  actions: {
    fetchCategories() {
      return new Promise((resolve, reject) => {
        axios.get("/categories")
          .then((response) => {
            console.log("Kategoriyalar olindi", response);
            this.categories = response.data["member"];
            resolve();
          })
          .catch((error) => {
            console.error("Kategoriyalar olishda xatolik yuz berdi", error);
            reject(error);
          });
      });
    },
    createCategory(data) {
      return new Promise((resolve, reject) => {
        axios.post("/categories", data)
          .then((response) => {
            console.log("Kategoriya yaratildi", response);
            resolve(response);
          })
          .catch((error) => {
            console.error("Kategoriya yaratishda xatolik", error);
            reject(error);
          });
      });
    },
    deleteCategory(id) {
      if (!id) {
        console.error("Kategoriya ID tanlanmagan!");
        return Promise.reject("Kategoriya ID tanlanmagan!");
      }
      return new Promise((resolve, reject) => {
        axios.delete(`/categories/${id}`)
          .then((response) => {
            console.log("Kategoriya olib tashlandi", response);
            resolve(response);
          })
          .catch((error) => {
            console.error("Kategoriya olib tashlashda xatolik", error);
            reject(error);
          });
      });
    },
    putCategory(data) {
      return new Promise((resolve, reject) => {
        if (!data.id || !data.name) {
          console.error("ID yoki nom kiritilmagan!");
          reject("ID yoki nom kiritilmagan!");
          return;
        }
        axios.put(`/categories/${data.id}`, {name: data.name})
          .then((response) => {
            console.log("Kategoriya nomi o‘zgartirildi", response);
            resolve(response);
          })
          .catch((error) => {
            console.error("Kategoriya nomini o‘zgartirishda xatolik", error);
            reject(error);
          });
      });
    }
  }
});
