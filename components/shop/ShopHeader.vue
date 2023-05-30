<script setup lang="ts">
const count = 3
</script>

<template>
  <header class="shop-header">
    <div class="wrapper">
      <ShopHeaderNav />
      <section class="actions">
        <div class="action search-action">
          <label>
            <input type="text" placeholder="Search" spellcheck="false">
            <IconsSearch />
          </label>
        </div>

        <div class="action user-action" :data-count="count">
          <IconsCart />
          <ShopTooltip text="Show cart" />
        </div>
        <NuxtLink to="/wishlist">
          <div class="action">
            <IconsHeart width="30" height="30" />
            <ShopTooltip text="Your wishlist" />
          </div>
        </NuxtLink>

        <div class="action">
          <IconsUserFilled />
          <ShopTooltip text="Your account" />
        </div>
      </section>

      <ThemeSwitcher />
    </div>
  </header>
</template>
