const container = document.querySelector('#container')
let spaceshipIndex = 256
let containerWidth = 19;

for (let i=0; i < 285 ; i++){
    let cell = document.createElement('div')
    cell.id = `div` + i;
    cell.className = 'cells';
    container.appendChild(cell)
}
const cells = document.querySelectorAll('.cells')
let squares = Array.from(cells);
let spaceship = squares[spaceshipIndex].classList.add('spaceship')

const aliens = [ 
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
]

const moveSpaceship = (e) => {
    squares[spaceshipIndex].classList.remove('spaceship')
    switch (e.key) {
        case "ArrowLeft":
            if(spaceshipIndex % containerWidth !== 0){
                spaceshipIndex -= 1;
            }
            break;
        case "ArrowRight":
            if(spaceshipIndex % containerWidth < containerWidth - 1){
            spaceshipIndex += 1;   
            }
            break;
    }
    squares[spaceshipIndex].classList.add('spaceship')
}
window.addEventListener('keydown', moveSpaceship)




