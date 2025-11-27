<!--<script setup lang="ts">-->

<!--import FooterComponent from "~/components/FooterComponent.vue";-->
<!--</script>-->

<!--<template>-->
<!--  <headerComponent />-->
<!--  <TitleSectorComponent />-->
<!--  <SectorOneComponent />-->
<!--  <SectorTwoComponent />-->
<!--  <SectorTreeComponent />-->
<!--  <SectorForeComponent />-->
<!--  <SectorFiveComponent />-->
<!--  <FooterComponent />-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->


<script setup>
const { story } = await useAsyncStoryblok('home', {
  api: {
    version: 'draft', // or 'published'
  },

});
// console.log(story.value.content); // Dit is de data voor het Page component


</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

<style scoped>

</style>