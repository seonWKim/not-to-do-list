<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex justify-between" @click="reverseFreeze(columnIndex)">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div :style="{
          'max-width': '3px',
          'margin-right': '20px',
          'color': $store.state.board.columns[this.columnIndex].freeze ? '#2563EB' : '#9CA3AF',
          'cursor': mouseOverCheckIcon ? 'pointer' : 'default'
        }"
          @mouseover="mouseOverCheckIcon = true"
          @mouseleave="mouseOverCheckIcon = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
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
  },
  methods: {
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    reverseFreeze (columnIndex) {
      let column = this.$store.state.board.columns[columnIndex]
      if (column.freeze === undefined) column.freeze = false
      column.freeze = !column.freeze
    }
  },
  data () {
    return {
      mouseOverCheckIcon: false
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
