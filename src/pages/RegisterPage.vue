<script setup>
import InputForm from "@/components/html/InputForm.vue";
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {user} from "@/store/user.js";
import {authorization} from "@/store/authorization.js";

const router = useRouter();

const newUser = reactive({
  name: "",
  email: "",
  password: "",
  age: 18,
  gender: "",
  phone: "",
});

const goToLogin = () => {
  router.push("/login");
};

const saveUser = async () => {
  try {
    newUser.age = parseInt(newUser.age, 10);

    const authData = {
      email: newUser.email,
      password: newUser.password,
    };

    console.log("REGISTER DATA:", newUser);
    console.log("AUTH DATA:", authData);

    await user().createUser(newUser);
    await authorization().auth(authData);
    await router.push("/");

  } catch (error) {
    console.error("XATOLIK:", error);
  }
};
</script>

<template>
  <section class="min-h-screen bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">

    <div class="mx-auto w-full max-w-xl">
      <div class="rounded-lg bg-gray-800 p-5 shadow-lg sm:p-7 md:p-8">
        <h1
          class="mb-6 text-center text-2xl font-bold text-white sm:text-3xl"
        >
          Foydalanuvchini kiriting!!!
        </h1>

        <form
          class="space-y-4 sm:space-y-5"
          @submit.prevent="saveUser"
        >

          <InputForm
            v-model="newUser.name"
            input-id="userName"
            input-name="userName"
            input-placeholder="Ism kiriting"
            input-type="text"
            label-name="Ism"
          />

          <InputForm
            v-model="newUser.email"
            input-id="userEmail"
            input-name="userEmail"
            input-placeholder="Email kiriting"
            input-type="email"
            label-name="Email"
          />

          <InputForm
            v-model="newUser.password"
            input-id="userPassword"
            input-name="userPassword"
            input-placeholder="Parol kiriting"
            input-type="password"
            label-name="Parol"
          />

          <InputForm
            v-model.number="newUser.age"
            input-id="userAge"
            input-name="userAge"
            input-placeholder="Yoshingizni kiriting"
            input-type="number"
            label-name="Yosh"
          />

          <div class="w-full">
            <label class="mb-2 block text-white">
              Jins
            </label>

            <div class="flex gap-4">
              <label
                class="flex flex-1 cursor-pointer items-center gap-3 rounded
             border border-gray-600 bg-gray-700 p-3 text-white
             transition hover:bg-gray-600"
              >
                <input
                  v-model="newUser.gender"
                  class="h-4 w-4"
                  name="gender"
                  type="radio"
                  value="man"
                />

                <span>Erkak</span>
              </label>

              <label
                class="flex flex-1 cursor-pointer items-center gap-3 rounded
             border border-gray-600 bg-gray-700 p-3 text-white
             transition hover:bg-gray-600"
              >
                <input
                  v-model="newUser.gender"
                  class="h-4 w-4"
                  name="gender"
                  type="radio"
                  value="woman"
                />

                <span>Ayol</span>
              </label>
            </div>
          </div>

          <InputForm
            v-model="newUser.phone"
            input-id="userPhone"
            input-name="userPhone"
            input-placeholder="Telefon raqamni kiriting"
            input-type="tel"
            label-name="Telefon"
          />

          <div class="flex flex-col gap-3 pt-2 sm:flex-row">

            <button
              class="w-full rounded bg-gray-600 py-3 font-bold text-white
                     transition duration-200 hover:bg-gray-500
                     focus:outline-none focus:ring-2 focus:ring-gray-400
                     active:scale-[0.98]"
              type="button"
              @click="goToLogin"
            >
              ← Orqaga
            </button>

            <button
              class="w-full rounded bg-green-600 py-3 font-bold text-white
                     transition duration-200 hover:bg-green-500
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     active:scale-[0.98]"
              type="submit"
            >
              Saqlash
            </button>

          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
