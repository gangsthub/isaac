<template>
  <div>
    <the-title
      :titleText="collection"
    ></the-title>
  </div>
</template>

<script>
import { pages } from '~/static/pages'
import slugString from '~/plugins/slugString'

const TheTitle = () => import('~/components/text-based/the-title')

export default {
  validate ({ params }) {
    // Must be one of stored pages
    return params.collection && [...pages].map(slugString).includes(params.collection)
  },
  async asyncData({ params }) {
    // const post = await import('~/content/' + params.collection + '*.json');
    return { collection: [...pages].filter(page => slugString(page) === params.collection && page)[0] };
  },
  methods: {
    slugString,
  },
  components: {
    TheTitle
  }
}
</script>
