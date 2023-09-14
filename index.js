const startButton = document.getElementById('start')
let score = 0
const colors = ['black', 'green', 'yellow', 'pink', 'grey', 'red']
startButton.addEventListener('click', startGame)
const timeGame = document.getElementById('time')
const resultTable = document.getElementById('result_table')
let results = []

function showClass(el){
    return el.classList.remove('hide')
}

function hideClass(el){
    return el.classList.add('hide')
}

function changeValue(){
    document.getElementById('time').innerText = document.getElementById('game-time').value
}

function saveValue() {
    document.getElementById('time').value = document.getElementById('game-time').value
}

document.getElementById('game-time').addEventListener('click', changeValue)

function startGame(){
    changeValue()
    score = 0
    document.getElementById('game-time').setAttribute('disabled', 'true')
    showClass(document.getElementById('time-header'))
    hideClass(document.getElementById('result-header'))
    saveValue();
    hideClass(startButton)
    document.getElementById('game').style.backgroundColor = '#fff'
    generateSquad();
    let interval = setInterval(function() {
        let time = parseFloat(timeGame.textContent)
        if (time === 0)
        {
            clearInterval(interval)
            endGame()
        }
        else {
            timeGame.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
}

function endGame(){
    document.getElementById('game-time').removeAttribute('disabled')
    document.getElementById('game').innerHTML = ''
    document.getElementById('game').style.backgroundColor = '#ccc'
    showClass(startButton)
    hideClass(document.getElementById('time-header'))
    showClass(document.getElementById('result-header'))
    document.getElementById('result').innerText = score
    results.push(score/document.getElementById('time').value)
    resultTable.innerHTML = `<p>Лучший результат за секунду:<br>Нажатий за секунду - ${countResultTable()}</p>`
}

function generateSquad(){
    document.getElementById('game').innerHTML = ''
    const boxSize = getRandomInt(30, 100)
    const gameSize = document.getElementById('game').getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize
    const box = document.createElement('div')
    box.style.width = box.style.height = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = `${colors[getRandomInt(0, colors.length)]}`
    box.style.top = getRandomInt(0, maxTop) + 'px'
    box.style.left = getRandomInt(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    document.getElementById('game').insertAdjacentElement('afterbegin', box)
}

document.getElementById('game').addEventListener('click', checkClick)

function countResultTable() {
    max = results[0]
    for (let i = 0; i <= results.length-1; i++) {
        if (results[i] >= max){
            max = results[i]
        }
    }
    return max
}

function checkClick(event){
    if (event.target.parentElement.classList[0] === 'game'){
        score++
        generateSquad()
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}