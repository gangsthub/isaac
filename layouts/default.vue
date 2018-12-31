<template>
  <div
    class="sm:flex min-h-screen"
  >
    <header
      class="sidebar p-4"
      :class="{
        drawerOpen
      }"
    >
      <hamburger-menu
        class="m-4 hm"
      ></hamburger-menu>
      <the-header
        class="main-menu overflow-hidden max-w-full"
      ></the-header>
    </header>
    <main
      class="container overflow-hidden"
    >
      <nuxt/>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TheHeader from '~/components/core/the-header/the-header';
import HamburgerMenu from '~/components/core/hamburger-menu/hamburger-menu';

export default {
  computed: {
    ...mapGetters(['drawerOpen'])
  },
  components: {
    TheHeader,
    HamburgerMenu,
  }
}
</script>

<style>
.main-menu,
.hm,
.sidebar {
  transition: transform .4s ease-out;
}
.sidebar {
  background-color: aquamarine;
  width: 100%;
}
@screen sm {
  .sidebar {
    width: 300px;
  }
  .sidebar:not(.drawerOpen) {
    transform: translateX(-200px)
  }
  .sidebar:not(.drawerOpen) .hm,
  .sidebar:not(.drawerOpen) .main-menu {
    transform: translateX(200px)
  }
}
</style>
