import colors from 'vuetify/es5/util/colors'

export default {
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDERID: process.env.MESSAGING_SENDERID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
  },

  ssr: false,

  head: {
    titleTemplate: '%s | CHISK',
    title: 'CHISK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon_512x512.svg' },
    ],
  },

  css: [
  ],

  plugins: [],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  modules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    icon: false,
    manifest: {
      lang: 'ja',
      name: 'CHISK',
      short_name: 'CHISK',
      description: '## Build Setup',
      start_url: '/',
      display_override: ['window-controls-overlay'],
      display: 'standalone',
      background_color: '#7786FF',
      theme_color: '#7786FF',
      shortcuts: [
        {
          name: 'Open DashBoard',
          short_name: 'DashBoard',
          description: 'Open DashBoard',
          url: '/dashboard',
        },
        {
          name: 'Open Setting',
          short_name: 'Setting',
          description: 'Open Setting',
          url: '/setting',
        },
      ],
      icons: [
        {
          src: '/icons/icon_64.svg',
          sizes: '64x64',
          purpose: 'any',
        },
        {
          src: '/icons/icon_120.svg',
          sizes: '120x120',
          purpose: 'any',
        },
        {
          src: '/icons/icon_144.svg',
          sizes: '144x144',
          purpose: 'any',
        },
        {
          src: '/icons/icon_152.svg',
          sizes: '152x152',
          purpose: 'any',
        },
        {
          src: '/icons/icon_192.svg',
          sizes: '192x192',
          purpose: 'any',
        },
        {
          src: '/icons/icon_384.svg',
          sizes: '384x384',
          purpose: 'any',
        },
        {
          src: '/icons/icon_512.svg',
          sizes: '512x512',
          purpose: 'any',
        },
      ],
      screenshots: [
        {
          src: '/screenshots/screenshots_01.png',
          sizes: '384x854',
          type: 'image/gif',
        },
      ],
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false,
      icons: 'mdi' || 'fa',
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
  },
}
