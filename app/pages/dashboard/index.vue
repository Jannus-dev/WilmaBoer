<script setup lang="ts">
definePageMeta({
 middleware: ['auth']
})
import { signOut } from 'firebase/auth'

const { $auth } = useNuxtApp()
const router = useRouter()
const user = computed(() => $auth.currentUser)

async function logout() {
  try {
    await signOut($auth)
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
const sectors = ['start', 'SectorOne', 'SectorTwo', 'SectorThree', 'SectorFour']  // Vul hier je sectoren in

function editSector(sector: string) {
  router.push(`/dashboard/edit/${sector}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header
        class="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between px-6 py-4"
    >
      <img src="../../assets/img/Logo.svg" alt="Logo" class="h-10" />

      <div class="flex items-center gap-4">
        <p class="text-gray-600 text-sm">
          Ingelogd als:
          <span class="font-medium text-gray-800">{{ user?.email }}</span>
        </p>

        <button
            @click="logout"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow transition-all duration-150"
        >
          Log uit
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Edit website</h2>
        <p class="text-gray-500 text-sm">
          Selecteer welk deel van de website je wilt aanpassen.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
              v-for="sector in sectors"
              :key="sector"
              @click="editSector(sector)"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {{ sector }}
          </button>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Eventuele Blogs</h2>
        <p class="text-gray-500 text-sm">
          Mogenlijk een deel voor een latere blog pagina. Hier zou je kunnen aanpassen en delen.
        </p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Social Media</h2>
        <p class="text-gray-500 text-sm">
          Bekijk alle social media posts op 1 plek.
        </p>
      </div>
    </main>
  </div>
</template>
