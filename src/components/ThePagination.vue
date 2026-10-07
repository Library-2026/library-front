<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { book } from "@/store/book.js";

const route = useRoute();
const bookStore = book();

const currentPage = computed(
  () => bookStore.getCurrentPage
);

const totalPages = computed(
  () => bookStore.getTotalPages
);

const changePage = async (page) => {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  await bookStore.fetchBooks(
    route.params.id || null,
    page
  );
};
</script>

<template>
  <div v-if="totalPages > 1">
    <nav
      aria-label="Pagination"
      class="inline-flex -space-x-px rounded-md shadow-sm"
    >

      <button
        :disabled="currentPage === 1"
        class="
          relative
          inline-flex
          items-center
          rounded-l-md
          px-3
          py-2
          text-sm
          font-semibold
          text-gray-900
          ring-1
          ring-inset
          ring-gray-300
          hover:bg-gray-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        type="button"
        @click="changePage(currentPage - 1)"
      >
        ‹
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        :class="[
          'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300',
          page === currentPage
            ? 'z-10 bg-indigo-600 text-white'
            : 'text-gray-900 hover:bg-gray-50'
        ]"
        type="button"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        class="
          relative
          inline-flex
          items-center
          rounded-r-md
          px-3
          py-2
          text-sm
          font-semibold
          text-gray-900
          ring-1
          ring-inset
          ring-gray-300
          hover:bg-gray-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        type="button"
        @click="changePage(currentPage + 1)"
      >
        ›
      </button>

    </nav>
  </div>
</template>
