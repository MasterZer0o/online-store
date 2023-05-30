<script setup lang="ts">
// TODO: link to product
</script>

<template>
  <div class="wish-list">
    <h1>Wish list</h1>
    <ul class="entries">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M18 6l-12 12"></path>
          <path d="M6 6l12 12"></path>
        </svg>
        <img src="" alt="" width="80" height="80">
        <p>Lorem ipsum dolor, sit amet consectetur</p>
        <span>14.99zł</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.wish-list {
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

  li {
    font-size: 1.15em;
    display: flex;
    align-items: center;
    background-color:var(--bg2);
    border-radius: 5px;
    transition: background-color 250ms ease-in-out;
    position: relative;

    svg {
      position: absolute;
      left: -40px;
      cursor: pointer;
    }

    &:hover {
      background-color: var(--bg3);
    }

    img {
      //@temp
      background-color:gray;
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 1em;
      }

      span{
        margin-left: auto;
        margin-right: 2em;
        font-weight: bold;
      }
    }

}
}
</style>
