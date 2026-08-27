<script setup>
import { book } from "@/store/book.js"
import { useRoute, useRouter } from "vue-router"
import { computed, onMounted } from "vue"

const route = useRoute()
const router = useRouter()
const bookStore = book()
const fetchedBook = computed(() => bookStore.getBook)

onMounted(async () => {
  await bookStore.fetchBook(route.params.bookId)
})

function readBook() {
  router.push(`/books/${fetchedBook.value.id}/read`)
}

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <button
      type="button"
      class="mb-5 rounded bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-600"
      @click="goBack"
    >
      ← Orqaga
    </button>

    <h2 class="mb-5 text-2xl font-extrabold">
      {{ fetchedBook.name }}
    </h2>

    <p class="py-3 text-justify">
      {{ fetchedBook.description }}
    </p>

    <button
      v-if="fetchedBook.pdfUrl"
      type="button"
      class="mt-5 rounded bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-600"
      @click="readBook"
    >
      📖 Kitobni o'qish
    </button>

  </div>
</template>

<style scoped>
</style>
