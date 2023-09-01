<script setup lang="ts">
defineProps<{ count: string }>()

const reviews = [
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu fermentum quam. Vivamus vestibulum, tortor vitae dapibus bibendum, mi nulla consectetur felis, at laoreet dolor odio id mauris. Vivamus gravida eget neque quis facilisis. In sit amet sollicitudin nibh, sed hendrerit lectus. Fusce sit amet aliquam augue. In egestas vitae.',
    username: 'Test1 test1',
    rating: 4.5,
    time: '1 day ago'
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu fermentum quam. Vivamus vestibulum, tortor vitae dapibus bibendum, mi nulla consectetur felis, at laoreet dolor odio id mauris. Vivamus gravida eget neque quis facilisis. In sit amet sollicitudin nibh.',
    username: 'Test2 test2',
    rating: 1,
    time: '1 day ago'
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu fermentum quam. Vivamus vestibulum, tortor vitae dapibus bibendum, mi nulla consectetur felis, at laoreet dolor odio id mauris',
    username: 'Test3 test3',
    rating: 3,
    time: '1 day ago'
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu fermentum quam. Vivamus vestibulum, tortor vitae dapibus bibendum, mi nulla consectetur felis, at laoreet dolor odio id mauris',
    username: 'Test4 test4',
    rating: 2,
    time: '1 day ago'
  }
]
const starFilter = ref(null)
</script>

<template>
  <div class="flex items-center">
    <p class=":uno: text-2xl my-3">
      User Reviews <span class=":uno: text-lg">({{ count }})</span>
    </p>
    <div class="star-dropdown">
      <button>
        {{ starFilter }} <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="15" width="15" :fill="starFilter ? '#dfc01b' : '#ffffff95'"><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
      </button>
      <ul>
        <li>
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="15" width="15" fill="#ffffff95"><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
          <span>(123)</span>
        </li>
        <li v-for="i in 5" :key="i">
          {{ i }}
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="17" width="17" fill="#ffffff95"><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
          <span>(23)</span>
        </li>
      </ul>
    </div>
  </div>
  <section class="reviews-content">
    <ProductDetailsReviewsPanelReview v-for="review in reviews" :key="review.username" :review="review" />
  </section>
</template>
