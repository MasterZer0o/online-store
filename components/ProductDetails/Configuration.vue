<script setup lang="ts">
const props = defineProps<{ variants: ProductDetails['variants'] }>()

const sizes: Set<string> = new Set()
type ColorCode = string
type ColorName = string

const colors: Map<ColorName, ColorCode> = new Map()

for (const variant of props.variants) {
  sizes.add(variant.size)
  colors.set(variant.colorName, variant.colorCode)
}

const selectedSize = ref<string | null>(null)
const selectedColor = ref({}) as Ref<{ name: string; code: string }>

function selectColor(variant: typeof props.variants[number]) {
  selectedColor.value.name = variant.colorName
  selectedColor.value.code = variant.colorCode
}

function selectSize(size: string) {
  selectedSize.value = size
}
</script>

<template>
  <section class="details-config">
    <div class="config-choices">
      <span>Color: <strong>{{ selectedColor.name }}</strong></span>
      <div class="color-choices">
        <div v-for="[colorName, colorCode] in colors.entries()" :key="colorName" class="color-choice" :class="{ selected: selectedColor.name === colorName }" :style="`background-color:${colorCode};`" @click="selectedColor.name = colorName">
          <ShopTooltip :text="colorName" />
        </div>
      </div>
    </div>
    <div class="size-choices"></div>
    <!-- @@@@ -->
    <!-- <div>
      <span>
        <template v-if="selectedColor.name">
          <span class="color-dot" :style="`background-color: ${selectedColor.code}`"></span>
          Color: <strong>{{ selectedColor.name }}</strong>
        </template>
        <span v-else>Color</span>
        <IconsChevron />
      </span>
      <ul>
        <li v-for="[colorName, colorCode] in colors.entries()" :key="colorCode" @click="selectColor(colors.get(colorName))">
          {{ colorName }}
          <span :style="`background-color: ${colorCode};`"></span>
        </li>
      </ul>
    </div>
    <div>
      <span>
        <template v-if="selectedSize">
          Size: <strong>{{ selectedSize }}</strong>
        </template>
        <span v-else>Size</span>
        <IconsChevron />
      </span>
      <ul>
        <li v-for="size in sizes" :key="size" @click="selectSize(size)">
          {{ size }}
        </li>
      </ul>
    </div> -->
    <!-- @@@@ -->

    <!-- <div>
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
    </div> -->
  </section>
</template>
