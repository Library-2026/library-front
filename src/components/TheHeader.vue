<script setup>
import {useRouter} from "vue-router"

const router = useRouter()

function logout() {
  localStorage.removeItem('accessToken')
  router.push('/login')
}
</script>

<template>
  <header class="bg-gray-800 text-white">
    <nav class="overflow-x-auto">
      <ul
        class="
          flex
          min-w-max
          md:min-w-0
          md:flex-wrap
          font-bold
        "
      >
        <router-link
          class="px-4 py-3 cursor-pointer hover:text-gray-500 whitespace-nowrap"
          to="/"
        >
          Bosh sahifa
        </router-link>

        <router-link
          class="px-4 py-3 cursor-pointer hover:text-gray-500 whitespace-nowrap"
          to="/book/add"
        >
          Kitob qo'shish
        </router-link>

        <router-link
          class="px-4 py-3 cursor-pointer hover:text-gray-500 whitespace-nowrap"
          to="/categories/set"
        >
          Kategoriya
        </router-link>

        <router-link
          class="px-4 py-3 cursor-pointer hover:text-gray-500 whitespace-nowrap"
          to="/my"
        >
          Shaxsiy
        </router-link>


        <li
          class="px-4 py-3 cursor-pointer hover:text-gray-500 whitespace-nowrap"
          @click="logout"
        >
          Chiqish
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>

</style>
