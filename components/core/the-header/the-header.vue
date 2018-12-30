<template>
<div>
  <nav aria-labelledby="main-menu">
    <h2 id="main-menu">Menu</h2>
    <ul>
      <li
        v-for="page in pages"
        :key="page"
      >
        <nuxt-link
          :to="slugString(page)"
          v-if="page!==HOME"
        >{{ page }}</nuxt-link>
        <nuxt-link
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