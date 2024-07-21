<script setup lang="ts">
const store = useRegisterStore()
const data = store.registerData
const registerErrors = store.registerErrors
const modelValue = ref('')

const checkUsernameDebounced = debounce(() => validateUsername(data.username), 600)

const updateValue = (value: string) => (data.username = value)
</script>

<template>
  <label :class="registerErrors.username.isError ? 'input-error' : null">Username
    <input
      v-model="modelValue"
      name="username"
      spellcheck="false"
      minlength="3"
      maxlength="20"
      required
      type="text"
      @input="updateValue(modelValue), checkUsernameDebounced()"
      @focusout="validateUsername(data.username)"
    >
  </label>
  <span v-if="registerErrors.username.isError" class="form-error">{{ registerErrors.username.message }}</span>
</template>
