import { uuid } from './utils'
import constants from './constants'
export default {
  boardDefault: {
    boardEmpty: {
      name: 'EMPTY_BOARD',
      columns: [
        {
          name: constants.BASE_COLUMN,
          isBaseColumn: true,
          freeze: true,
          createdAt: new Date().getTime(),
          tasks: []
        }
      ]
    },
    board1: {
      name: 'NOT_TO_DO_LIST',
      columns: [
        {
          name: constants.BASE_COLUMN,
          isBaseColumn: true,
          freeze: true,
          createdAt: new Date().getTime(),
          tasks: [
            {
              description: '',
              name: 'Wake up late in the morning(after 8 a.m.)',
              id: uuid(),
              userAssigned: null
            },
            {
              description: '',
              name: 'Using smartphone right after wakeup',
              id: uuid(),
              userAssigned: null
            },
            {
              description: '',
              name: 'Use smartphone before sleeping',
              id: uuid(),
              userAssigned: null
            },
            {
              description: '',
              name: 'Using kakao talk when studying',
              id: uuid(),
              userAssigned: null
            }
          ]
        }
      ]
    },
    board2: {
      name: 'board2',
      columns: {
        name: constants.BASE_COLUMN,
        isBaseColumn: true,
        freeze: true,
        createdAt: new Date().getTime(),
        tasks: []
      }
    },
    board3: {
      name: 'board3',
      columns: {
        name: constants.BASE_COLUMN,
        isBaseColumn: true,
        freeze: true,
        createdAt: new Date().getTime(),
        tasks: []
      }
    },
    board4: {
      name: 'board4',
      columns: {
        name: constants.BASE_COLUMN,
        isBaseColumn: true,
        freeze: true,
        createdAt: new Date().getTime(),
        tasks: []
      }
    }
  }
}
