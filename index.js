const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.5;



const playerOne = new Fighter({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    },

    offset: {
        x: 0,
        y: 0
    },
});

const playerTwo = new Fighter({
    position: {
        x: 400,
        y: 100
    },

    velocity: {
        x: 0,
        y: 0
    },

    colour: 'blue',

    offset: {
        x: -50,
        y: 0
    },
});

console.log(playerOne);
console.log(playerTwo);

const keys = {
    a:{
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

const collisionDetect = ({pOne, pTwo}) => {
    return (        
        pOne.attackBox.position.x + pOne.attackBox.width >= pTwo.position.x && 
        pOne.attackBox.position.x <= pTwo.position.x + pTwo.width &&
        pOne.attackBox.position.y + pOne.attackBox.height >= pTwo.position.y &&
        pOne.attackBox.position.y <= pTwo.position.y + pTwo.height)
}

const pickWinner = ({playerOne, playerTwo, timerId}) => {
    clearTimeout(timerId);
    document.querySelector('#textDisplayer').style.display = 'flex';
    if(playerOne.health === playerTwo.health) {
        document.querySelector('#textDisplayer').innerHTML = 'tie';  
    } else if(playerOne.health > playerTwo.health){
        document.querySelector('#textDisplayer').innerHTML = 'player one wins';
    } else if(playerOne.health < playerTwo.health){
        document.querySelector('#textDisplayer').innerHTML = 'player two wins';
    }
}

let timer = 10;
let timerId;
const timerCounter = () => {
    if (timer > 0){
        timerId = setTimeout(timerCounter, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    } 

    if(timer === 0) {
        document.querySelector('#textDisplayer').style.display = 'flex';
        pickWinner({playerOne, playerTwo, timerId})
    }
}

timerCounter();

const animate = () => {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    playerOne.update();
    playerTwo.update();

    playerOne.velocity.x = 0;
    playerTwo.velocity.x = 0;

    if (keys.a.pressed && playerOne.lastKey === 'a'){
        playerOne.velocity.x = -4.5;
    } else if (keys.d.pressed && playerOne.lastKey === 'd'){
        playerOne.velocity.x = 4.5;
    }

    if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
        playerTwo.velocity.x = -4.5;
    } else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight'){
        playerTwo.velocity.x = 4.5;
    }

    if (
        collisionDetect({
            pOne: playerOne,
            pTwo: playerTwo
        }) &&
        playerOne.isAttacking
        ){
        playerOne.isAttacking = false;
        playerTwo.health -= 20; 
        document.querySelector('#pTwoHealth').style.width = playerTwo.health + '%';
        console.log('playerTwo is hit');
    }

    if (
        collisionDetect({
            pOne: playerTwo,
            pTwo: playerOne
        }) &&
        playerTwo.isAttacking
        ){
        playerTwo.isAttacking = false;
        playerOne.health -= 20;
        document.querySelector('#pOneHealth').style.width = playerOne.health + '%';
        console.log('playerOne is hit');
    }
    // Knock out
        if (playerOne.health <= 0 || playerTwo.health <= 0) {
            pickWinner({playerOne, playerTwo, timerId})
        }
}

animate();

window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            playerOne.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            playerOne.lastKey = 'a';
            break;
        case 'w':
            playerOne.velocity.y = -20;
            break;
        case ' ':
            playerOne.attack();
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            playerTwo.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            playerTwo.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            playerTwo.velocity.y = -20;
            break;
            case 'ArrowDown':
                playerTwo.attack();
                break;
    
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})