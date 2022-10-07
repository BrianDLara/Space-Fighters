//sounds
const backgroundMusic = new Audio('../sounds/space.mp3');
backgroundMusic.loop = true;
const shootSound = new Audio('../sounds/shoot2.mp3');
const gameOver = new Audio('../sounds/dead.mp3');
backgroundMusic.play();
const winSound = new Audio('../sounds/win.mp3');

// calling for variables
const container = document.querySelector('#container');
const playerScore = document.querySelector('#player-score');
const hiScore = document.querySelector('#hi-score');
const message = document.querySelector('#message');
const restartBtn = document.querySelector('#restart-btn');

//Creates grid squares with a for loop 19 X 19
for (let i=0; i < 285 ; i++){
    let cell = document.createElement('div');
    cell.id = `div` + i;
    cell.className = 'cells';
    container.appendChild(cell);
};
const cells = document.querySelectorAll('.cells');

//declaring variables globaly
let squares = Array.from(cells);
let spaceshipIndex = 256;
squares[spaceshipIndex].classList.add('spaceship');
let spaceship = squares[spaceshipIndex];
let containerWidth = 19;
let loseBorder = 266;
let highestScore = 0;
let score = 0;
let num = 1;
let filterAliens = 0;
let movingRight = true;
let graveyard = [];

//creates green aliens
const addGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
    if(!graveyard.includes(g)){   
    squares[aliens[g]].classList.add('green-alien', 'alien');
    }
  }
}

//removes green aliens
const removeGreenAliens = () => { 
  for(let g = 0 ; g < aliens.length -45; g++){
      squares[aliens[g]].classList.remove('green-alien', 'alien');
  }
}

//creates red aliens
const addRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      if(!graveyard.includes(r)){ 
        squares[aliens[r]].classList.add('red-alien', 'alien');
      }
  }
}

//removes red aliens
const removeRedAliens = () => { 
  for(let r = 15 ; r < aliens.length -30; r++){
      squares[aliens[r]].classList.remove('red-alien', 'alien');
  }
}

//creates yellow aliens
const addYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
    if(!graveyard.includes(y)){ 
      squares[aliens[y]].classList.add('yellow-alien', 'alien');
    }
  }
}

//removes yellow aliens
const removeYellowAliens = () => { 
  for(let y = 30 ; y < aliens.length -15; y++){
      squares[aliens[y]].classList.remove('yellow-alien', 'alien');
  }
}

//creates purple aliens
const addPurpleAliens = () => { 
  for(let p = 45 ; p < aliens.length; p++){
    if(!graveyard.includes(p)){  
    squares[aliens[p]].classList.add('purple-alien', 'alien');
    }
  }
}

//removes purple aliens
const removePurpleAliens = () => { 
  for(let p = 45 ; p < aliens.length; p++){
      squares[aliens[p]].classList.remove('purple-alien', 'alien');
  }
}

//I assigned the aliens to this values, not conventional if I want to make new levels
//for a future update, I'll randomly generate them
let aliens = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14,
  19, 20 , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ,31, 32, 33,
  38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
  57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
  ]

// created a function call startGame so it can be easier to reset the game 
const startGame = () => { 
//turns the music back one since game over turns it off
backgroundMusic.play();

//creates the aliens on the grid
addGreenAliens();
addRedAliens();
addYellowAliens();
addPurpleAliens();

//this function adds movement to all aliens and creates border logic
const moveAliens = () => {
  //since I have a square grid all values on the left most side return 0
  //as long as my remainder is 0, the aliens will hit a border
  //0 % 19=0 || 19 % 19=0 || 38 % 19=0
  const leftBorder = aliens[0] % containerWidth === 0;

  //same logic, as long as my remainder is 18 the aliens will hit a border on the right most side
  const rightBorder = aliens[59] % containerWidth === 18;
  removeGreenAliens();
  removeRedAliens();
  removeYellowAliens();
  removePurpleAliens();

  //if aliens hit the left border do this
  if(leftBorder && !movingRight) {
    for(let i = 0; i < aliens.length; i++){
      // moved all the aliens 18 spaces
      aliens[i] += 18;

      //changes the direction to the right
      num = 1

      movingRight = true;
    }
  }

  //if aliens hit the right border do this
  if(rightBorder && movingRight) {
    //loops through the aliens array and work with its values
    for(let i = 0; i < aliens.length; i++){
  
      // forced the aliens to move down and to start at the border
      //by moving each alien 20 spaces 
      aliens[i] += 20;
      
      // change the direction to the left
      num = -1;
      
      //break didn't work so I added a boolean and that seemed to help
      movingRight = false;
    }
  }
  
  //moves the aliens 1 space
  for(let i = 0; i < aliens.length; i++){
    aliens[i] += num;
  }
  addGreenAliens();
  addRedAliens();
  addYellowAliens();
  addPurpleAliens();
  
  
  //every interval the game checks for a game over,and a win
  checkForWin();
  checkForGameOver();
  
}
alienSpeed = setInterval(moveAliens, 600);
}



const moveSpaceship = (e) => {
  // removes the last spaceship class, if not they just clone themselves
  squares[spaceshipIndex].classList.remove('spaceship');
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
  squares[spaceshipIndex].classList.add('spaceship');
}


//broke appart the switch statements because the code was becoming too confusing
const shootMissiles = (e) => {
  let shoot;
  //the missile start point will always follow the spaceship
  let missileIndex = spaceshipIndex;

  // function where all my missile logic is at
  const moveMissile = () => {
    squares[missileIndex].classList.remove('missile');
    //my bullets were traveling off the screen so this is a quick way to patch the infinite loop
    //need to add border logic to this section
    if (!squares[missileIndex] !== undefined && missileIndex >=containerWidth){ 
    squares[missileIndex].classList.remove('missile');
    missileIndex -= 19;
    squares[missileIndex].classList.add('missile');
      
     //what happens if a missile hits a purple alien
      if (squares[missileIndex].classList.contains('purple-alien')){
      squares[missileIndex].classList.remove('purple-alien'); 
      squares[missileIndex].classList.remove('missile');
      clearInterval(shoot);
      addScore();
      
      //what happens if a missile hits a yellow alien
      }else if(squares[missileIndex].classList.contains('yellow-alien')){
          squares[missileIndex].classList.remove('yellow-alien');
          squares[missileIndex].classList.remove('missile');
          clearInterval(shoot);
          addScore();

      //what happens if a missile hits a red alien
      }else if(squares[missileIndex].classList.contains('red-alien')){
          squares[missileIndex].classList.remove('red-alien'); 
          squares[missileIndex].classList.remove('missile');
          clearInterval(shoot);
          addScore();
      //what happens if a missile hits a green alien
      }else if(squares[missileIndex].classList.contains('green-alien')){
          squares[missileIndex].classList.remove('green-alien'); 
          squares[missileIndex].classList.remove('missile'); 
          clearInterval(shoot);
          addScore();
      }
      
      //I was having a glitch were all the aliens kept re-appearing every time they moved 1 space,
      // so I moved and stored them in a empty array.
      if (squares[missileIndex].classList.contains('alien')){ 
        //the value of the alien that the player hit
        const deadAliens = aliens.indexOf(missileIndex);
        graveyard.push(deadAliens);
        //https://dev.to/soyleninjs/3-ways-to-remove-duplicates-in-an-array-in-javascript-259o
        //variables were repeating if I shot to fast so I'm filtering them and deleting duplicates
        filterAliens = [...new Set(graveyard)];
      } 
    }
  }
  switch (e.key) {
    case "ArrowUp":
      shootSound.play();
      shoot = setInterval(moveMissile, 250);
  }
  
}

//if a cell grom the grid contains a class alien and a class spaceship, it will cause gameover
const checkForGameOver = () => {
  if(squares[spaceshipIndex].classList.contains('alien', 'spaceship')){
    backgroundMusic.pause();
    gameOver.play();
    message.innerText = `GAME OVER`;
    clearInterval(alienSpeed);
    hiScoreCount();
    removeGreenAliens();
    removeRedAliens();
    removeYellowAliens();
    removePurpleAliens();
    
  }
// I wasn't getting a game over if the aliens didn't hit the ship, so now if the aliens get to the last row,
// player will get game over
  for (let i = 0; i < aliens.length; i++){
    if(aliens[i] > loseBorder){
      backgroundMusic.pause();
      gameOver.play();
      message.innerText = `GAME OVER`;
      clearInterval(alienSpeed);
      hiScoreCount();
      removeGreenAliens();
      removeRedAliens();
      removeYellowAliens();
      removePurpleAliens();
    }
  }
}


const reset = () => {
  //prevents setInterval from duplicating
  clearInterval(alienSpeed);
  //clears the whole board
  removeGreenAliens();
  removeRedAliens();
  removeYellowAliens();
  removePurpleAliens();
  message.innerText = "";
  playerScore.innerText = 0;
  //re-assigns the aliens
  aliens = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14,
    19, 20 , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ,31, 32, 33,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
  ]
  //emties the alien graveyard
  graveyard = [];
  filterAliens = 0;
  score = 0;
  //adds the aliens again
  addGreenAliens();
  addRedAliens();
  addYellowAliens();
  addPurpleAliens();
  //resets
  startGame();
}


const checkForWin = () => {
  if(filterAliens.length === aliens.length){
    backgroundMusic.pause();
      winSound.play();
      message.innerText = `YOU WIN!`;
      clearInterval(alienSpeed);
      hiScoreCount();
      removeGreenAliens();
      removeRedAliens();
      removeYellowAliens();
      removePurpleAliens();
  }
 }



const addScore = () => {
    score += 10;
    playerScore.innerText = score;
}

const hiScoreCount = () => {
  if(score > highestScore ){
      highestScore = score;
      hiScore.innerText = score;
  }
  //prevents highscore from resetting
  return highestScore;
}

//moves spaceship
window.addEventListener('keydown', moveSpaceship);

//shots the missile
window.addEventListener('keydown', shootMissiles);

//everytime you click reset the game re-starts
restartBtn.addEventListener('click', reset);

startGame();
