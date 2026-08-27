<script setup>
defineProps({
  labelName: {
    type: String,
    default: 'Email'
  },
  inputType: {
    type: String,
    default: 'email'
  },
  inputName: {
    type: String,
    required: true
  },
  inputId: {
    type: String,
    default: ''
  },
  inputPlaceholder: {
    type: String,
    default: 'palonchi@falondaqa.com'
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="inputId" class="text-white">{{ labelName }}</label>
  <input
    :id="inputId"
    :name="inputName"
    :placeholder="inputPlaceholder"
    :type="inputType"
    class="border rounded p-2 w-full bg-gray-700 border-gray-600 text-white"
    @input="$emit('update:modelValue', $event.target.value)"


  />
</template>

<style scoped>

</style>
