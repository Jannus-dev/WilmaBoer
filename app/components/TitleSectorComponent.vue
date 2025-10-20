<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()
const content = ref<{ Title?: string;}>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc($db, 'page', 'start')
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      content.value = snapshot.data()
    } else {
      console.warn('Document niet gevonden!')
    }
  } catch (err) {
    console.error('Fout bij ophalen data:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="titleSector bg-[url(~/assets/img/schrijvenGroen.png)] bg-cover w-full h-230">
    <h1 class="text-paars text-8xl p-75"> {{ content.Title }} </h1>
  </div>
</template>

<style scoped>

</style>