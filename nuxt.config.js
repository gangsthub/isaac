require('babel-polyfill');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'i2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios',
    ],
    babel: {
      presets({ isServer }) {
        if (isServer) return null // Use default
        return [
          ['vue-app', {
            targets: {
              chrome: 40,
              edge: 9,
              firefox: 40,
              ie: 9,
              safari: 7
            }
          }]
        ]
      }
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    // With options
    ['nuxt-netlify-cms', {
      adminPath: 'admin',
      adminTitle: 'Admin!'
    }],
    ['nuxtent']
  ],

}
