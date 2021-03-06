const glob = require('glob-all')
const path = require('path')

const pkg = require('./package')
const tailwindConfig = require('./tailwind.config')

const socialLinks = require('./assets/social-links')

const APP_NAME = 'isaacMahow'
const APP_URL = 'isaacMahow.com'
const APP_COVER_IMG = '/cover.png';
const THEME_COLOR = tailwindConfig.colors['indigo-darker']

const dynamicRoutes  = getDynamicPaths({
  '/canvas': 'canvas/*.json',
});

const isProd = process.env.NODE_ENV === 'production';

const envDependantModules =
  isProd ?
    [
      ['@nuxtjs/pwa', { oneSignal: false }]
    ] :
      [];

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} - Isaac Mahow` : `Isaac Mahow`
    },
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      // PWA
      { name: 'msapplication-TileColor', content: '#2b5797' },
      { name: 'apple-mobile-web-app-title', content: APP_NAME },
      { name: 'application-name', content: APP_NAME },
      { name: 'theme-color', content: THEME_COLOR },
      // Social OG
      { property: 'og:type', content: 'profile' },
      { property: 'og:title', content: APP_NAME },
      { property: 'og:url', content: APP_URL },
      { property: 'og:image', content: APP_URL + APP_COVER_IMG },
      { property: 'og:image:width', content: '791' },
      { property: 'og:image:height', content: '399' },
      { property: 'profile:first_name', content: 'Isaac' },
      { property: 'profile:last_name', content: 'Mahow' },
      // Twitter
      { property: 'twitter:title', content: APP_NAME },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:description', content: pkg.description },
      { name: 'twitter:image:src', content: APP_URL + APP_COVER_IMG },
      // Search engines
      { name: 'image', content: APP_URL + APP_COVER_IMG },
      // Schema.org for Google
      { itemprop: 'name', content: APP_NAME },
      { itemprop: 'description', content: pkg.description },
      { itemprop: 'image', content: APP_URL + APP_COVER_IMG },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=1' },
    ]
  },
  /*
  ** Load global CSS
  */
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
  ],
  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active',
    // middleware: [
    //    'isMobile'
    // ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: THEME_COLOR },
  /*
  ** Build configuration
  */
  plugins: [
  ],
  modules: [
    ['@nuxtjs/axios'],
    ['nuxt-purgecss'],
    ...envDependantModules,
  ],
  /*
  ** @nuxt/axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** nuxt-purgecss module configuration
  */
  purgeCSS: {
    // See https://github.com/Developmint/nuxt-purgecss
    mode: 'postcss',
    // https://github.com/FullHuman/purgecss/issues/67
    // https://github.com/Developmint/nuxt-purgecss/issues/14
    // whitelistPatterns: [/^(lang)/, /token/gm]
  },
  workbox: {
    offlineAssets: ['/logo/graficos.svg']
  },
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    APP_NAME,
    social: {
      ...socialLinks
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Route config for pre-rendering
  */
  generate: {
    routes: dynamicRoutes
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
