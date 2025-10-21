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
  message.value = 'De wijzegingen zijn opgeslagen en te zien op de website'
  saving.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">

      <!-- Logo -->
      <div class="flex justify-center">
        <img
            src="../../../assets/img/Logo.svg"
            alt="Logo"
            class="h-20"
        />
      </div>

      <!-- Titel -->
      <h1 class="text-3xl font-extrabold text-gray-900 text-center">
        Bewerk sector: <span class="text-LichtPaars">{{ sector }}</span>
      </h1>

      <div v-if="loading" class="text-gray-500 text-center py-10">Laden...</div>

      <div v-else class="space-y-6">
        <!-- Titel input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titel</label>
          <input
              v-model="content.Title"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-LichtPaars focus:border-LichtPaars transition"
              placeholder="Titel"
          />
        </div>

        <!-- Beschrijving textarea -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
          <textarea
              v-model="content.text"
              rows="15"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-LichtPaars focus:border-LichtPaars transition resize-none overflow-y-auto min-h-[150px]"
              placeholder="Beschrijving"
          ></textarea>

        </div>

        <!-- Acties -->
        <div class="flex justify-between items-center">
          <button
              @click="router.push('/dashboard')"
              class="text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
          >
            ← Terug
          </button>

          <button
              @click="saveChanges"
              :disabled="saving"
              class="bg-LichtPaars text-white px-6 py-2 rounded-lg hover:bg-Goud transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ saving ? 'Opslaan...' : 'Opslaan' }}
          </button>
        </div>

        <!-- Feedback -->
        <p v-if="message" class="text-green-600 font-medium text-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>


