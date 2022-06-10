const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]

const startEl = document.querySelector('.start')
const highscoreEl = document.querySelector('.highscore span')

const timerEl = document.querySelector('.timer span')
const scoreEl = document.querySelector('.score span')

const topboard = document.querySelector('.top-board')
const board = document.querySelector('.board')

let setTime = 30
let countDownTime = setTime

let countdownTimer = null
let moleTimer = null
let rabbitTimer = null

let score = 0
let highscore = 0

let gameOn = false;

///SOUNDS///

const sound = new Audio("assets/smash.mp3")
const tehee = new Audio("assets/tehee.mp3")
const music = new Audio("assets/animal-crossing-6am.mp3")


///CLICK KEY TO START///
window.addEventListener("keypress", () => {
    if (!gameOn) {
        console.log("Game On")
        board.style.visibility = "visible"
        timerEl.textContent = countDownTime
        scoreEl.textContent = score
        startEl.textContent = "Whack Mouse! Avoid Rabbits!"
        countdownTimer = setInterval(countDown, 1000);
        gameOn = true
        runGame()
    }
})

///CURSOR///
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

///COUNTDOWN///

function countDown() {
    countDownTime--
    timerEl.textContent = countDownTime
}

///HIGHSCORE///

function updateHighScore() {
    if (score > highscore) {
        console.log("Highscore is being updated!")
        highscore = score
        highscoreEl.textContent = highscore
    }
}

///GENERATE RANDOM NUMBER///
const generateRandomBetween = (min, max, exclude) => {
    let ranNum = Math.floor(Math.random() * (max - min)) + min;
    if (ranNum === exclude) {
        ranNum = generateRandomBetween(min, max, exclude);
    }
    return ranNum;
}

///GAME///

function moles() {
    i = generateRandomBetween(0, holes.length, null)
    const hole = holes[i]
    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/mole.png'
    img.value = 'mole'

    img.addEventListener('click', () => {
        sound.play()
        score++
        scoreEl.textContent = score
        img.src = 'assets/mole-whacked.png'
        clearTimeout(moleTimer)
        moleTimer = setTimeout(() => {
            hole.removeChild(img)
        }, 300)
        runGame()
    })

    hole.appendChild(img)
    moleTimer = setTimeout(() => {
        hole.removeChild(img)
        runGame()
    }, 1500 - (score * 10))

}

function rabbits() {
    j = generateRandomBetween(0, holes.length, i)
    const rabbitHole = holes[j]

    const rabbitImg = document.createElement('img')
    rabbitImg.classList.add('rabbit')
    rabbitImg.src = 'assets/rabbit.png'
    rabbitImg.value = 'rabbit'

    rabbitImg.addEventListener('click', () => {
        tehee.play()
        score -= 2
        scoreEl.textContent = score

        rabbitImg.src = 'assets/rabbit-whacked.png'
        clearTimeout(rabbitTimer)
        rabbitTimer = setTimeout(() => {
            rabbitHole.removeChild(rabbitImg)
        }, 300)
    })

    if (holes[j].childNodes.length === 0) {
        rabbitHole.appendChild(rabbitImg)
        rabbitTimer = setTimeout(() => {
            rabbitHole.removeChild(rabbitImg)
        }, 1500 - (score * 10))
    }
}

function runGame() {
    if (countDownTime > 0) {
        music.play()
        console.log(countDownTime)
        console.log("Game is running")
        moles()
        score > 5 && rabbits()
    } else {
        gameOn = false
        updateHighScore()
        replayGame()
        return
    }
}

///REPLAY GAME///

function replayGame() {
    console.log("Game to be replayed")
    clearInterval(countdownTimer)
    board.style.visibility = "hidden"
    startEl.textContent = "Game Over! Press Any Key To Restart"
    score = 0
    countDownTime = setTime
}