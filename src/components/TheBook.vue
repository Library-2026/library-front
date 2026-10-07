<script setup>
import { book } from "@/store/book.js";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const bookStore = book();
const books = computed(() => bookStore.getBooks);
const API_URL = import.meta.env.VITE_API_URL;

watch(
  () => route.params.id,
  async (id) => {
    await bookStore.fetchBooks(id || null, 1);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    v-for="item in books"
    :key="item.id"
    class="
      rounded-xl
      shadow-md
      bg-gray-100
      border
      overflow-hidden
      min-w-0
      flex
      flex-col
    "
  >
    <img
      v-if="item.imageUrl"
      :src="API_URL + item.imageUrl"
      :alt="item.name"
      class="h-48 w-full object-cover"
    />

    <div
      v-else
      class="h-48 w-full flex items-center justify-center bg-gray-200"
    >
      Rasm mavjud emas
    </div>

    <div class="flex flex-col flex-1 p-2 min-w-0">
      <h5
        class="
          font-bold
          text-xl
          md:text-2xl
          break-words
        "
      >
        {{ item.name }}
      </h5>

      <p
        class="
          pt-2
          break-words
          overflow-hidden
        "
      >
        {{ item.description }}
      </p>

      <div class="mt-auto flex justify-end pt-3">
        <router-link
          :to="'/book-content/' + item.id"
          class="
            bg-blue-500
            text-white
            py-1
            px-3
            rounded
            hover:bg-blue-600
          "
        >
          O'qish
        </router-link>
      </div>
    </div>
  </div>
</template>
