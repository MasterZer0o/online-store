<script setup lang="ts">
const store = wishlistStore()
definePageMeta({
  middleware: ['protected']
})
const isPending = ref(true)
onMounted(async () => {
  await fetchWishlist()
  isPending.value = false
})
const items = computed(() => store.items)

// TODO: link to product
</script>

<template>
  <div class="wishlist">
    <h1>Wishlist</h1>
    <ul v-if="items.size !== 0 && !store.error" class="entries">
      <ShopWishlistItem v-for="item in store.items.values()" :product="item" />
    </ul>
    <svg v-if="isPending" class="spinner" width="24" height="24" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g>
    </svg>
    <h3 v-if="items.size === 0 && !isPending && !store.error" class=":uno: text-center">
      You have no items in your wishlist.
    </h3>

    <h2 v-if="store.error" class=":uno: text-red-600 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M11.94 2a2.99 2.99 0 0 1 2.45 1.279l.108 .164l8.431 14.074a2.989 2.989 0 0 1 -2.366 4.474l-.2 .009h-16.856a2.99 2.99 0 0 1 -2.648 -4.308l.101 -.189l8.425 -14.065a2.989 2.989 0 0 1 2.555 -1.438zm.07 14l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path>
      </svg> {{ store.error }}
    </h2>
  </div>
</template>

<style lang="scss">
.wishlist {
  margin: auto;
  margin-top: 4em;
  max-width: 48rem;
  h1 {
    text-align: center;
    padding-bottom: 1em;
    border-bottom: 1px solid gray;
    margin-bottom: 2em;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;

    li a{
      font-size: 1.15em;
      display: flex;
      align-items: center;
      background-color: var(--bg2);
      border-radius: 5px;
      transition: background-color 250ms ease-in-out;
      position: relative;

      svg {
        position: absolute;
        left: -50px;
        cursor: pointer;

        & ~ .tooltip {
          font-size: 0.75em;
          right: 101%;
          bottom: 25%;

          &::before {
            all: unset;
          }
        }

        &:hover ~ .tooltip::after {
          pointer-events: all;
          opacity: 1;
        }
      }

      &:hover {
        background-color: var(--bg3);
      }

      img {
        //@temp
        background-color: gray;
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 5px;

        margin-right: 1em;
      }

      .wishlist-price {
        margin-left: auto;
        margin-right: 1em;
        text-align: right;
        min-width: fit-content;

        &:not(:has(:nth-child(2))) {
          font-weight: bold;
        }

        &:has(:nth-child(2)) > span:first-child {
          text-decoration: line-through;
        }

        & > span {
          display: block;
        }
      }
    }
  }
}
.spinner {
  margin: auto;
  display: block;
  width: fit-content;
}

.spinner_V8m1 {
  transform-origin: center;
  animation: spinner_zKoa 2s linear infinite;
}
.spinner_V8m1 circle {
  stroke-linecap: round;
  animation: spinner_YpZS 1.5s ease-in-out infinite;
}
@keyframes spinner_zKoa {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner_YpZS {
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0;
  }
  47.5% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -16;
  }
  95%,
  100% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -59;
  }
}
</style>
