<template>
  <div class="spinner">
    <div class="circle-border">
      <div class="circle-core" />
    </div>
  </div>
</template>

<style lang="scss">
@use '../assets/styles/vars.scss' as *;
.spinner {
  width: fit-content;
  background-color: transparent;
  display: inline-block;
  margin-left: 5px;
  position: absolute;
}
.circle-border {
  width: 15px;
  height: 15px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 3px;
  background: linear-gradient(0deg, rgba(63, 249, 220, 0.07) 33%, rgba(63, 249, 220, 1) 100%);
  animation: spin 0.7s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #2e3440;
  border-radius: 50%;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
