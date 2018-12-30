// Original author Atinux
// https://github.com/nuxt/nuxt.js/blob/master/examples/dynamic-layouts/middleware/mobile.js
export default function(ctx) {
  if (ctx.isHMR) return
  let userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
  ctx.isMobile = /mobile/i.test(userAgent)
  ctx.store.commit('SET_IS_MOBILE', ctx.isMobile) // device toggle in DevTools will not be triggered here!
}
