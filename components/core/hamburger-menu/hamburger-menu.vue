<template>
  <div class="hamburger-menu">
    <a
            role="button"
      @click="switchDrawer"
      id="main-menu-toggle"
      :aria-expanded="drawerOpen"
      aria-label="Open main menu"
      aria-controls="main-menu"
      class="block hamburger-menu__wrapper"
    >
      <span class="sr-only">Open main menu</span>
      <div
        class="hamburger-menu__icon"
        aria-hidden="true"
        :class="{
          animate: drawerOpen
        }"
      >
        <div
          class="hamburger-menu__bar"
          :class="{
            animate: drawerOpen
          }"
        ></div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['drawerOpen']),
  },
  methods: {
    ...mapActions(['switchDrawer']),
  },
}
</script>

<style>
/* animation: https://codepen.io/husnimun/pen/GJgjbE */
:root {
  --hm-bar-width: 1.5em;
  --hm-bar-height: .25em;
  --hm-bar-spacing: .5em;
  --hm-transition-time: 600ms;
  --hm-transition-function: var(--hm-transition-function);
}

.hamburger-menu {
  font-size: 16px;
}

.hamburger-menu__wrapper {
  position: relative;
  width: var(--hm-bar-width);
  height: calc(var(--hm-bar-height) + var(--hm-bar-spacing) * 2);
}

.hamburger-menu__icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: var(--hm-bar-width);
  height: calc(var(--hm-bar-height) + var(--hm-bar-spacing) * 2);
  cursor: pointer;
  &.animate {
    transform: rotate(180deg);
  }
}
.hamburger-menu__icon,
.hamburger-menu__bar,
.hamburger-menu__bar:after,
.hamburger-menu__bar:before {
  transition-property: transform,
                        width,
                        top,
                        bottom;
  transition-duration: var(--hm-transition-time);
  transition-timing-function: var(--hm-transition-function);
}

.hamburger-menu__bar,
.hamburger-menu__bar:after,
.hamburger-menu__bar:before {
  @apply bg-secondary;
  width: var(--hm-bar-width);
  height: var(--hm-bar-height);
}

.hamburger-menu__bar {
  position: relative;
  transform: translateY(var(--hm-bar-spacing));
  &:before,
  &:after {
    content: '';
    position: absolute;
    right: 0;
  }
}

.hamburger-menu__bar:before {
  bottom: var(--hm-bar-spacing);
}

.hamburger-menu__bar:after {
  top: var(--hm-bar-spacing);
}

.hamburger-menu__bar.animate:after {
  width: calc(var(--hm-bar-width) / 1.5);;
  transform: rotate(-45deg) translateX(calc(calc(var(--hm-bar-width) / 4) - .0625em)); /* 1/16=0.0625 */
}

.hamburger-menu__bar.animate:before {
  width: calc(var(--hm-bar-width) / 1.5);;
  transform: rotate(45deg) translateX(calc(calc(var(--hm-bar-width) / 4) - .0625em)); /* 1/16=0.0625 */
}
</style>
