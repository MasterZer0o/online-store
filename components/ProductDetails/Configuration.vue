<script setup lang="ts">
const props = defineProps<{ variants: ProductDetails['variants'] }>()

const sizes: string[] = []
const colors: { code: string; name: string }[] = []

for (const variant of props.variants) {
  sizes.push(variant.size)
  colors.push({
    code: variant.colorCode,
    name: variant.colorName
  })
}
const selectedSize = ref<string>()
const selectedColor = ref<string>()

function selectColor(colorName: typeof colors[number]['name']) {
  selectedColor.value = colorName
}

function selectSize(size: typeof sizes[number]) {
  selectedSize.value = size
}
</script>

<template>
  <section class="details-config">
    <div>
      <span>Choose color</span>
      <div class="color-picks">
        <div v-for="color in colors" :key="color.name" class="color-pick" :class="{ selected: selectedColor === color.name }" :style="`color:${color.code}`" @click="selectColor(color.name)">
          <strong>{{ color.name }}</strong>
        </div>
      </div>
    </div>
    <div>
      <span>Choose size</span>
      <div class="size-picks">
        <div v-for="size in sizes" :key="size" class="size-pick" :class="{ selected: selectedSize === size }" @click="selectSize(size)">
          {{ size }}
        </div>
      </div>
    </div>
  </section>
</template>
