<script setup lang="ts">
import isEqual from 'validator/es/lib/equals'
import isEmpty from 'validator/es/lib/isEmpty'

const EMPTY_FIELD_MESSAGE = 'This field cannot be empty.'

const loginValue = ref('')
const passwordValue = ref('')

const prevLoginValue = ref(loginValue.value)
const prevPasswordValue = ref(passwordValue.value)

const loginResponse = ref<LoginResponse>({ error: false, status: '' })

const loginInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const triggeredEmptyLogin = ref(false)
const triggeredEmptyPassword = ref(false)

const isLoginEmpty = computed(() => isEmpty(loginValue.value, { ignore_whitespace: true }))
const isPasswordEmpty = computed(() => isEmpty(passwordValue.value, { ignore_whitespace: true }))

const rememberMe = ref()

async function tryLogin() {
  const areCredentialsIdentical = isEqual(loginValue.value, prevLoginValue.value) && isEqual(passwordValue.value, prevPasswordValue.value)

  if (!isLoginEmpty.value && !isPasswordEmpty.value && !areCredentialsIdentical) {
    loginResponse.value = await requestLogin({ login: loginValue.value, password: passwordValue.value, remember: rememberMe.value })

    prevLoginValue.value = loginValue.value
    prevPasswordValue.value = passwordValue.value

    if (loginResponse.value.error) {
      loginInput.value?.addEventListener('input', () => loginResponse.value.error = false, { once: true })
      passwordInput.value?.addEventListener('input', () => loginResponse.value.error = false, { once: true })
    }
    return
  }

  if (isLoginEmpty.value)
    triggeredEmptyLogin.value = true

  if (isPasswordEmpty.value)
    triggeredEmptyPassword.value = true
}
onMounted(() => loginInput.value?.focus())

const unwatchLogin = watch(isLoginEmpty, val =>
  triggeredEmptyLogin.value = val === true)

const unwatchPassword = watch(isPasswordEmpty, val =>
  triggeredEmptyPassword.value = val === true)

onUnmounted(() => {
  unwatchLogin()
  unwatchPassword()
})
</script>

<template>
  <div class="form-box login-form">
    <span class="form-box__header">Login</span>

    <form data-form="login" action="/auth/login" novalidate @submit.prevent>
      <fieldset>
        <label :class="triggeredEmptyLogin || loginResponse.error ? 'input-error' : null">Login
          <input
            ref="loginInput"
            v-model="loginValue"
            required
            spellcheck="false"
            name="login"
            type="text"
          >
          <span v-if="triggeredEmptyLogin" class="form-error">{{ EMPTY_FIELD_MESSAGE }}</span>
        </label>

        <label :class="triggeredEmptyPassword || loginResponse.error ? 'input-error' : null">Password
          <input
            ref="passwordInput"
            v-model="passwordValue"
            class="password-input"
            required
            spellcheck="false"
            name="password"
            type="password"
          >
          <span v-if="triggeredEmptyPassword" class="form-error">{{ EMPTY_FIELD_MESSAGE }}</span>
        </label>
        <label class="remember-me">
          <input v-model="rememberMe" class="remember-me__input" type="checkbox">
          <span>Remember me</span>
        </label>

        <span v-if="loginResponse.error" class="form-user-error">{{ loginResponse.status }}</span>
        <button type="submit" class="form-box__submit" @click="tryLogin">
          Login
        </button>

        <DevOnly>
          <div style="position: absolute;margin-top: 26em;">
            <div>DEV ONLY</div>
            <button
              type="button"
              style="padding: .4em .8em;margin-right: 5px;background-color: cornsilk;border: none;border-radius: 4px; color: black;font-weight: bold;" @click="passwordValue = 'testtest';loginValue = 'test';tryLogin()"
            >
              as user
            </button>
            <button type="button" style="padding: .4em .8em;background-color: cornsilk;border: none;border-radius: 4px; color: black;font-weight: bold;" @click="passwordValue = 'adminadmin'; loginValue = 'admin';tryLogin()">
              as admin
            </button>
          </div>
        </DevOnly>
      </fieldset>
    </form>
    <div class="bottom-bar">
      <span>No account ? <NuxtLink to="/register">Sign up</NuxtLink></span>
      <NuxtLink to="/">
        <i>forgot password?</i>
      </NuxtLink>
    </div>
  </div>
</template>
