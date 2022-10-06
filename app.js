const backgroundMusic = new Audio('../sounds/space.mp3')
backgroundMusic.loop = true
const shootSound = new Audio('../sounds/shoot2.mp3')
const gameOver = new Audio('../sounds/dead.mp3')

const container = document.querySelector('#container')
const playerScore = document.querySelector('#player-score')
const hiScore = document.querySelector('#hi-score')
const message = document.querySelector('#message')
const restartBtn = document.querySelector('#restart-btn')

//Creates grid squares with a for loop 19 X 19
for (let i=0; i < 285 ; i++){
    let cell = document.createElement('div')
    cell.id = `div` + i;
    cell.className = 'cells';
    container.appendChild(cell)
}

const cells = document.querySelectorAll('.cells')
let spaceshipIndex = 256
let containerWidth = 19;
let highestScore = 0;
let score = 0
let num = 1;
let movingRight = true
let squares = Array.from(cells);
squares[spaceshipIndex].classList.add('spaceship')
let spaceship = squares[spaceshipIndex]
let graveyard = []

backgroundMusic.play();
//green aliens
const addGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
    if(!graveyard.includes(g)){   
    squares[aliens[g]].classList.add('green-alien', 'alien')
    }
  }
}
const removeGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
      squares[aliens[g]].classList.remove('green-alien', 'alien')
  }
}

//red aliens
const addRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      if(!graveyard.includes(r)){ 
        squares[aliens[r]].classList.add('red-alien', 'alien')
      }
  }
}
const removeRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      squares[aliens[r]].classList.remove('red-alien', 'alien')
  }
}

//yellow aliens
const addYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
    if(!graveyard.includes(y)){ 
      squares[aliens[y]].classList.add('yellow-alien', 'alien')
    }
  }
}
const removeYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
      squares[aliens[y]].classList.remove('yellow-alien', 'alien')
  }
}

//purple aliens
const addPurpleAliens = () => { 
  for(let p = 45 ; p < aliens.length; p++){
    if(!graveyard.includes(p)){  
    squares[aliens[p]].classList.add('purple-alien', 'alien')
    }
  }
}
const removePurpleAliens = () => { 
  for(let p = 45 ; p < aliens.length; p++){
      squares[aliens[p]].classList.remove('purple-alien', 'alien')
  }
}

let aliens = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14,
  19, 20 , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ,31, 32, 33,
  38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
  
]
const startGame = () => { 
addGreenAliens()
addRedAliens()
addYellowAliens()
addPurpleAliens()
//Adds movement to any type of alien
const moveAliens = () => {
  const leftBorder = aliens[0] % containerWidth === 0;
  const rightBorder = aliens[aliens.length - 1] % containerWidth === containerWidth - 1;

  removeGreenAliens()
  removeRedAliens()
  removeYellowAliens()
  removePurpleAliens()



  if(rightBorder && movingRight) {
    for(let i = 0; i < aliens.length; i++){
      // + 1 forced the aliens to start at the border
      aliens[i] += containerWidth + 1
      // change the direction to the left
      num = -1
      //break didn't work so I added a boolean and that seemed to help
      movingRight = false
    }
  }

  if(leftBorder && !movingRight) {
    for(let i = 0; i < aliens.length; i++){
      // - 1 forces the aliens to the left border
      aliens[i] += containerWidth - 1
      //changes the direction to the right
      num = 1
      movingRight = true
    }
  }

  for(let i = 0; i < aliens.length; i++){
    aliens[i] += num
  }
  addGreenAliens()
  addRedAliens()
  addYellowAliens()
  addPurpleAliens()
  
  
  //every interval the game checks for a game over,and a win
  // checkForWin();
  checkForGameOver();
  
}
alienSpeed = setInterval(moveAliens, 300)
}



const moveSpaceship = (e) => {
  // removes the last spaceship class, if not they just clone themselves
  squares[spaceshipIndex].classList.remove('spaceship')
  //spaceshop moves from div 247 - 265 
  switch (e.key) {
    case "ArrowLeft":
        //247 % 19 = 0, 
        //as long as remainder does not equal 0, move one div to the left
        if(spaceshipIndex % containerWidth !== 0){
            spaceshipIndex -= 1;
        }
    break;
    case "ArrowRight":
        // 265 % 19 = 18
        //as long as remainder does not equal 18, move one div to the right
        if(spaceshipIndex % containerWidth !== 18){
        spaceshipIndex += 1; 
        }
    break;
  }
  //after breaking out of the switch statement create a
  // spaceship class on the new div index
  squares[spaceshipIndex].classList.add('spaceship')
}

const shootMissiles = (e) => {
  let shoot;
  let missileIndex = spaceshipIndex
  squares[missileIndex].classList.remove('missile')

  const moveMissile = () => {
    if (squares[missileIndex] !== undefined){ 
    squares[missileIndex].classList.remove('missile')
    missileIndex -= 19
    squares[missileIndex].classList.add('missile')
    
    
    
      if (squares[missileIndex].classList.contains('purple-alien')){
        squares[missileIndex].classList.remove('purple-alien') 
        squares[missileIndex].classList.remove('missile') 
        clearInterval(shoot)
        addScore();
        
      }else if(squares[missileIndex].classList.contains('yellow-alien')){
          squares[missileIndex].classList.remove('yellow-alien')
          squares[missileIndex].classList.remove('missile') 
          clearInterval(shoot)
          addScore()

      }else if(squares[missileIndex].classList.contains('red-alien')){
          squares[missileIndex].classList.remove('red-alien') 
          squares[missileIndex].classList.remove('missile') 
          clearInterval(shoot)
          addScore()

      }else if(squares[missileIndex].classList.contains('green-alien')){
          squares[missileIndex].classList.remove('green-alien') 
          squares[missileIndex].classList.remove('missile') 
          clearInterval(shoot)
          addScore()
      }
      if (squares[missileIndex].classList.contains('alien')){ 
        const removeAliens = aliens.indexOf(missileIndex)
        graveyard.push(removeAliens)
      }
    
    }
  }
  switch (e.key) {
    case "ArrowUp":
      shootSound.play()
      shoot = setInterval(moveMissile, 250)
      
  }
  
}

const checkForGameOver = () => {
  if(squares[spaceshipIndex].classList.contains('alien', 'spaceship')){
    backgroundMusic.pause()
    gameOver.play()
    message.innerText = `GAME OVER`
    clearInterval(alienSpeed)
    hiScoreCount()
    removeGreenAliens()
    removeRedAliens()
    removeYellowAliens()
    removePurpleAliens()}
  //  }else if(){

  //  }
}

const reset = () => {
  aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14,
    19, 20 , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ,31, 32, 33,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
    
  ]
  startGame();
  
}

// if all the aliens are on the graveyard, you win
// const checkForWin = () => {
//   if(!squares.classList.contains('aliens')){
//     console.log(`You Win`)
//     hiScoreCount()

//   }
// }


const addScore = () => {
    score += 10
    playerScore.innerText = score;
}

const hiScoreCount = () => {
  if(score > highestScore ){
      highestScore = score
      hiScore.innerText = score
  }
  return highestScore
}

//moves the all aliens 1 square at a time every 300ms


window.addEventListener('keydown', moveSpaceship)
window.addEventListener('keydown', shootMissiles)
restartBtn.addEventListener('click', reset)

startGame();
