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
      <button class="button text-red text-xl p-2 mr-3"
              @click="resetAll"
      >
        Reset All
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
      return this.$store.getters.getBoardNames
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
  @apply bg-grey-lightest p-2 mb-3 mr-3 text-left shadow rounded;
}

.button {
  @apply bg-grey-light w-auto mr-4 text-left shadow rounded;
  max-width: 175px;
}
</style>
