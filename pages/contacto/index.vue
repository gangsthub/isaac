<template>
  <the-title
    titleText="Contacto"
  ></the-title>
</template>

<script>
const TheTitle = () => import('~/components/text-based/the-title')

export default {
  name: 'Contacto',
  components: {
    TheTitle,
  }
}
</script>