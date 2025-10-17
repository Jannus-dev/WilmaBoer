<script setup lang="ts">
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
  <div class="nav w-screen h-15 flex justify-evenly bg-LichtPaars">
    <div class="LogoNav flex">
      <img src="../assets/img/Logo.svg" alt="Logo" class="w-20 mr-5">
      <ul class="flex flex-wrap items-center justify-center">
        <li class="mr-5 text-Goud"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li class="text-Goud"><NuxtLink to="/editer">Editer</NuxtLink></li>
      </ul>
    </div>

    <button
        @click="logout"
        class="px-3 h-10 self-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 ease-in-out">
      Log uit
    </button>
  </div>

</template>

<style scoped>

</style>