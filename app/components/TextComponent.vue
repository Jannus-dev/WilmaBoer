<script setup lang="ts">
  // defineProps({
  //   text: {
  //     type: String,
  //     required: true
  //   }
  // })
</script>

<template>
  <p class="text w-210 text-2xl mt-10">
    <slot />
  </p>
</template>

<style scoped>
.text {
  white-space: pre-line; /* behoudt enters */
}
</style>