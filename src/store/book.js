import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

export const book = defineStore("book", {
  state() {
    return {
      books: [],
      book: {},
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    };
  },

  getters: {
    getBooks() {
      return this.books;
    },

    getBook() {
      return this.book;
    },

    getCurrentPage() {
      return this.currentPage;
    },

    getTotalItems() {
      return this.totalItems;
    },

    getItemsPerPage() {
      return this.itemsPerPage;
    },

    getTotalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },

  actions: {
    async fetchBooks(categoryId = null, page = 1) {
      try {
        const params = new URLSearchParams();
        params.append("page", page);

        if (categoryId) {
          params.append("category.id", categoryId);
        }

        const url = `/books?${params.toString()}`;

        console.log("Kitoblar uchun URL:", url);

        const response = await axios.get(url);

        console.log("API response:", response.data);

        const books = response.data.member || [];

        await Promise.all(
          books.map(async (item) => {
            if (item.image) {
              try {
                const imageIri =
                  item.image.replace(/^\/api/, "");

                console.log(
                  "Image MediaObject URL:",
                  imageIri
                );

                const imageResponse =
                  await axios.get(imageIri);

                item.imageUrl =
                  imageResponse.data.contentUrl || null;

                console.log(
                  "Rasm:",
                  item.name,
                  item.imageUrl
                );

              } catch (error) {
                console.error(
                  "Rasmni olishda xatolik:",
                  item.image,
                  error
                );

                item.imageUrl = null;
              }
            } else {
              item.imageUrl = null;
            }

            if (item.file) {
              try {
                const fileIri =
                  item.file.replace(/^\/api/, "");

                console.log(
                  "PDF MediaObject URL:",
                  fileIri
                );

                const fileResponse =
                  await axios.get(fileIri);

                item.pdfUrl =
                  fileResponse.data.contentUrl || null;

                console.log(
                  "PDF:",
                  item.name,
                  item.pdfUrl
                );

              } catch (error) {
                console.error(
                  "PDFni olishda xatolik:",
                  item.file,
                  error
                );

                item.pdfUrl = null;
              }
            } else {
              item.pdfUrl = null;
            }
          })
        );

        this.books = books;
        this.totalItems =
          response.data.totalItems || 0;

        this.currentPage = page;

      } catch (error) {
        console.error(
          "Kitoblarni olishda xatolik:",
          error
        );

        this.books = [];

        throw error;
      }
    },


    async fetchBook(bookId) {
      try {
        const response = await axios.get(
          `/books/${bookId}`
        );

        const data = response.data;

        this.book = {
          id: data.id,
          name: data.name,
          description: data.description,
          text: data.text,
          category: data.category,
          image: data.image,
          file: data.file,
        };

        if (data.image) {
          try {
            const imageIri =
              data.image.replace(/^\/api/, "");

            const imageResponse =
              await axios.get(imageIri);

            this.book.imageUrl =
              imageResponse.data.contentUrl || null;

          } catch (error) {
            console.error(
              "Book rasmini olishda xatolik:",
              error
            );

            this.book.imageUrl = null;
          }
        }

        if (data.file) {
          try {
            const fileIri =
              data.file.replace(/^\/api/, "");

            const fileResponse =
              await axios.get(fileIri);

            this.book.pdfUrl =
              fileResponse.data.contentUrl || null;

            console.log(
              "Book PDF:",
              this.book.pdfUrl
            );

          } catch (error) {
            console.error(
              "Book PDFni olishda xatolik:",
              error
            );

            this.book.pdfUrl = null;
          }
        }

      } catch (error) {
        console.error(
          "Kitob olishda xatolik:",
          error
        );

        throw error;
      }
    },


    async createBook(data) {
      try {
        const response = await axios.post(
          "/books",
          data
        );

        console.log(
          "Kitob muvaffaqiyatli yaratildi:",
          response.data
        );

        return response.data;

      } catch (error) {
        console.error(
          "Kitob joylashda xatolik:",
          error.response?.data || error
        );

        throw error;
      }
    },
  },
});
