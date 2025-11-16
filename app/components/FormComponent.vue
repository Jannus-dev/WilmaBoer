<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
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

import translations from 'ckeditor5/translations/nl.js';

import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

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
      Autoformat,
      AutoLink,
      Autosave,
      Bold,
      Essentials,
      GeneralHtmlSupport,
      Indent,
      IndentBlock,
      Italic,
      Link,
      List,
      Paragraph,
      Strikethrough,
      TextTransformation,
      Underline
    ],
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    initialData:
        '<p>text</p>',
    language: 'nl',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    placeholder: 'Beschrijving',
    translations: [translations]
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});
</script>

<template>
  <div class="main-container w-full flex justify-center">
    <div class="editor-container editor-container_classic-editor w-3/7" ref="editorContainerElement">
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor v-if="editor && config" :modelValue="config.initialData" :editor="editor" :config="config" class=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>