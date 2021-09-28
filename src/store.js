import Vue from 'vue'
import Vuex from 'vuex'
import boardExample from './default-board'
import { saveStatePlugin } from './utils'
import _ from 'lodash'
import state from './vuex/state'
import getters from './vuex/getters'
import mutations from './vuex/mutations'
Vue.use(Vuex)

const boards = _.cloneDeep((localStorage && JSON.parse(localStorage.getItem('boards'))) || boardExample.boardDefault.boards)
const board = boards[0]
const boardIndex = 0

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
    boards,
    boardIndex,
    ...state
  },
  getters: {
    ...getters
  },
  mutations: {
    ...mutations
  }
})
