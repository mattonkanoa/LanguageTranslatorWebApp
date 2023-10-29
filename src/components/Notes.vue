<script setup>
  import { ref, onMounted } from 'vue'
  import { getFormattedDate } from '@/utility/dateUtils.js'
  import { getStorageItem, setStorageItem } from '@/utility/localStorageUtils.js'

  const showModal = ref(false)
  const newNote = ref("")
  const notes = ref([])

  const existingNote = ref({
    id: null,
    text: null,
    date: null
  })

  onMounted(() => {
    notes.value = getStorageItem('notes') || []
  });

  const addNote = () => {
    // Save new note
    notes.value.push({
        id: notes.value.length,
        text: newNote.value,
        date: getFormattedDate()
    })

    setStorageItem('notes', notes)
    

    
    showModal.value = false
    newNote.value = ""
  }

  const saveNote = () => {
    // Save existing note
    notes.value[existingNote.value.id] = {
        id: existingNote.value.id,
        text: newNote.value,
        date: getFormattedDate()
    }

    setStorageItem('notes', notes)

    // Reset items
    showModal.value = false
    newNote.value = ""
    existingNote.value = {
        id: null,
        text: null,
        date: null
    }
  }

  const toggleModal = (note) => {
    // Check if user clicked on existing note
    if (note !== undefined) {
        newNote.value = note.text
        existingNote.value = note
        console.log(notes.value[0])
    }

    showModal.value = !showModal.value
  }

  const cancel = () => {
    showModal.value = false
    newNote.value = ""
    existingNote.value = {
        id: null,
        text: null,
        date: null
    }
  }
</script>

<template>
  <main>
    <div v-if="showModal" class="overlay">
      <div v-if="existingNote.id === null" class="modal">
        <textarea v-model="newNote" name="note " id="note"></textarea>
        <button @click="addNote()">Add Note</button>
        <button @click="cancel()">Cancel</button>
      </div>
      <div v-if="existingNote.id !== null" class="modal">
        <textarea v-model="newNote" name="note " id="note"></textarea>
        <button @click="saveNote()">Edit Note</button>
        <button @click="cancel()">Cancel</button>
      </div>
    </div>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="toggleModal()">+</button>
      </header>
      <div v-if="notes.length == 0">
        <p class="message">No Exising Notes</p>
      </div>
      <div class="cards-container">
        <div v-for="note in notes" @click="toggleModal(note)" class="card">
          <p class="main-text">{{ note.text }}</p>
          <p class="date">{{ note.date }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    height: 100vh;
    width: 100vw;
    background-color: beige;
    margin: 0;
  }

  .container {
    max-width: 1000px;
    padding: 10px;
    margin: 0 auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 75px;
    font-family: Arial, Helvetica, sans-serif;
  }

  header button {
    border: none;
    width: 50px;
    height: 50px;
    cursor: pointer;
    padding: 10px;
    background-color: rgb(21, 20, 20);
    border-radius: 100%;
    color: white;
    font-size: 20px;
  }

  .card {
    width: 225px;
    height: 225px;
    background-color: rgb(237, 182, 44);
    padding: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .main-text {
    width: 220px;
    flex-wrap: wrap;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
  }

  .date {
    font-size: 12px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message {
    font-size: 20px;
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    margin-top: 100px;
  }

</style>