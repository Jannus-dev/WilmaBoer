<script setup lang="ts">
  // defineProps({
  //   text: {
  //     type: String,
  //     required: true
  //   }
  // })
  const props = defineProps<{
    htmlContent: string // Naam van de prop
  }>()
</script>

<template>
  <div v-html="props.htmlContent" class="text-content-wrapper w-210 text-xl mt-10"></div>
</template>

<style scoped>
.text-content-wrapper :deep(ul) {
  /* Herstel de bullets en voeg padding toe, want Tailwind heeft deze verwijderd. */
  list-style-type: disc;
  padding-left: 1.5em; /* Standaard padding voor lijsten */
}

.text-content-wrapper :deep(ol) {
  /* Herstel de nummers en voeg padding toe */
  list-style-type: decimal;
  padding-left: 1.5em; /* Standaard padding voor lijsten */
}

/* Optioneel: Stijl de lijst-items */
.text-content-wrapper :deep(li) {
  margin-bottom: 0.5em;
}

.text-content-wrapper :deep(a) {
  color: #474747;
  text-decoration: underline;
}
</style>