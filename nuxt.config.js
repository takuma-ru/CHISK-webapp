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

  loadingIndicator: {
    name: './assets/loadingIndicator.html',
  },

  ssr: false,

  head: {
    titleTemplate: '%s｜CHISK',
    title: 'CHISK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=n' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: '楽しくタスクがこなせるWebアプリ' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'CHISK(楽しくタスクをこなそう！)' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://next-taskmgt.web.app/' },
      { hid: 'og:title', property: 'og:title', content: 'CHISK' },
      { hid: 'og:description', property: 'og:description', content: '楽しくタスクがこなせるWebアプリ' },
      { hid: 'og:image', property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/taskmgt-fd097.appspot.com/o/feature.png?alt=media&token=35f7a7b5-b011-4f3d-a461-3e2e42ff2bd5' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://firebasestorage.googleapis.com/v0/b/taskmgt-fd097.appspot.com/o/feature.png?alt=media&token=35f7a7b5-b011-4f3d-a461-3e2e42ff2bd5' },
      { name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@takumaru_2222' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+1:wght@100;300;400;500;700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/icon_512x512.svg' },
      { rel: 'canonical', href: '/' },
    ],
  },

  css: [
  ],

  plugins: [
    { src: '~/plugins/firebase.ts' },
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['./assets/scss/variables.scss'],
  },

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
      background_color: '#002550',
      theme_color: '#002550',
      shortcuts: [
        {
          name: 'Open Taskboard',
          short_name: 'Taskboard',
          description: 'Open Taskboard',
          url: '/taskboard',
          icons: [{ src: '/icons/icon_192.svg', sizes: '192x192' }],
        },
        {
          name: 'Open Setting',
          short_name: 'Setting',
          description: 'Open Setting',
          url: '/setting',
          icons: [{ src: '/icons/icon_192.svg', sizes: '192x192' }],
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

  build: {
  },
}
