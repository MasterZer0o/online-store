<script setup lang="ts">
const store = useRegisterStore()

function tryRegister() {
  const registerData = store.registerData

  const data: RegisterUser = {
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
    passwordRepeat: registerData.passwordRepeat
  }

  const formValidationSuccess = validateUserData(data)

  if (formValidationSuccess === true)
    requestRegister(data)
}

onUnmounted(() => {
  // clear all errors on fields on component unmount (eg. route change)
  Object.values(store.registerErrors).forEach(field => (field.isError = false))
  store.registerErrorResponse = null
})
</script>

<template>
  <div class="form-box">
    <span class="form-box__header">Register</span>

    <form data-form="register" action="/auth/register" novalidate @submit.prevent>
      <fieldset>
        <RegisterFieldsUsername />
        <RegisterFieldsEmail />
        <RegisterFieldsPassword />
        <RegisterFieldsPasswordRepeat />

        <span v-if="store.registerErrorResponse" class="form-user-error">{{ store.registerErrorText }}</span>
        <button :disabled="!store.canRegister" type="submit" class="form-box__submit" @click="tryRegister">
          Register
        </button>
      </fieldset>
    </form>
  </div>
</template>
