<template>
<div>
  <nav
    aria-labelledby="main-menu"
    role="navigation"
  >
    <h3 id="main-menu" class="sr-only">Menu</h3>
    <ul class="list-reset">
      <li
        v-for="page in pages"
        :key="page"
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
    </ul>
  </nav>
</div>
</template>

<script>
import { HOME, pages } from '~/static/pages'
import slugString from '~/plugins/slugString'

export default {
  data() {
    return {
      pages,
      HOME
    }
  },
  components: {
  },
  methods: {
    slugString,
  }
}
</script>