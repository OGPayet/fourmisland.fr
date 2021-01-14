export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  head: {
    title: "Acheter votre colonie de fourmis - FourmisLand",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "L'élevage des fourmis n'a jamais été aussi simple qu'avec FourmisLand ! Acheter vos fourmis en ligne sur FourmisLand, c'est vous assurer de leur qualité et de leur provenance française."
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
    ],
    script: [
      { src: 'https://www.paypal.com/sdk/js?client-id=AVa3-CT9E7DbWV9LbdelsT0Mn_sw21l2lZJ6dMZ_Z6vF6RsAuuhOmpMbN_bSU4-f-tyF7kuFp6Pojr75&currency=EUR' },
    ] 
  },
  /*
   ** Global CSS
   */
  css: [
    '~assets/css',
    'reset-css/reset.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vue-image-lightbox.js', mode: 'client' },
    '~/plugins/vue-numeric-input.js',
    { src: '~/plugins/vuex-persistedstate.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/moment',
  ],

  moment: {
    locales: ['fr']
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/strapi',
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  proxy: {
    '/paypal': {
      target: 'https://www.paypal.com/sdk/js?client-id=AVa3-CT9E7DbWV9LbdelsT0Mn_sw21l2lZJ6dMZ_Z6vF6RsAuuhOmpMbN_bSU4-f-tyF7kuFp6Pojr75',
      pathRewrite: {
        '^/paypal' : '/'
      },
      changeOrigin: true
    }
  },

  styleResources: {  
    scss: ['./assets/css/index.scss'],  
  },

  strapi: {
    url: process.env.API_URL || "http://localhost:1337",
    entities: [
      'users',
      'commandes',
      'fourmis',
    ],
  },

  env: {
    storeUrl: process.env.STORE_URL || "http://localhost:1337"
  },

  optimizedImages: {
    optimizeImages: true
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
}
