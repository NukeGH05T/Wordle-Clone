const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const msgDisplay = document.querySelector('.msg-container')

const wordle = 'SUPER'
let isGameOver = false

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)

    guessRow.forEach((guess, guessIndex) =>{
         const tileElement = document.createElement('div')
         tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
         tileElement.classList.add('tile')
         rowElement.append(tileElement);
    })

    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) =>{
    console.log('clicked', letter)
    if(letter === 'DEL'){
        delLetter()
        return
    }
    if (letter === 'ENTER'){
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) =>{
    if(currentRow < 6 && currentTile < 5){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('gr-' , guessRows)
    }
}

const delLetter = () =>{
    if(currentTile > 0){
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '')
    }
}

const checkRow = () =>{
    const guess = guessRows[currentRow].join('')
    flipColor()

    if(currentTile === 5){
        console.log('Guess - ' + guess + ' Wordle - ' + wordle)
        if(wordle == guess){
            showMessage('Awesome!')
            isGameOver = true
        } else if (currentRow >= 5){
            isGameOver = true
            showAlert('Game Over!')
            return
        }
        if (currentRow < 5){
            currentRow++
            currentTile = 0
        }
    }
}

const showMessage = (msg) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = msg
    msgDisplay.append(messageElement)
    setTimeout(() => msgDisplay.removeChild(messageElement), 2000)
}

const showAlert = (msg) => {
    const messageElement = document.createElement('span')
    messageElement.textContent = msg
    msgDisplay.append(messageElement)
    setTimeout(() => msgDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    document.getElementById(keyLetter)
}

const flipColor = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            if(dataLetter == wordle[index]){
                tile.classList.add('green-overlay')
                addColorToKey(dataLetter, 'green-overlay')
            } else if(wordle.includes(dataLetter)){
                tile.classList.add('yellow-overlay')
            } else {
                tile.classList.add('grey-overlay')
            }
        }, 500 * index)

        
    })
}