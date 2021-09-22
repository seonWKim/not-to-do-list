export function uuid () {
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin (store) {
  store.subscribe(
    (mutation, state) => {
      state.boards[state.boardIndex] = store.state.board
    }
  )
}
