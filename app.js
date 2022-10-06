const backgroundMusic = new Audio('../sounds/space.mp3')
backgroundMusic.loop = true

const shootSound = new Audio('../sounds/shoot2.mp3')

const gameOver = new Audio('../sounds/dead.mp3')
const container = document.querySelector('#container')
const playerScore = document.querySelector('#player-score')
const hiScore = document.querySelector('#hi-score')

for (let i=0; i < 285 ; i++){
    let cell = document.createElement('div')
    cell.id = `div` + i;
    cell.className = 'cells';
    container.appendChild(cell)
}

let spaceshipIndex = 256
let containerWidth = 19;
const cells = document.querySelectorAll('.cells')
let squares = Array.from(cells);
squares[spaceshipIndex].classList.add('spaceship')
let spaceship = squares[spaceshipIndex]
let shoot;
let trashCan = []

backgroundMusic.play();
//green aliens
const addGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
    if(!trashCan.includes(g)){   
    squares[aliens[g]].classList.add('green-alien')
    }
  }
}
const removeGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
      squares[aliens[g]].classList.remove('green-alien', 'alien')
  }
}

const addRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      if(!trashCan.includes(r)){ 
        squares[aliens[r]].classList.add('red-alien', 'alien')
      }
  }
}
const removeRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      squares[aliens[r]].classList.remove('red-alien', 'alien')
  }
}

const addYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
    if(!trashCan.includes(y)){ 
      squares[aliens[y]].classList.add('yellow-alien', 'alien')
    }
  }
}
const removeYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
      squares[aliens[y]].classList.remove('yellow-alien', 'alien')
  }
}


const addPurpleAliens = () => { 
  for(let p = 45 ; p < aliens.length; p++){
    if(!trashCan.includes(p)){  
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


const alien = document.querySelectorAll('.alien')
addGreenAliens()
addRedAliens()
addYellowAliens()
addPurpleAliens()
//Adds movement to any type of alien
const moveAliens = () => {
  const leftEdge = aliens[0] % containerWidth === 0;
  const rightEdge = aliens[alien.length - 1] % containerWidth === containerWidth - 1;
  removeGreenAliens()
  removeRedAliens()
  removeYellowAliens()
  removePurpleAliens()
  for(let i = 0; i < aliens.length; i++){
    aliens[i] += 1
  }
  addGreenAliens()
  addRedAliens()
  addYellowAliens()
  addPurpleAliens()
  
 
  //every interval the game checks for a game over, a win, accumulates point, and checks for a hi-score
  checkForGameOver();
  checkForWin();
  addScore();
  

}
alienSpeed = setInterval(moveAliens, 6000)


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
      }else if(squares[missileIndex].classList.contains('yellow-alien')){
          squares[missileIndex].classList.remove('yellow-alien')
          squares[missileIndex].classList.remove('missile') 
          
      }else if(squares[missileIndex].classList.contains('red-alien')){
          squares[missileIndex].classList.remove('red-alien') 
          squares[missileIndex].classList.remove('missile') 
        
      }else if(squares[missileIndex].classList.contains('green-alien')){
          squares[missileIndex].classList.remove('green-alien') 
          squares[missileIndex].classList.remove('missile') 
          
      }
        const removeAliens = aliens.indexOf(missileIndex)
        trashCan.push(removeAliens)
    
    }
  }
  switch (e.key) {
    case "ArrowUp":
      shootSound.play()
      shoot = setInterval(moveMissile, 150)
      break;
  }
}

const checkForGameOver = () => {
  if(squares[spaceshipIndex].classList.contains('alien', 'spaceship')){
    backgroundMusic.pause()
    gameOver.play()
    console.log(`Game Over`)
    clearInterval(shoot)
    clearInterval(alienSpeed)
    
  }
}

const checkForWin = () => {
  if(!squares.classList.contain('alien')){
    console.log(`You Win`)
  }
}

const addScore = () => {
  let sumScore = 0
  if(squares[missileIndex].classList.contains('alien', 'missile')){
    sumScore += 1
    playerScore.innerText = sumScore;
  }
}



console.log(squares)




window.addEventListener('keydown', moveSpaceship)
window.addEventListener('keydown', shootMissiles)
