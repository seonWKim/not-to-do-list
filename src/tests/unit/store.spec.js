/* eslint-disable */
import boardExample from "../../default-board"

const boards = boardExample.boardDefault.boards
const board = boards[0]
const boardIndex = 0

describe('example', function () {
  test('test board', () => {
    console.log(boards, board, boardIndex)
  })
})
