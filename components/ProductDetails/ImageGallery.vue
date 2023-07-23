<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import { Arrow } from '@egjs/flicking-plugins'

const imageURLS = ['https://a.allegroimg.com/s180/110c19/07704296419fbd26878af0c7417f/Polar-Bluza-moro-Helikon-Patriot-PL-Woodland-L', 'https://a.allegroimg.com/s180/11efe2/84fd68e24259a3fe1236549fd7e8/FRANKFIELD-Bluza-Meska-rozpinana-Regular-Fit-XL', 'https://a.allegroimg.com/s180/11a25d/0d53f73444919acac6137adb0631/Polar-Bluza-Helikon-Classic-Army-Olive-Black-M', 'https://a.allegroimg.com/s180/11ca40/d8d43da14cfa9ec94f869e880262/Bluza-Helikon-Range-Hoodie-Topcool-Coyote-Green-L', 'https://a.allegroimg.com/s180/11d748/4b4c9d1447f899709e87d5c182bf/Polar-Bluza-Helikon-Liberty-Black-L']
const plugins = [new Arrow()]
// TODO: add click handler to change big image
// TODO: add photoswipe
</script>

<template>
  <section class="details-gallery">
    <Flicking :options="{ bound: true, align: 'prev', duration: 200, panelsPerView: 4, noPanelStyleOverride: true }" :plugins="plugins">
      <img v-for="imageURL in imageURLS" :key="imageURL" :src="imageURL" alt="" width="85" draggable="false" />
      <template #viewport>
        <button v-show="imageURLS.length > 4" class="flicking-arrow-prev">
          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M13 20a2.98 2.98 0 0 1-2.122-.879L3.757 12l7.122-7.121c1.133-1.133 3.11-1.133 4.243 0C15.688 5.445 16 6.199 16 7s-.312 1.555-.879 2.122L12.243 12l2.878 2.879c.567.566.879 1.32.879 2.121s-.312 1.555-.879 2.122A2.98 2.98 0 0 1 13 20zm-6.415-8l5.708 5.707a1.024 1.024 0 0 0 1.414 0c.189-.189.293-.439.293-.707s-.104-.518-.293-.707L9.415 12l4.292-4.293c.189-.189.293-.44.293-.707s-.104-.518-.293-.707a1.023 1.023 0 0 0-1.414-.001L6.585 12z" />
          </svg>
        </button>
        <button v-show="imageURLS.length > 4" class="flicking-arrow-next">
          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M10 20a2.98 2.98 0 0 1-2.122-.879C7.312 18.555 7 17.801 7 17s.312-1.555.879-2.122L10.757 12L7.879 9.121C7.312 8.555 7 7.801 7 7s.312-1.555.879-2.122c1.133-1.132 3.109-1.133 4.243.001L19.243 12l-7.122 7.121A2.976 2.976 0 0 1 10 20zm0-14a.995.995 0 0 0-1 1c0 .267.104.518.293.707L13.585 12l-4.292 4.293C9.104 16.482 9 16.732 9 17s.104.518.293.707a1.023 1.023 0 0 0 1.414.001L16.415 12l-5.708-5.707A.991.991 0 0 0 10 6z" />
          </svg>
        </button>
      </template>
    </Flicking>
  </section>
</template>
