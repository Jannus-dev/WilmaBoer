<script setup lang="ts">
import { doc, getDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()
const content = ref<{ Title?: string; text?: string }>({})
const loading = ref(true)

onMounted(async () => {
  try {
    const docRef = doc($db, 'page', 'SectorTwo')
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
  <div class="sectorTwo bg-backgroundGray h-screen flex flex-col items-center justify-center">
    <div class="content flex">
      <div class="text ml-35 mt-15">
        <TitleComponent :text="content.Title" tag="h1" />
        <TextComponent >
          {{ content.text }}
        </TextComponent>
       </div>
       <img src="../assets/img/ZitRood.png" class="h-160 mt-10" />
      </div>
    <BannerComponent/>
    </div>
</template>

<style scoped>

</style>