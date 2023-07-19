<script setup lang="ts">
const selectedQuantity = ref(1)
const productQuantity = ref(5)
const limitExceeded = ref(false)

function updateQuantity(num: number) {
  const changedQuantity = selectedQuantity.value + num
  if (changedQuantity === 0 || limitExceeded.value)
    return

  if (changedQuantity > productQuantity.value) {
    limitExceeded.value = true

    setTimeout(() => limitExceeded.value = false, 1500)

    return
  }

  selectedQuantity.value += num
}
</script>

<template>
  <section class="details-buy">
    <div class="quantity">
      <button @click="updateQuantity(-1)">
        -
      </button>
      <span>{{ selectedQuantity }}</span>
      <button @click="updateQuantity(1)">
        +
      </button>
      <strong v-if="limitExceeded">Max is {{ productQuantity }}</strong>
    </div>
    <button>
      <svg height="25" width="25" fill="white" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="M56.262,17.837H26.748c-0.961,0-1.508,0.743-1.223,1.661l4.669,13.677c0.23,0.738,1.044,1.336,1.817,1.336h19.35   c0.773,0,1.586-0.598,1.815-1.336l4.069-14C57.476,18.437,57.036,17.837,56.262,17.837z" /><circle cx="29.417" cy="50.267" r="4.415" /><circle cx="48.099" cy="50.323" r="4.415" /><path d="M53.4,39.004H27.579L17.242,9.261H9.193c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h4.493l10.337,29.743H53.4   c1.381,0,2.5-1.119,2.5-2.5S54.781,39.004,53.4,39.004z" /></g><g /><g /><g /><g /><g /><g /></svg>
      Add To Cart
    </button>
  </section>
</template>
