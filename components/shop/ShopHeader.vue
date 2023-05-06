<script setup lang="ts">

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

        <div class="action">
          <IconsCompare />
          <ShopTooltip text="Compare products" />
        </div>

        <div class="action">
          <IconsCart />
          <ShopTooltip text="Show cart" />
        </div>
      </section>
      <ThemeSwitcher />
      <section class="account-manage">
        <span>Account</span>
      </section>
    </div>
  </header>
</template>
