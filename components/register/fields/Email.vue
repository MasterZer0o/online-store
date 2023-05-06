<script setup lang="ts">
const store = useRegisterStore()
const data = store.registerData
const registerErrors = store.registerErrors
const modelValue = ref('')

const checkEmailDebounced = debounce(() => validateEmail(data.email), 600)
const inputElement = ref<HTMLInputElement>()
onMounted(() => store.emailFieldElement = inputElement.value)
const updateValue = (value: string) => (data.email = value)
</script>

<template>
  <label :class="registerErrors.email.isError || store.registerErrorResponse === true ? 'input-error' : null">Email
    <input
      ref="inputElement"
      v-model="modelValue"
      name="email"
      spellcheck="false"
      required
      type="email"
      @input="updateValue(modelValue), checkEmailDebounced()"
      @focusout="validateEmail(data.email)"
    >
  </label>
  <span v-if="registerErrors.email.isError" class="form-error">{{ registerErrors.email.message }}</span>
</template>
