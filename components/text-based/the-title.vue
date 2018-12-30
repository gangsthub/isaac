<template>
  <div>
    <h1
      v-if="titleText"
      class="text-5xl"
    >{{ titleText }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    titleText: {
      type: String,
      default: ''
    }
  }
}
</script>
