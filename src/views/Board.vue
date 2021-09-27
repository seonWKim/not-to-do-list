<template>
  <div class="board flex flex-col justify-between">
    <div class="column flex justify-center mb-3" style="max-width: 350px">
      <input
        type="text"
        class="p-2 mr-2 flex-grow"
        placeholder="Enter New Column Name"
        v-model="newColumnName"
        @keyup.enter="createColumn"
      >
      <button @click="addToday($event)">Add Today</button>
    </div>
    <div class="flex flex-start">
      <button
        v-for="(name, index) in boardNames"
        :key="index"
        class="board-names"
        @click="changeBoard(index)"
      >{{ name }}
      </button>
      <button
        class="board-names"
        @click="addBoard"
      >+</button>
    </div>
    <div class="flex flex-wrap mb-auto">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
        :class="{ 'mb-3': true }"
      />
    </div>
    <div class="flex">
      <button class="button text-teal-darker text-xl p-2 mr-3"
              @click="saveToDisk"
      >
        Save to disk
      </button>
      <label
        for="boards-file"
        style="cursor: pointer"
        class="button text-teal-darker text-xl p-2 mr-3">
          Upload from disk
        <input type="file" id="boards-file" style="display: none" @change="uploadFromDisk($event)" accept="application/json">
      </label>
      <button class="button text-red text-xl p-2 mr-3"
              @click="resetAll"
      >
        Reset all
      </button>
      <button class="button text-red text-xl p-2"
              @click="removeBoard"
      >
        Remove board
      </button>
    </div>
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: { BoardColumn },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    },
    boardNames () {
      return this.$store.state.boards.map(board => board.name)
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },
    createColumn (e, name = this.newColumnName) {
      this.$store.commit('CREATE_COLUMN', {
        name: name
      })
      this.newColumnName = ''
    },
    addToday (e) {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

      const columns = this.$store.state.board.columns
      if (columns.length >= 2 && columns[1].name === date) {
        let agreed = window.confirm("You've already registered today's record. Register again?")
        if (!agreed) return
      }
      this.createColumn(e, date)
    },
    saveToDisk () {
      let boards = this.$store.state.boards
      let blob = new Blob([JSON.stringify(boards)],
        { type: 'application/json' })
      let a = document.createElement('a')
      document.body.appendChild(a)

      let url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = 'not-to-do-list.json'
      a.click()
      window.URL.revokeObjectURL(url)
    },
    uploadFromDisk (event) {
      try {
        let files = event.target.files
        if (!files.length) {
          alert('No file selected!')
          return
        }
        let file = files[0]
        let reader = new FileReader()
        reader.onload = (event) => {
          this.$store.commit('SAVE_ALL_BOARDS', JSON.parse(event.target.result))
        }
        reader.readAsText(file)
      } catch (err) {
        alert('Errors on uploading file')
      }
    },
    resetAll () {
      if (!window.confirm('Resetting columns will erase all the data. Are you sure you want to reset?')) return
      this.$store.commit('RESET_ALL')
    },
    addBoard () {
      this.$store.commit('ADD_BOARD')
    },
    changeBoard (boardIndex) {
      this.$store.commit('CHANGE_BOARD', { boardIndex: boardIndex })
    },
    removeBoard () {
      this.$store.commit('REMOVE_BOARD')
    }
  }
}
</script>

<style lang="css" scoped>
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}

.board-names {
  @apply bg-grey-lightest p-2 mb-3 mr-3 text-left shadow rounded-xl;
}

.button {
  @apply bg-grey-lightest p-2 mb-3 mr-3 text-left shadow rounded-xl;
}
</style>
