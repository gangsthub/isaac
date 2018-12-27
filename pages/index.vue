<template>
  <section class="container">
    <h1>Blog</h1>
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
    const context = require.context('~/content/blog/posts/', false, /\.json$/);

    const posts = context.keys().map(key => ({
      ...context(key),
      _path: `/blog/${key.replace('.json', '').replace('./', '')}`
    }));

    return { posts };
  }
};
</script>
