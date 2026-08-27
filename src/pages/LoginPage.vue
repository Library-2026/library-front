<script setup>

import InputForm from "@/components/html/InputForm.vue"
import {reactive, ref,} from "vue"
import {authorization} from "@/store/authorization.js"
import {useRouter} from "vue-router"

let data = reactive({})
let isError = ref(false)
let router = useRouter()

function login() {
  console.log('Kirishga bosdingiz!')
  authorization().auth(data)
    .then(() => {
      isError.value = false
      router.push('/')

    })
    .catch(() => {
      isError.value = true
    })
}

function register() {
  console.log('Registratsiyaga bosdingiz!')

  router.push('/register')

}


</script>

<template>
  <section class="bg-gray-900">
    <div class="flex items-center justify-center min-h-screen px-1 py-8">
      <div class="w-1/3 bg-gray-800 border-gray-700 rounded-lg">
        <div v-if="isError" class="text-2xl text-red-600 font-bold text-center">
          Email yoki parol noto'g'ri
        </div>
        <div class="p-6 space-y-4">
          <h1 class="text-white font-bold text-xl">Tizimga kirish</h1>
          <form>

            <div class="mb-5">
              <InputForm
                v-model="data.email"
                input-id="email"
                input-name="email"
                label-name="Email"
              />
            </div>

            <div class="mb-7">
              <InputForm
                v-model="data.password"
                input-id="password"
                input-name="password"
                input-placeholder="********"
                input-type="password"
                label-name="Parol"
              />


            </div>
            <button
              class="text-white font-bold bg-blue-800 w-full py-2 rounded hover:bg-blue-600 focus:ring-2"
              type="button"
              @click="login"
            >
              Kirish
            </button>

            <br/><br/>

            <button

              class="text-white font-bold bg-green-700 w-full
                                  py-2 rounded hover:bg-green-400 focus:ring-2"
              link="/register"
              type="button"
              @click="register"
            >
              Akkaunt yo'qmi?
            </button>


          </form>
        </div>


      </div>
    </div>


  </section>
</template>

<style scoped>

</style>
