<template>
  <section class="container">
    <ul v-for="(category, i) in Object.keys(items)" :key="category + i" class="list-reset">
      <li>
        <ul v-for="post in items[category]" :key="i + post.title[1]">
          <li>
            <nuxt-link :to="post._path">
              {{ post.title }}
            </nuxt-link>
          </li>
        </ul>
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
    // https://webpack.js.org/guides/dependency-management/#require-context
    const context = require.context('~/content/', true, /\.json$/);
    const collectionItems = context.keys()
      // .map(k => console.log(k) || k)
      .map(key => ({
        ...context(key),
        _path: `/${
          key
            .replace('.json', '')
            .replace('./', '')
        }`
      }));

    return {
      collections: this.discardDupes(collectionItems.map(item => this.getCollectionName(item._path))),
      items: collectionItems
        .map(item => this.getCollectionName(item._path))
        .reduce((acc, collectionName) => ({
            ...acc,
            [collectionName]: collectionItems.filter(item => {
              const match = ('' + item._path).match(new RegExp(`^\/${collectionName}\/`))
              return this.getCollectionName(match)
            })
        }), {})
    }
  },
  methods: {
    getCollectionName(path) {
      const match = ('' + path).match(/^\/.+\//)
      if (match) {
        return match[0].replace(/\//g, '')
      }
      return path
    },
    discardDupes(array) {
      return array.reduce(function(acc, curr){ if(acc.indexOf(curr) < 0) acc.push(curr); return acc; }, []);
    }
  }
};
</script>
