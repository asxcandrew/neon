export default {
  router: {
    middleware: ['auth']
  },
  head: {
    titleTemplate: 'Neon | %s',
    meta: [
      { property: 'og:image', content: 'https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://api.hnpwa.com' },
      { rel: 'preconnect', href: 'https://api.hnpwa.com' }
    ]
  },
  css: [
    // SCSS file in the project
    '@/assets/style/main.scss'
  ],
  loading: {
    color: '#59cc93'
  },

  manifest: {
    name: 'Communication freely',
    short_name: 'Neon',
    description: 'HackerNews clone built with Nuxt.js',
    theme_color: '#188269',
    start_url: '/news?stand_alone=1'
  },

  modules: [
    '~/modules',
    'cookie-universal-nuxt',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          file: 'en-US.js'
        },
        {
          code: 'ru',
          iso: 'ru-RU',
          name: 'Русский',
          file: 'ru-RU.js'
        },
      ],
      defaultLocale: 'en',
      lazy: true,
      langDir: 'lang/'
    }]
  ],

  axios: {
    baseURL: '/api/v1/'
  },
  proxy: [
    'http://localhost:80/api/v1'
  ],

  plugins: [
    '~/plugins/filters',
    '~/plugins/axios'
  ],

  render: {
    http2: {
      push: true
    },
    static: {
      maxAge: '1y',
      setHeaders(res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', `public, max-age=${15 * 60}`)
        }
      }
    }
  }
}
