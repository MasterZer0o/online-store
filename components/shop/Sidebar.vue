<template>
  <section class="sidebar">
    <div class="filters-container">
      <div>
        <span>
          <strong>Filters</strong>
        </span>
        <button type="button">
          Clear all
        </button>
      </div>
      <div class="active-filters">
        <div v-for="i in 5" :key="i" class="filter">
          <span>Filter</span>
          <button type="button" aria-label="remove filter" title="remove filter">
            <svg height="12px" width="12px" fill="white" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" /></svg>
          </button>
        </div>
      </div>
    </div>
    <ShopFilters />
  </section>
</template>
