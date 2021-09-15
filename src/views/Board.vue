<template>
  <div class="board">
    <div class="column flex justify-center mb-12" style="max-width: 350px">
      <input
        type="text"
        class="p-2 mr-2 flex-grow"
        placeholder="New Column Name"
        v-model="newColumnName"
        @keyup.enter="createColumn"
      >
      <button @click="addToday($event)">Add Today</button>
    </div>
    <div class="flex flex-wrap">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
        :class="{ 'mb-6': true }"
      />
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

      if (this.$store.state.board.columns[1].name === date) {
        alert("You've already registered today's record")
        return
      }
      this.createColumn(e, date)
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
