<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {NuxtLink} from "#components";
import dashboard from "~/pages/dashboard.vue";
import Dashboard from "~/pages/dashboard.vue";

const email = ref('')
const password = ref('')
const error = ref('')

const { $auth } = useNuxtApp()  // auth uit plugin

const login = async () => {
  error.value = ''
  try {
    const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value)
    console.log('Logged in:', userCredential.user)
    // redirect naar dashboard
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err.message
    console.error(err)
  }
}
</script>


<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="../assets/img/Logo.svg" alt="Your Company" class="mx-auto h-50 w-auto" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-paars">Log in voor toegang van dashboard</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login" action="#" method="POST" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-paars">Email address</label>
          <div class="mt-2">
            <input id="email" type="email" name="email" v-model="email" required autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-CickRood sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-paars">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" type="password" name="password" v-model="password" required autocomplete="current-password" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-CickRood sm:text-sm/6" />
          </div>
        </div>

        <p v-if="error" class="text-red-500">{{ error }}</p>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-LichtPaars px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-Goud focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>