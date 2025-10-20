<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
import { signOut } from 'firebase/auth'
const user = computed(() => $auth.currentUser)
import { doc, getDoc, updateDoc } from 'firebase/firestore'
const { $db } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const sector = route.params.sector as string
const content = ref({ Title: '', Description: '' })
const loading = ref(true)
const saving = ref(false)
const message = ref('')

// Data ophalen
onMounted(async () => {
  const docRef = doc($db, 'page', sector)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    content.value = snapshot.data()
  }
  loading.value = false
})

// Opslaan
const saveChanges = async () => {
  saving.value = true
  const docRef = doc($db, 'page', sector)
  await updateDoc(docRef, content.value)
  message.value = '✅ Opgeslagen!'
  saving.value = false
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Edit sector: {{ sector }}</h1>

    <div v-if="loading">Laden...</div>

    <div v-else class="space-y-4">
      <input v-model="content.Title" class="w-full border rounded px-3 py-2" placeholder="Titel" />
      <textarea v-model="content.text" rows="6" class="w-full border rounded px-3 py-2 h-full" placeholder="Beschrijving"></textarea>

      <div class="flex justify-between items-center">
        <button @click="router.push('/dashboard')" class="text-gray-600 hover:text-gray-800">← Terug</button>
        <button @click="saveChanges" :disabled="saving" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          {{ saving ? 'Opslaan...' : 'Opslaan' }}
        </button>
      </div>

      <p v-if="message" class="text-green-600">{{ message }}</p>
    </div>
  </div>
</template>
