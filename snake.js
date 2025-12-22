document.addEventListener('DOMContentLoaded', () => {
  const snake_board = document.querySelector('.snake-board')

  let Blocks = []
  const block_hight = 50
  const block_width = 50

  const rows = Math.floor(snake_board.clientHeight / block_hight)
  const columns = Math.floor(snake_board.clientWidth / block_width)

  function createBlocks() {
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < columns.length; col++) {
        const block = document.createElement('div')
        block.classList.add('block')
        Blocks[`${row}-${col}`] = block
      }
    }
  }
  createBlocks()
})
