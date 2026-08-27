<script setup>
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { book } from "@/store/book.js"

const route = useRoute()
const router = useRouter()
const bookStore = book()
const API_URL = import.meta.env.VITE_API_URL
const fetchedBook = computed(() => bookStore.getBook)

onMounted(async () => {
  await bookStore.fetchBook(route.params.bookId)
})

const pdfUrl = computed(() => {
  if (!fetchedBook.value?.pdfUrl) {
    return null
  }

  return `${API_URL}${fetchedBook.value.pdfUrl}`
})

function goBack() {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gray-900">

    <div
      class="flex items-center gap-4 bg-gray-800 px-5 py-4 text-white"
    >
      <button
        type="button"
        class="rounded bg-gray-700 px-4 py-2 hover:bg-gray-600"
        @click="goBack"
      >
        ← Orqaga
      </button>

      <h1 class="text-xl font-bold">
        {{ fetchedBook.name }}
      </h1>
    </div>

    <div class="h-[calc(100vh-72px)] w-full">

      <iframe
        v-if="pdfUrl"
        :src="pdfUrl"
        class="h-full w-full border-0"
        title="Kitob PDF"
      />

      <div
        v-else
        class="flex h-full items-center justify-center text-white"
      >
        PDF mavjud emas
      </div>

    </div>

  </div>
</template>
