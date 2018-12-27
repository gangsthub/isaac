<template>
  <section class="container">
    <h1>Collections</h1>
    <ul>
      <li v-for="post in posts" :key="post.date">
        <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  components: {
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const context = require.context('~/content/', true, /\.json$/);
    const posts = context.keys()
      .map(k => console.log(k) || k)
      .map(key => ({
        ...context(key),
        _path: `/${key.replace('.json', '').replace('./', '')}`
      }));

    return { posts };
  }
};
</script>
