<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: "",
      email: "",
    }),
  },
  myBooks: {
    type: Array,
    default: () => [],
  },
})

const displayName = computed(
    () => props.user.name?.trim() || "Foydalanuvchi"
)

const avatarLetter = computed(
    () => displayName.value.charAt(0).toUpperCase()
)
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 md:p-8">
    <h1 class="text-2xl font-bold text-gray-700 mb-6">
      Shaxsiy sahifa
    </h1>

    <section class="bg-white border rounded-xl p-6">
      <div class="flex items-center gap-4">
        <div
            class="w-16 h-16 shrink-0 rounded-full bg-blue-100
                 text-blue-700 flex items-center justify-center
                 text-2xl font-bold"
            aria-hidden="true"
        >
          {{ avatarLetter }}
        </div>

        <div class="min-w-0">
          <h2 class="text-xl font-semibold text-gray-800 break-words">
            {{ displayName }}
          </h2>

          <p v-if="user.email" class="text-gray-500 break-all mt-1">
            {{ user.email }}
          </p>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-4 mt-6">
        <p class="text-sm text-gray-500">Qo‘shilgan kitoblar</p>
        <p class="text-2xl font-bold text-gray-800">
          {{ myBooks.length }}
        </p>
      </div>
    </section>

    <section class="mt-8">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 class="text-xl font-bold text-gray-700">
          Mening kitoblarim
        </h2>

        <RouterLink
            to="/book/add"
            class="bg-blue-800 hover:bg-blue-600 text-white
                 rounded-lg px-4 py-2"
        >
          + Kitob qo‘shish
        </RouterLink>
      </div>

      <div
          v-if="myBooks.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <article
            v-for="item in myBooks"
            :key="item['@id'] || item.id"
            class="bg-white border rounded-xl p-5"
        >
          <h3 class="font-semibold text-lg text-gray-800 break-words">
            {{ item.name }}
          </h3>

          <p class="text-sm text-gray-500 mt-2 break-words">
            {{ item.description || "Tavsif kiritilmagan." }}
          </p>
        </article>
      </div>

      <div
          v-else
          class="bg-gray-50 border border-dashed rounded-xl
               text-center px-6 py-12"
      >
        <h3 class="text-lg font-semibold text-gray-700">
          Hali kitob qo‘shmagansiz
        </h3>

        <p class="text-gray-500 mt-2 mb-6">
          Birinchi kitobingizni kutubxonaga joylashtiring.
        </p>

        <RouterLink
            to="/book/add"
            class="inline-block bg-blue-800 hover:bg-blue-600
                 text-white rounded-lg px-5 py-2.5"
        >
          Birinchi kitobni qo‘shish
        </RouterLink>
      </div>
    </section>
  </div>
</template>
