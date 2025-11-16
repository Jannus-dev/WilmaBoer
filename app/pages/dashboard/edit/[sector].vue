<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
import { signOut } from 'firebase/auth'
import { computed, ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore'

// Firebase en Nuxt logica
const user = computed(() => $auth.currentUser)
const { $db } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const sector = route.params.sector as string
// Let op: 'Description' in plaats van 'text' om overeen te komen met je initialisatie
const content = ref({ Title: '', text: '' })
const loading = ref(true)
const saving = ref(false)
const message = ref('')

// CKEditor 5 Logica Import
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import {
  ClassicEditor,
  Autosave,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
  AutoLink,
  List,
  TextTransformation,
  Indent,
  IndentBlock,
  GeneralHtmlSupport,
  Underline,
  Strikethrough,
  Autoformat
} from 'ckeditor5';

// Pas aan indien nodig
const LICENSE_KEY = 'GPL';

const isLayoutReady = ref(false);
const editor = ClassicEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      Autoformat, AutoLink, Autosave, Bold, Essentials, GeneralHtmlSupport,
      Indent, IndentBlock, Italic, Link, List, Paragraph, Strikethrough,
      TextTransformation, Underline
    ],
    htmlSupport: {
      allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }]
    },
    // Dynamisch geladen data zal de initialData overschrijven
    language: 'nl',
    licenseKey: LICENSE_KEY,
    placeholder: 'Beschrijving',
    // translations: [translations] // Mogelijk niet nodig als je de 'ckeditor5' NPM package correct gebruikt
  };
});


// Data ophalen
onMounted(async () => {
  const docRef = doc($db, 'page', sector)
  const snapshot = await getDoc(docRef)
  if (snapshot.exists()) {
    // Zorg ervoor dat de data in de ref komt, inclusief de Description
    content.value = snapshot.data()
  }
  loading.value = false
  isLayoutReady.value = true; // Zorg ervoor dat de editor pas verschijnt na laden
})

// Opslaan
const saveChanges = async () => {
  saving.value = true
  const docRef = doc($db, 'page', sector)
  // Sla de gehele content ref op, inclusief de HTML van de editor
  await updateDoc(docRef, content.value)
  message.value = 'De wijzegingen zijn opgeslagen en te zien op de website'
  saving.value = false
}

// Handler voor de editor om de data bij te werken
const onEditorChange = (data: string) => {
  content.value.text = data;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">

      <div class="flex justify-center">
        <img
            src="../../../assets/img/Logo.svg"
            alt="Logo"
            class="h-20"
        />
      </div>

      <h1 class="text-3xl font-extrabold text-gray-900 text-center">
        Bewerk sector: <span class="text-LichtPaars">{{ sector }}</span>
      </h1>
      <div v-if="loading" class="text-gray-500 text-center py-10">Laden...</div>

      <div v-else class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titel</label>
          <input
              v-model="content.Title"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-LichtPaars focus:border-LichtPaars transition"
              placeholder="Titel"
          />
        </div>

        <div v-if="isLayoutReady && config">
          <label class="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>

          <ClientOnly>
            <ckeditor
                :editor="editor"
                v-model="content.text"
                :config="config"
                class="ckeditor-container"
            />
          </ClientOnly>

        </div>
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

        <p v-if="message" class="text-green-600 font-medium text-center">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.ck-powered-by-balloon{
  visibility: hidden !important;
}
</style>


