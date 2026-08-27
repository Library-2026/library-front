<script setup>
import { category } from "@/store/category.js";
import { computed } from "vue";

const categoryStore = category();

categoryStore.fetchCategories();

const categories = computed(() => categoryStore.getCategories);
</script>

<template>
  <aside
    class="
      col-span-1
      md:col-span-2
      w-full
      h-full
      bg-gray-800
      text-white
      shadow-md
      rounded-xl
      overflow-hidden
    "
  >
    <ul class="flex md:block overflow-x-auto">

      <li
        v-for="item in categories"
        :key="item.id"
        class="shrink-0"
      >
        <router-link
          :to="'/categories/' + item.id"
          class="
            block
            px-3
            py-3
            cursor-pointer
            hover:text-gray-500
            border-b
            md:border-b
            whitespace-nowrap
          "
        >
          {{ item.name }}
        </router-link>
      </li>

    </ul>
  </aside>
</template>

<style>
</style>