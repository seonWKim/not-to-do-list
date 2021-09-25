<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex justify-between">
        <input
          type="text"
          class="flex items-center mb-2 font-bold text-color-green bg-transparent"
          :value="column.name"
          @change="updateColumnName($event)"
          @keyup.enter="updateColumnName($event)"
        />
        <div class="flex">
          <div
            :style="{
              'max-width': '3px',
              'margin-right': '25px',
              color: $store.state.board.columns[this.columnIndex].freeze
                ? '#3B82F6'
                : '#9CA3AF',
              cursor: mouseOverDeleteIcon ? 'pointer' : 'default'
            }"
            @mouseover="mouseOverCheckIcon = true"
            @mouseleave="mouseOverCheckIcon = false"
            @click="reverseFreeze(columnIndex)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
          </div>
          <div
            :style="{
              'max-width': '3px',
              'margin-right': '20px',
              cursor: mouseOverDeleteIcon ? 'pointer' : 'default',
              color: mouseOverDeleteIcon ? '#EF4444' : '#9CA3AF'
            }"
            @mouseover="mouseOverDeleteIcon = true"
            @mouseleave="mouseOverDeleteIcon = false"
            @click="deleteColumn(columnIndex)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  name: 'BoardColumn',
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  props: {
    columnIndex: Number
  },
  mixins: [movingTasksAndColumnsMixin],
  computed: {
    // imperfectDay () {
    //   if (this.$store.state.board.columns[this.columnIndex].isBaseColumn) return false
    //   return this.$store.state.board.columns[this.columnIndex].tasks.length !== 0
    // }
  },
  data () {
    return {
      mouseOverCheckIcon: false,
      mouseOverDeleteIcon: false
    }
  },
  methods: {
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    reverseFreeze (columnIndex) {
      let column = this.$store.state.board.columns[columnIndex]
      if (!column.freeze && !window.confirm("If you freeze a column you won't be able to move tasks around. Confirm you want to freeze?")) return
      if (column.freeze === undefined) column.freeze = false
      column.freeze = !column.freeze
    },
    deleteColumn (columnIndex) {
      let column = this.$store.state.board.columns[columnIndex]
      if (column.freeze) {
        alert("This column is frozen. You can't delete a frozen column")
        return
      }
      if (this.$store.state.board.columns[columnIndex].isBaseColumn) {
        alert("You can't delete a base column")
        return
      }
      if (window.confirm('Are you sure you want to delete this column?')) {
        this.$store.commit('DELETE_COLUMN', { columnIndex })
      }
    },
    updateColumnName (e) {
      this.$store.commit('UPDATE_COLUMN_NAME', {
        name: e.target.value,
        columnIndex: this.columnIndex
      })
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
