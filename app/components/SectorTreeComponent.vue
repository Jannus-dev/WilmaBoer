<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()
const content = ref<{ Title?: string; text?: string }>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc($db, 'page', 'SectorThree')
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
  <div class="SectorOne flex items-stretch">
    <img src="../assets/img/GreenWindow.png"></img>
    <div class="text ml-10 mt-15 mr-10">
      <TitleComponent :text="content.Title || ''" tag="h1" />
      <TextComponent class="pb-10">
        {{ content.text }}
      </TextComponent>
    </div>
  </div>
</template>

<style scoped>

</style>