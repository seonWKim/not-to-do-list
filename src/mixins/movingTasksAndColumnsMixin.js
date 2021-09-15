export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const isBaseColumn = !!this.board.columns[fromColumnIndex].isBaseColumn
      if (!isBaseColumn && (this.column.freeze || this.board.columns[fromColumnIndex].freeze)) return
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      if (fromTasks === this.column.tasks) return
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex,
        isBaseColumn
      })
    },
    moveColumn ({ fromColumnIndex }) {
      if (this.column.freeze) return
      const isBaseColumn = !!this.board.columns[fromColumnIndex].isBaseColumn
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex,
        isBaseColumn
      })
    }
  }
}
