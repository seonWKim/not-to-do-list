import { uuid } from './utils'
import constants from './constants'
export default {
  name: 'workshop',
  columns: [
    {
      name: constants.BASE_COLUMN,
      isBaseColumn: true,
      freeze: true,
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
}
