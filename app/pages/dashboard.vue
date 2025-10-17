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
  <NavComponent />
  <TitleComponent text="Dashboard" tag="h1" class="ml-5 mt-5 underline" />
</template>

<style scoped>

</style>