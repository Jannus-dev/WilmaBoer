<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "h1"
    }
  })
</script>

<template>
  <h1 class="text-paars text-7xl">
    {{ text }}
  </h1>
</template>

<style scoped>

</style>