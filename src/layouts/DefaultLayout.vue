<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheCategory from "@/components/TheCategory.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <!-- Header -->
    <TheHeader />

    <!-- Main -->
    <main
      class="
        flex-1
        min-h-0
        grid
        grid-cols-1
        md:grid-cols-12
        gap-4
        md:gap-6
      "
    >

      <!-- Category -->
      <TheCategory />

      <!-- Books -->
      <div
        class="
          col-span-1
          md:col-span-10
          min-w-0
          min-h-0
          mt-4
          md:mt-5
          flex
          flex-col
        "
      >
        <router-view />
      </div>

    </main>

    <!-- Footer -->
    <TheFooter />

  </div>
</template>

<style>
</style>