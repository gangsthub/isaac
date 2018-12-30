<template>
  <div class="sm:flex min-h-screen">
    <header class="sidebar">
      <the-header></the-header>
    </header>
    <main class="container">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import TheHeader from '~/components/core/the-header/the-header';

export default {
  components: {
    TheHeader
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
