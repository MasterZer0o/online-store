<script setup lang="ts">
const colors = [{
  name: 'color1',
  hex: '#BBD278'
},
{
  name: 'color2',
  hex: '#BBC1F8'
},
{
  name: 'color3',
  hex: '#BBD278'
},
{
  name: 'color4',
  hex: '#FFD3F8'
},
{
  name: 'color5',
  hex: '#ECDECC'
}
]
// TODO: handle color variant - select current
function selectColor(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (target.classList.contains('selected'))
    return

  document.querySelector('.color-pick.selected')?.classList.remove('selected')
  target.classList.add('selected')
}
</script>

<template>
  <section class="details-config">
    <div>
      <span>Choose a color</span>
      <div class="color-picks">
        <div v-for="color in colors" :key="color.hex" class="color-pick" :style="`color:${color.hex}`" @click="selectColor">
          <strong>{{ color.name }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>