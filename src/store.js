import Vue from 'vue'
import Vuex from 'vuex'
import boardExample from './default-board'
import { saveStatePlugin, uuid } from './utils'
import _ from 'lodash'

Vue.use(Vuex)

const board =
  JSON.parse(localStorage.getItem('board')) || boardExample.boardDefault

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        freeze: false,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (
      state,
      { fromTasks, toTasks, fromTaskIndex, toTaskIndex, isBaseColumn = false }
    ) {
      const taskToMove = _.cloneDeep(fromTasks[fromTaskIndex])
      if (!isBaseColumn) fromTasks.splice(fromTaskIndex, 1)
      taskToMove.id = uuid()
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    REMOVE_TASK (state, { columnIndex, taskIndex }) {
      state.board.columns[columnIndex].tasks.splice(taskIndex, 1)
    },
    CREATE_COLUMN (state, { name }) {
      const newColumn = {
        name: name,
        freeze: false,
        createdAt: new Date().getTime(),
        tasks: []
      }
      state.board.columns.splice(1, 0, newColumn)
    },
    MOVE_COLUMN (
      state,
      { fromColumnIndex, toColumnIndex, isBaseColumn = false }
    ) {
      const columnList = state.board.columns
      if (
        isBaseColumn ||
        columnList[toColumnIndex].freeze ||
        columnList[fromColumnIndex].freeze
      ) {
        return
      }
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    UPDATE_COLUMN_NAME (state, { name, columnIndex }) {
      state.board.columns[columnIndex].name = name
    },
    DELETE_COLUMN (state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1)
    },
    RESET_ALL (state) {
      localStorage.removeItem('board')
      state.board = boardExample.boardEmpty
    }
  }
})
