<template>
  <header>{{ title }}</header>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Header'
    }
  }
}
</script>