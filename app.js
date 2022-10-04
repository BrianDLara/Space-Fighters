const container = document.querySelector('#container')
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




//green aliens
for(g = 0 ; g < cells.length - 270; g++){
    cells[g].classList.add('green-alien', 'alien')
}
//red aliens
for(r = 19 ; r < cells.length - 251; r++){
    cells[r].classList.add('red-alien', 'alien')
}
//yellow aliens
for(y = 38 ; y < cells.length - 232; y++){
    cells[y].classList.add('yellow-alien', 'alien')
}
//purple aliens

for(p = 57 ; p < cells.length - 213; p++){
 cells[p].classList.add('purple-alien', 'alien')
}

let purpleAlien = document.getElementsByClassName('purple-alien')
console.log(purpleAlien)


const moveSpaceship = (e) => {
    let missileIndex = spaceshipIndex
    // removes the last spaceship class, if not they just clone themselves
    squares[spaceshipIndex].classList.remove('spaceship')
    const moveMissile = () => {
        if (squares[missileIndex] !== undefined){ 
        squares[missileIndex].classList.remove('missile')
        missileIndex -= 19
        squares[missileIndex].classList.add('missile')
        console.log(squares[missileIndex])
        
        if (squares[missileIndex].classList.contains('purple-alien')){
                squares[missileIndex].classList.remove('purple-alien') 
                squares[missileIndex].classList.remove('missile') 
                clearInterval(shoot)
        }else if(squares[missileIndex].classList.contains('yellow-alien')){
            squares[missileIndex].classList.remove('yellow-alien')
            squares[missileIndex].classList.remove('missile') 
            clearInterval(shoot)
        }else if(squares[missileIndex].classList.contains('red-alien')){
            squares[missileIndex].classList.remove('red-alien') 
            squares[missileIndex].classList.remove('missile') 
            clearInterval(shoot)
        }else if(squares[missileIndex].classList.contains('green-alien')){
            squares[missileIndex].classList.remove('green-alien') 
            squares[missileIndex].classList.remove('missile') 
            clearInterval(shoot)

        }
        
        }
        
    }
   
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
        case "ArrowUp":
            shoot = setInterval(moveMissile, 150)
        break;
    }
    //after breaking out of the switch statement create a
    // spaceship class on the new div index
    squares[spaceshipIndex].classList.add('spaceship')
    squares[missileIndex].classList.remove('missile')
}


// console.log(hit)



window.addEventListener('keydown', moveSpaceship)



