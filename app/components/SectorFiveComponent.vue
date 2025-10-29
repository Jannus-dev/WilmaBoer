<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()
const content = ref<{ Title?: string; text?: string }>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc($db, 'page', 'SectorFive')
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
    <img src="../assets/img/BlauwIntuin.jpg" class="h-screen" alt="BlauwIntuin" />
    <div class="text ml-35 mt-15">
      <TitleComponent :text="content.Title || ''" tag="h1" />
      <TextComponent>
        {{ content.text }}
      </TextComponent>
    </div>
  </div>
</template>

<style scoped>

</style>