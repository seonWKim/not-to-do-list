import { uuid } from './utils'

export default {
  boardDefault: {
    boardEmpty: {
      name: 'EMPTY_BOARD',
      columns: [
        {
          name: 'EMPTY_BOARD',
          isBaseColumn: true,
          freeze: true,
          createdAt: new Date().getTime(),
          tasks: []
        }
      ]
    },
    boards: [
      {
        name: 'NOT_TO_DO_LIST',
        columns: [
          {
            name: 'NOT_TO_DO_LIST',
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
      {
        name: 'BOARD 2',
        columns: [
          {
            name: 'BOARD 2',
            isBaseColumn: true,
            freeze: true,
            createdAt: new Date().getTime(),
            tasks: []
          }
        ]
      },
      {
        name: 'BOARD 3',
        columns: [
          {
            name: 'BOARD 3',
            isBaseColumn: true,
            freeze: true,
            createdAt: new Date().getTime(),
            tasks: []
          }
        ]
      },
      {
        name: 'BOARD 4',
        columns: [
          {
            name: 'BOARD 4',
            isBaseColumn: true,
            freeze: true,
            createdAt: new Date().getTime(),
            tasks: []
          }
        ]
      }
    ]
  }
}
