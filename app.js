const container = document.querySelector('#container')
for (let i=0; i < 285 ; i++){
    let cell = document.createElement('div')
    cell.id = `div` + i;
    cell.className = 'cells';
    container.appendChild(cell)
}

let spaceshipIndex = 256
let missileIndex = spaceshipIndex
let containerWidth = 19;
const cells = document.querySelectorAll('.cells')
let squares = Array.from(cells);
squares[spaceshipIndex].classList.add('spaceship')
let spaceship = squares[spaceshipIndex]




//green aliens
for(g = 0 ; g < cells.length - 270; g++){
    cells[g].classList.add('green-alien')
}
//red aliens
for(r = 19 ; r < cells.length - 251; r++){
    cells[r].classList.add('red-alien')
}
//yellow aliens
for(y = 38 ; y < cells.length - 232; y++){
    cells[y].classList.add('yellow-alien')
}
//purple aliens
for(p = 57 ; p < cells.length - 213; p++){
    cells[p].classList.add('purple-alien')
}
    


const moveMissile = () => {
    squares[missileIndex].classList.remove('missile')
    missileIndex -= 19
    squares[missileIndex].classList.add('missile')

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
        case "ArrowUp":
            setInterval(moveMissile, 100)
        break;
    }
        
    
    //after breaking out of the switch statement create a
    // spaceship class on the new div index
    squares[spaceshipIndex].classList.add('spaceship')
}



window.addEventListener('keydown', moveSpaceship)



