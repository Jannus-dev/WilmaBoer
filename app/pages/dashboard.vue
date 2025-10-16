<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import { signOut } from 'firebase/auth'

const { $auth } = useNuxtApp()
const router = useRouter()

async function logout() {
  try {
    await signOut($auth)
    await router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <HeaderComponent />
  <TitleComponent text="Dashboard" tag="h1"  class="text-center pt-4"/>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">
        👋 Welkom op het dashboard
      </h1>

      <p class="text-gray-500 mb-8">
        Je bent succesvol ingelogd. Klik hieronder om uit te loggen.
      </p>

      <button
          @click="logout"
          class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 ease-in-out"
      >
        Log uit
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>