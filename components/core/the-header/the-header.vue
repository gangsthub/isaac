<template>
<div>
  <nav
    aria-labelledby="main-menu"
    role="navigation"
  >
    <h3 id="main-menu" class="sr-only">Menu</h3>
    <transition-group
      class="list-reset"
      tag="ul"
      name="menu-list"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li
        v-for="(page, index) in pages"
        :key="page"
        :data-index="index"
        v-show="drawerOpen"
        class="mt-6 text-xl"
      >
        <nuxt-link
          :to="slugString(page)"
          class="no-underline"
          v-if="page!==HOME"
        >{{ page }}</nuxt-link>
        <nuxt-link
          class="no-underline"
          to="/"
          v-else
        >{{ page }}</nuxt-link>
      </li>
    </transition-group>
  </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tween, styler, easing, chain, delay } from 'popmotion';

import { HOME, pages } from '~/static/pages'
import slugString from '~/plugins/slugString'

const delayAccumulation = 80

export default {
  data() {
    return {
      pages,
      HOME,
    }
  },
  computed: {
    ...mapGetters(['drawerOpen', 'isMobile']),
  },
  methods: {
    slugString,
    myTweeen(from, to) {
      return tween({
        from,
        to,
        ease: easing.easeOut,
        duration: (pages.length + 1) * delayAccumulation
      })
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      const delayTime = el.dataset.index * delayAccumulation
      chain(
        delay(delayTime),
        this.myTweeen(
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1 },
        )
      ).start({
        update: v => styler(el).set(v),
        complete: done,
      });
    },
    leave(el, done) {
      const delayTime = el.dataset.index * delayAccumulation
      chain(
        delay(delayTime),
        this.myTweeen(
          { x: '0%', opacity: 1 },
          { x: '-100%', opacity: 0 },
        )
      ).start({
        update: v => styler(el).set(v),
        complete: done,
      });
    }
  }
}
</script>
