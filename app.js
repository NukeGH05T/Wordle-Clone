const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const msgDisplay = document.querySelector('.msg-container')

let wordle
let isGameOver = false


/*const getWordle = () => {                     //Activate if have a way to use express
    fetch('http://localhost:8000/word')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            wordle = json.toUpperCase()
        })
        .catch(err => console.log(err))
}*/

const getWordle = () => {

    const wordArr = [
        "Abuse", "Adult", "Agent", "Anger", "Apple", "Award", "Basis", "Beach", "Birth", "Block", "Blood", "Board",
        "Brain", "Bread", "Break", "Brown", "Buyer", "Cause", "Chain", "Chair", "Chest", "Chief", "Child", "China",
        "Claim", "Class", "Clock", "Coach", "Coast", "Court", "Cover", "Cream", "Crime", "Cross", "Crowd", "Crown",
        "Cycle", "Dance", "Death", "Depth", "Doubt", "Draft", "Drama", "Dream", "Dress", "Drink", "Drive", "Earth",
        "Enemy", "Entry", "Error", "Event", "Faith", "Fault", "Field", "Fight", "Final", "Floor", "Focus", "Force",
        "Frame", "Frank", "Front", "Fruit", "Glass", "Grant", "Grass", "Green", "Group", "Guide", "Heart", "Henry",
        "Horse", "Hotel", "House", "Image", "Index", "Input", "Issue", "Japan", "Jones", "Judge", "Knife", "Laura",
        "Layer", "Level", "Lewis", "Light", "Limit", "Lunch", "Major", "March", "Match", "Metal", "Model", "Money",
        "Month", "Motor", "Mouth", "Music", "Night", "Noise", "North", "Novel", "Nurse", "Offer", "Order", "Other",
        "Owner", "Panel", "Paper", "Party", "Peace", "Peter", "Phase", "Phone", "Piece", "Pilot", "Pitch", "Place",
        "Plane", "Plant", "Plate", "Point", "Pound", "Power", "Press", "Price", "Pride", "Prize", "Proof", "Queen",
        "Radio", "Range", "Ratio", "Reply", "Right", "River", "Round", "Route", "Rugby", "Scale", "Scene", "Scope",
        "Score", "Sense", "Shape", "Share", "Sheep", "Sheet", "Shift", "Shirt", "Shock", "Sight", "Simon", "Skill",
        "Sleep", "Smile", "Smith", "Smoke", "Sound", "South", "Space", "Speed", "Spite", "Sport", "Squad", "Staff",
        "Stage", "Start", "State", "Steam", "Steel", "Stock", "Stone", "Store", "Study", "Stuff", "Style", "Sugar",
        "Table", "Taste", "Terry", "Theme", "Thing", "Title", "Total", "Touch", "Tower", "Track", "Trade", "Train",
        "Trend", "Trial", "Trust", "Truth", "Uncle", "Union", "Unity", "Value", "Video", "Visit", "Voice", "Waste",
        "Watch", "Water", "While", "White", "Whole", "Woman", "World", "Youth"
    ]

    console.log("items: " + wordArr.length)

    let i = Math.floor((Math.random() * 212)); /*Random int from 0 to 211 */
    
    wordle = wordArr[i].toUpperCase()
    console.log("Wordle - " + wordle)
}

getWordle()

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
    if(!isGameOver){
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
}

const addLetter = (letter) =>{
    if(currentRow < 6 && currentTile < 5){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
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
    console.log(wordle, guess)

    if(currentTile === 5){

        flipColor()

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
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipColor = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    guess = []
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        rowTiles.forEach(tile => {
            guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
        })

        guess.forEach((guess, index) => {
            if(guess.letter == wordle[index]){
                guess.color = 'green-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })

        guess.forEach(guess => {
            if(checkWordle.includes(guess.letter)){
                guess.color = 'yellow-overlay'
                checkWordle = checkWordle.replace(guess.letter, '')
            }
        })

        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)

        
    })
}