<template>
  <div
    class="sm:flex min-h-screen"
  >
    <header class="sidebar"
      ref="sideBar"
    >
      <hamburger-menu
        ref="hm"
        class="m-4 hm"
      ></hamburger-menu>
      <the-header
        ref="menu"
        class="main-menu"
      ></the-header>
    </header>
    <main class="container">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tween, styler, easing, parallel } from 'popmotion';

import TheHeader from '~/components/core/the-header/the-header';
import HamburgerMenu from '~/components/core/hamburger-menu/hamburger-menu';

const ease = .2
const hiddenScale = .325
const shownScale = 1

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['drawerOpen']),
  },
  watch: {
    drawerOpen(willBeOpen) {
      this.updateMenu(willBeOpen)
      this.updateMenuContent(willBeOpen)
    }
  },
  methods: {
    myTweeen(from, to) {
      return tween({
        from,
        to,
        ease: easing.easeOut,
        duration: 300
      })
    },
    transition(willOpen, smallState, bigState) {
      return willOpen ?
        this.myTweeen(smallState, bigState) :
        this.myTweeen(bigState, smallState)
    },
    sideBarAction(willOpen) {
      const small = { scaleX: hiddenScale }
      const big = { scaleX: shownScale }
      return this.transition(willOpen, small, big)
    },
    hmAction(willOpen) {
      const small = { scaleX: 1 / hiddenScale }
      const big = { scaleX: shownScale }
      return this.transition(willOpen, small, big)
    },
    menuAction(willOpen) {
      const small = { scaleX: 1 / hiddenScale, opacity: 0 }
      const big = { scaleX: shownScale, opacity: 1 }
      return this.transition(willOpen, small, big)
    },
    updateMenu(willBeOpen) {
      const containerStyler = styler(this.$refs.sideBar)
      this.sideBarAction(willBeOpen).start(v => containerStyler.set(v))
    },
    updateMenuContent(willBeOpen) {
      const hmStyler = styler(this.$refs.hm.$el)
      const menuStyler = styler(this.$refs.menu.$el)
      parallel(
        this.hmAction(willBeOpen),
        this.menuAction(willBeOpen),
      ).start(([contentOutput, menuOutput]) => {
        hmStyler.set(contentOutput)
        menuStyler.set(menuOutput)
      })
    }
  },
  components: {
    TheHeader,
    HamburgerMenu,
  }
}
</script>

<style scoped>
.sidebar {
  @apply p-4;
  overflow: hidden;
}

.main-menu,
.hm,
.sidebar {
  transform-origin: 0 center;
  will-change: transform;
}


</style>
