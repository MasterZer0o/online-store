// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['assets/styles/main.scss'],
  /* '@nuxtjs/html-validator', */
  modules: ['nuxt-purgecss', '@vueuse/nuxt', '@unocss/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'skipHydrate'] }]
  ],
  nitro: {
    preset: 'node-server'
  },
  experimental: {
    inlineSSRStyles: false,
    componentIslands: true,
    typedPages: true,
  },
  imports: {
    dirs: ['stores']
  },
  purgecss: {
    enabled: false
  },
  // htmlValidator: {
  //   options: {
  //     rules: {
  //       'multiple-labeled-controls': 'off',
  //       'wcag/h71': 'off',
  //       'input-missing-label': 'off',
  //       'heading-level': 'off'
  //     }
  //   }
  // },
  build: {
    transpile: ['primevue'],
  },
  app: {
    rootId: 'app',
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.svg' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/sanitize.css/1.0.0/sanitize.min.css', referrerpolicy: 'no-referrer', integrity: 'sha512-vtbEZ04AJGFVupeZAJvxGaqZtmFWhLTM2r2DASGabYumle+ke43G/PrqpFcSQXIunnQ0CjliRx+IMCJy/iPbPw==', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400&display=swap' }
      ],
      // theme script
      script: [{
        innerHTML: '(()=>{let e=localStorage.getItem("theme");if(["dark","light"].includes(e)){document.body.setAttribute("class",e);return}let t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";localStorage.setItem("theme",t),document.body.setAttribute("class",t)})();',
        tagPosition: 'bodyOpen'
      }]

    },

    buildAssetsDir: '/public/',

  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'public/assets/[hash][extname]',
          chunkFileNames: 'public/[hash].js',
          entryFileNames: 'public/[hash].js'
        }
      }
    },
  },
  postcss: {
    plugins: {
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_COOKIE_NAME: 'sess',
    SESSION_PASSWORD: 'testtesttesttesttesttesttesttest',
    csrf: {
      algorithm: 'aes-256-cbc',
      secret: 'test',
      headerName: 'X-CSRF'
    },

    BASE_URL: '/shop'

    // ccm
  }
})
