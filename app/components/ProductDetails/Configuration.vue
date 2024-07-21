<script setup lang="ts">
const props = defineProps<{ variants: ProductDetails['variants'] }>()

type ColorCode = string
type ColorName = string

const sizes: Set<string> = new Set()
const colors: Map<ColorName, ColorCode> = new Map()

for (const variant of props.variants) {
  sizes.add(variant.size)
  colors.set(variant.colorName, variant.colorCode)
}

const selectedSize = ref<string | null>(null)
const selectedColor = ref({}) as Ref<{ name: string; code: string }>

const availableSizes = computed(() => {
  if (!selectedColor.value.name)
    return Array.from(sizes)

  return props.variants.reduce<string[]>((acc, variant) => {
    if (variant.colorName === selectedColor.value.name && variant.available)
      acc.push(variant.size)

    return acc
  }, [])
})

function selectColor(colorName: typeof props.variants[number]['colorName']) {
  selectedColor.value.name = colorName

  const selectedColorSizes = props.variants.reduce<string[]>((acc, variant) => {
    if (variant.colorName === colorName)
      acc.push(variant.size)

    return acc
  }, [])

  if (!selectedColorSizes.includes(selectedSize.value as string))
    selectedSize.value = null
}

function selectSize(size: string) {
  if (!availableSizes.value.includes(size) || selectedSize.value === size || !selectedColor.value.name)
    return

  selectedSize.value = size
}
</script>

<template>
  <section class="details-config">
    <div class="config-choices">
      <span v-if="selectedColor.name">Color: <strong>{{ selectedColor.name }}</strong></span>
      <ul class="color-choices">
        <li
          v-for="[colorName, colorCode] in colors.entries()" :key="colorName"
          class="color-choice"
          :class="{ selected: selectedColor.name === colorName }"
          :style="`background-color:${colorCode};`"
          @click="selectColor(colorName)"
        >
          <ShopTooltip :text="colorName" />
        </li>
      </ul>
    </div>
    <div class="size-choices">
      <div>
        Size:
        <ul>
          <li
            v-for="size in sizes.values()"
            :key="size"
            :class="{
              selected: selectedSize === size,
              disabled: !availableSizes.includes(size)
            }"
            @click="selectSize(size)"
          >
            {{ size }}
          </li>
        </ul>
        <IconsChevron />

        <ul class="sizes-dropdown">
          <li
            v-for="size in sizes.values()"
            :key="size"
            :class="{
              disabled: !availableSizes.includes(size)
            }"
            @click="selectSize(size)"
          >
            <strong>{{ size }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
