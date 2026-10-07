<script setup>
import { category } from "@/store/category.js"
import InputForm from "@/components/html/InputForm.vue"
import { computed, reactive, ref } from "vue"
import { mediaObject } from "@/store/mediaObject.js"
import { book } from "@/store/book.js"
import { useRouter } from "vue-router"

category().fetchCategories()
const categories = computed(() => category().getCategories)
const router = useRouter()
const image = ref(null)
const pdf = ref(null)

function selectImage(event) {
  const file = event.target.files[0]

  if (!file) {
    return
  }

  image.value = new FormData()
  image.value.append("file", file)
}

function selectPdf(event) {
  const file = event.target.files[0]

  if (!file) {
    return
  }

  pdf.value = new FormData()
  pdf.value.append("file", file)
}

const newBook = reactive({
  name: "",
  description: "",
  text: "",
  category: "",
  image: null,
  file: null,
})

async function saveBook() {
  try {
    await mediaObject().createMedia(image.value)

    newBook.image = mediaObject().getMedia

    await mediaObject().createMedia(pdf.value)

    newBook.file = mediaObject().getMedia

    await book().createBook(newBook)

    await router.push("/")
  } catch (error) {
    console.error(
      "Kitob qo'shishda xatolik:",
      error.response?.data || error
    )
  }
}
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 text-2xl font-bold text-gray-600">
      Kitobni qo'shing
    </div>

    <div class="col-span-8">
      <InputForm
        v-model="newBook.name"
        input-id="bookName"
        input-name="bookName"
        input-placeholder="Kitob nomini kiriting"
        input-type="text"
        label-name="bookName"
      />
    </div>

    <div class="col-span-8">
      <InputForm
        v-model="newBook.description"
        input-id="bookDescription"
        input-name="bookDescription"
        input-placeholder="Kitob tavsifini kiriting"
        input-type="text"
        label-name="bookDescription"
      />
    </div>

    <div class="col-span-8 mt-4">
      <label for="bookFile" class="block font-semibold text-gray-700 mb-2">
        Kitob fayli
      </label>

      <input
          id="bookFile"
          class="border w-full bg-gray-700 border-gray-600 rounded text-white p-2.5"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          aria-describedby="bookFileHelp"
          @change="selectPdf"
      />

      <p id="bookFileHelp" class="text-sm text-gray-500 mt-1">
        O‘qish uchun kitob matni yoki sahifa rasmini yuklang. PDF, JPG, PNG.
      </p>
    </div>

    <div class="col-span-8">
      <select
          v-model="newBook.category"
          class="border w-full bg-gray-700 border-gray-600 rounded text-white mt-4 p-2.5"
      >
        <option disabled value="">Kategoriyani tanlang</option>

        <option
            v-for="category in categories"
            :key="category['@id']"
            :value="category['@id']"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="col-span-8 mt-4">
      <label for="bookCover" class="block font-semibold text-gray-700 mb-2">
        Kitob muqovasi
      </label>

      <input
          id="bookCover"
          class="border w-full bg-gray-700 border-gray-600 rounded text-white p-2.5"
          type="file"
          accept=".jpg,.jpeg,.png"
          aria-describedby="bookCoverHelp"
          @change="selectImage"
      />

      <p id="bookCoverHelp" class="text-sm text-gray-500 mt-1">
        Kitoblar ro‘yxatida ko‘rinadigan muqova rasmini yuklang. JPG, PNG.
      </p>
    </div>

    <div class="col-span-8">
      <button
        class="bg-blue-800 w-full mt-5 py-2 rounded text-white font-bold hover:bg-blue-600"
        type="button"
        @click="saveBook"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
