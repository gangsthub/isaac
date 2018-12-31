<template>
  <section class="container">
    <transition-group name="category" tag="ul" class="grid list-reset">
      <li v-for="(post, i) in items" :key="i + post.title[1]">
        <!-- <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link> -->
        <div
          :style="`background-image: url(${post.image})`"
          class="thumbnail"
          :title="post.title"
          v-show="selected[post.collectionName]"
        ></div>
      </li>
    </transition-group>
  </section>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    // Using webpacks context to gather all files from a folder
    // https://webpack.js.org/guides/dependency-management/#require-context
    const context = require.context('~/content/', true, /\.json$/);
    const items = context.keys()
      .map(k => console.log(k) || k)
      .map(key => {
        const path = `${
          key
            .replace('.json', '')
            .replace(/\./, '')
        }`
        const collectionName = this.getCollectionName(path)
        return {
          ...context(key),
          _path: path,
          collectionName
        }
      });

    return {
      items,
      selected: items
        .map(item => this.getCollectionName(item._path))
        .reduce((acc, collectionName) => ({
            ...acc,
            [collectionName]: true
        }), {})
    }
  },
  methods: {
    getCollectionName(path) {
      const match = ('' + path).match(/^\/.+\//)
      if (match) {
        return match[0]
          .replace(/\//g, '')
      }
      return path
    }
  }
};
</script>

<style scoped>
.grid {
  grid-template-columns: repeat(3, 16rem);
  grid-template-columns: repeat(3, minmax(16rem, 1fr));
  grid-gap: 1em;
}
.thumbnail {
  min-height: 16rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
