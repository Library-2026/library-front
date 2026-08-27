<script setup>
import {category} from "@/store/category.js";
import InputForm from "@/components/html/InputForm.vue";
import {computed, onMounted, reactive, ref} from "vue";

const categoryStore = category();

onMounted(() => {
  categoryStore.fetchCategories();
});

const categories = computed(() => categoryStore.getCategories);

const newCategory = reactive({
  name: "",
});

const saveCategory = async () => {
  if (!newCategory.name.trim()) {
    alert("Ogohlantirish: kategoriya nomini kiriting!");
    return;
  }

  if (
    !confirm(
      `"${newCategory.name.trim()}" kategoriyasini qo'shmoqchimisiz?`
    )
  ) {
    alert("Kategoriya qo'shish bekor qilindi!");
    return;
  }

  try {
    await categoryStore.createCategory(newCategory);
    alert(
      `Muvaffaqiyatli!\n\n"${newCategory.name.trim()}" kategoriyasi qo'shildi.`
    );

    newCategory.name = "";
    categoryStore.fetchCategories();
  } catch (error) {
    console.error(
      "Kategoriya yaratishda xatolik:",
      error
    );
    alert(
      "Xatolik!\n\n" +
      "Kategoriya qo'shilmadi.\n" +
      "Iltimos, qaytadan urinib ko'ring."
    );
  }
};

const putCategory = reactive({
  id: "",
  name: "",
});

const renameCategory = async () => {
  if (!putCategory.id) {
    alert("Ogohlantirish: kategoriyani tanlang!");
    return;
  }

  if (!putCategory.name.trim()) {
    alert("Ogohlantirish: yangi kategoriya nomini kiriting!");
    return;
  }

  if (
    !confirm(
      `Kategoriyani "${putCategory.name.trim()}" nomiga o'zgartirmoqchimisiz?`
    )
  ) {
    alert("Kategoriya nomini o'zgartirish bekor qilindi!");
    return;
  }

  try {
    await categoryStore.putCategory({
      id: putCategory.id,
      name: putCategory.name.trim(),
    });
    alert(
      `Muvaffaqiyatli!\n\n` +
      `Kategoriya nomi "${putCategory.name.trim()}" ga o'zgartirildi.`
    );
    putCategory.id = "";
    putCategory.name = "";
    categoryStore.fetchCategories();

  } catch (error) {
    console.error(
      "Kategoriya nomini o'zgartirishda xatolik:",
      error
    );

    alert(
      "Xatolik!\n\n" +
      "Kategoriya nomi o'zgartirilmadi.\n" +
      "Iltimos, qaytadan urinib ko'ring."
    );
  }
};

const deleteCategory = ref("");

const removeCategory = async () => {
  if (!deleteCategory.value) {
    alert("Ogohlantirish: kategoriya tanlang!");
    return;
  }

  if (
    !confirm(
      "Haqiqatan ham ushbu kategoriyani o'chirmoqchimisiz?"
    )
  ) {
    alert("Kategoriya o'chirish bekor qilindi!");
    return;
  }

  try {
    await categoryStore.deleteCategory(deleteCategory.value);
    alert(
      "Muvaffaqiyatli!\n\n" +
      "Kategoriya o'chirildi!"
    );
    deleteCategory.value = "";
    categoryStore.fetchCategories();

  } catch (error) {
    console.error(
      "Kategoriya o'chirishda xatolik:",
      error
    );

    const errorDetail =
      error?.response?.data?.detail || "";

    if (
      errorDetail.includes("1451") ||
      errorDetail.includes("foreign key") ||
      errorDetail.includes("FOREIGN KEY") ||
      errorDetail.includes("category_id")
    ) {
      alert(
        "Xatolik!\n\n" +
        "Bu kategoriyani o'chirib bo'lmaydi.\n\n" +
        "Ushbu kategoriyaga kitoblar biriktirilgan.\n" +
        "Avval kitoblarning kategoriyasini o'zgartiring."
      );

      return;
    }
    alert(
      "Xatolik!\n\n" +
      "Kategoriya o'chirilmadi.\n" +
      "Iltimos, qaytadan urinib ko'ring."
    );
  }
};
</script>


<template>
  <div class="warpper">
    <input
      id="one"
      checked
      class="radio"
      name="group"
      type="radio"
    >

    <input
      id="two"
      class="radio"
      name="group"
      type="radio"
    >

    <input
      id="three"
      class="radio"
      name="group"
      type="radio"
    >

    <div class="tabs">

      <label
        id="one-tab"
        class="tab"
        for="one"
      >
        Qo'shish
      </label>

      <label
        id="two-tab"
        class="tab"
        for="two"
      >
        O'zgartirish
      </label>

      <label
        id="three-tab"
        class="tab"
        for="three"
      >
        O'chirish
      </label>
    </div>
    <div class="panels">
      <div
        id="one-panel"
        class="panel"
      >

        <div class="panel-title">
          Kategoriya nomini kiriting
        </div>
        <div class="form-group">

          <InputForm
            v-model="newCategory.name"
            input-id="categoryName"
            input-name="categoryName"
            input-placeholder="Kategoriya nomini kiriting"
            input-type="text"
            label-name="categoryName"
          />
        </div>
        <div class="form-group">
          <button
            class="btn"
            type="button"
            @click="saveCategory"
          >
            Saqlash
          </button>
        </div>
      </div>
      <div
        id="two-panel"
        class="panel"
      >
        <div class="panel-title">
          Qaysi kategoriyani o'zgartirasiz?
        </div>
        <div class="form-group">
          <select
            v-model="putCategory.id"
            class="select"
          >
            <option
              disabled
              value=""
            >
              Kategoriyani tanlang
            </option>

            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>

          </select>

        </div>

        <div class="form-group">

          <InputForm
            v-model="putCategory.name"
            input-name="categoryName"
            input-placeholder="Yangi nomni kiriting"
            input-type="text"
          />

        </div>

        <div class="form-group">

          <button
            class="btn"
            type="button"
            @click="renameCategory"
          >
            O'zgartirish
          </button>

        </div>

      </div>
      <div
        id="three-panel"
        class="panel"
      >

        <div class="panel-title">
          Qaysi kategoriyani o'chirasiz?
        </div>

        <div class="form-group">

          <select
            v-model="deleteCategory"
            class="select"
          >

            <option
              disabled
              value=""
            >
              Kategoriyani tanlang
            </option>

            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>

          </select>

        </div>

        <div class="form-group">

          <button
            class="btn"
            type="button"
            @click="removeCategory"
          >
            O'chirish
          </button>

        </div>

      </div>

    </div>

  </div>

</template>


<style scoped>

@import url(
"https://fonts.googleapis.com/css?family=Arimo:400,700&display=swap"
);

.warpper {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arimo", sans-serif;
}

.tabs {
  display: flex;
  justify-content: center;
}

.tab {
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 2px;
  background: #000;
  display: inline-block;
  color: #fff;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 0.5rem 0.8rem #00000080;
  transition: 0.2s ease;
}

.tab:hover {
  background: #333;
}

.panels {
  background: #fffffff6;
  box-shadow: 0 2rem 2rem #00000080;
  min-height: 200px;
  width: 100%;
  max-width: 500px;
  border-radius: 3px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.panel {
  display: none;
  animation: fadein 0.8s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }

}

.panel-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  width: 100%;

  margin-bottom: 15px;
}

.btn {
  width: 100%;
  margin-top: 10px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background: #1e40af;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #2563eb;
}

.btn:active {
  background: #1d4ed8;
}

.select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}

.select:focus {
  outline: none;
  border-color: #1e40af;
}

.radio {
  display: none;
}

#one:checked ~ .panels #one-panel,
#two:checked ~ .panels #two-panel,
#three:checked ~ .panels #three-panel {
  display: block;
}

#one:checked ~ .tabs #one-tab,
#two:checked ~ .tabs #two-tab,
#three:checked ~ .tabs #three-tab {
  background: #fffffff6;
  color: #000;
  border-top: 3px solid #000;
}
</style>
