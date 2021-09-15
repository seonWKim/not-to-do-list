<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click.native="goToTask(task)"
    >
      <div class="w-full flex-no-shrink font-bold flex justify-between">
        <div>{{ task.name }}</div>
        <div>
<!--          <svg class="h-3 ml-2 mt-1 text-right fill-current text-cyan-400"-->
<!--               xmlns="http://www.w3.org/2000/svg"-->
<!--               fill="none"-->
<!--               viewBox="0 0 24 24"-->
<!--               stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>-->
<!--          </svg>-->
        </div>
      </div>
      <p
        v-if="task.description"
        class="w-full flex-no-shrink mt-1 text-sm"
      >
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'

export default {
  components: { AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({
        name: 'task',
        params: { id: task.id, columnIndex: this.columnIndex, taskIndex: this.taskIndex }
      })
    },
    deleteTask () {
      const columnIndex = this.columnIndex
      const taskIndex = this.taskIndex
      this.$store.commit('REMOVE_TASK', { columnIndex, taskIndex })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
