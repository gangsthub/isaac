<template>
  <article>
    <h1>{{ post.title }}</h1>
    <the-time :date="safeDate"></the-time>
    <img class="img-post" :src="post.image">
    <div v-html="parsedBody" class="container py-20" ></div>
  </article>
</template>

<script>
import md from 'md';
const TheTime = () => import('@/components/text-based/the-time')

export default {
  head() {
    return {
      title: `${ (this.post && this.post.title) || 'Post' }`,
      meta: [
        {
          name: 'description',
          content: `${ (this.trimmedDescription) || '' }`,
          hid: 'description'
        }
      ]
    };
  },
  data() {
    return {
      post: {
        title: '',
        description: '',
        date: '',
        image: '',
        body: '',
      }
    }
  },
  async asyncData({ params }) {
    const post = await import('~/content/' + params.collection + '/' + params.slug + '.json');
    return { post };
  },
  computed: {
    parsedBody() {
      return md(this.post.body);
    },
    trimmedDescription() {
      return (this.post.description + '').slice(0, 300)
    },
    safeDate() {
      return (this.post.date)
        .replace(/am$/, '')
        .replace(/pm$/, '')
    }
  },
  components: {
    TheTime
  }
};
</script>
