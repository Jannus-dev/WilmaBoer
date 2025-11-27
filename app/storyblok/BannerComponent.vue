<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

// const titel = computed(() => blok.titel_veld);

</script>

<template>
  <div v-editable="blok" class="balk bg-white w-10/12 h-23 rounded-2xl border border-gray-200 flex flex-row justify-evenly items-center">
    <h1 class="text-4xl">{{ blok.titel_veld }}</h1>

    <ButtonComponent/>
  </div>
</template>

<style scoped>

</style>