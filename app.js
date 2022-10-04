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
console.log(squares)
squares[spaceshipIndex].classList.add('spaceship')
let spaceship = squares[spaceshipIndex]

const a = [ 
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

for (let j=0; j < 14 ; j++){
    let greenAliens = squares.className = 'green-aliens';
    console.log(greenAliens)

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

window.addEventListener('keydown', moveSpaceship)



