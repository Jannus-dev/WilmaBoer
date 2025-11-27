<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()
const content = ref<{ Title?: string; text?: string }>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc($db, 'page', 'SectorOne')
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
  <div class="SectorOne flex">
    <img src="../assets/img/DeurBlauw.png" class="h-screen"></img>
    <div class="text ml-35 mt-15">
      <TitleComponent :text="content.Title || ''" tag="h1" />
      <TextComponent :html-content="content.text || ''" />
    </div>
  </div>
</template>

<style scoped>

</style>