<script setup>
import TheBook from "@/components/TheBook.vue";
import ThePagination from "@/components/ThePagination.vue";
</script>

<template>
  <div class="min-w-0 w-full flex-1 min-h-0 flex flex-col">

    <div
      class="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        min-w-0
        w-full
      "
    >
      <TheBook />
    </div>

    <div
      class="
        mt-auto
        w-full
        flex
        justify-center
        pt-8
        pb-6
      "
    >
      <ThePagination />
    </div>

  </div>
</template>

<style scoped>

</style>
