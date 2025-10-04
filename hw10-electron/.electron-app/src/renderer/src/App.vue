<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare global {
  interface Window {
    api: {
      requestFiles: () => void,
      onFilesUpdated: (callback: (files: string[]) => void) => void
    }
  }  
}

const files = ref<string[]>([])

function handleFilesUpdated(newFiles: string[]): void {
  files.value = newFiles
}

onMounted(() => {
  window.api.onFilesUpdated(handleFilesUpdated)
  window.api.requestFiles()
})
</script>

<template>
  <ul>
    <li v-for="file in files" 
      :key="file"
      >{{ file }}</li>
  </ul>
    <h1>File Explorer</h1>
    <div class="spaciousElement">
      <!-- <input type="text" class="inputtextwidth" placeholder="type your tags to search.." maxlength="500"></input>
      <button>Search Tags</button> -->
      <label class="padding20">Folders: </label>
      <input id="selectedfolders" class="inputtextwidth" type="text" 
                                        placeholder="Selected folders paths displayed here.." disabled></input>
      <button class="inlinedisplay margin20" id="folderchooser">Choose folder to list files</button>
      <button class="inlinedisplay floatright margin20" id="clearselection">Clear</button>
    </div>
    <div>
      <ul id="filelist" class="nopadding">
      </ul>
    </div>
    <template id="filerec">
      <div class="row">
          <li class="grid-container">
              <span><strong></strong></span>
              <span>234234</span>
              <span>234</span>
              <span></span>
              <!-- <button class="addtag">Add Tag</button> -->
          </li>
      </div>
    </template>
    <!-- You can also require other files to run in this process -->
</template>
