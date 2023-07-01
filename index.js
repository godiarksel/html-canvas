const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.5;

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: './imgs/background.png'
})
const shop = new Sprite ({
    position: {
        x: 587,
        y: 215
    },
    imgSrc: './imgs/shop.png',
    scale: 2.5,
    framesMax: 6
})

const playerOne = new Fighter({
    position: {
        x: 50,
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
    imgSrc:'./imgs/playerone/Idle.png',
    framesMax: 10,
    scale: 2.5,
    offset: {
        x: 100,
        y: 58
    },
    movements: {
        idle: {
         imgSrc: './imgs/playerone/Idle.png',
         framesMax: 10
        },
        run: {
         imgSrc: './imgs/playerone/Run.png',
         framesMax: 8
        },
        jump: {
         imgSrc: './imgs/playerone/Jump.png',
         framesMax: 3
        },
        fall: {
         imgSrc: './imgs/playerone/Fall.png',
         framesMax: 3
        },
        attack1: {
         imgSrc: './imgs/playerone/Attack2.png',
         framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
    }
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
    imgSrc:'./imgs/playertwo/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 140,
        y: 160
    },
    movements: {
        idle: {
         imgSrc: './imgs/playertwo/Idle.png',
         framesMax: 8
        },
        run: {
         imgSrc: './imgs/playertwo/Run.png',
         framesMax: 8
        },
        jump: {
         imgSrc: './imgs/playertwo/Jump.png',
         framesMax: 2
        },
        fall: {
         imgSrc: './imgs/playertwo/Fall.png',
         framesMax: 2
        },
        attack1: {
         imgSrc: './imgs/playertwo/Attack1.png',
         framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
    }
});

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

timerCounter();

const animate = () => {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    playerOne.update();
    playerTwo.update();
    
    playerOne.velocity.x = 0;
    playerTwo.velocity.x = 0;

    // Fighter movement
    if (keys.a.pressed && playerOne.lastKey === 'a'){
        playerOne.velocity.x = -4.5;
        playerOne.switchMovements('run');
    } else if (keys.d.pressed && playerOne.lastKey === 'd'){
        playerOne.velocity.x = 4.5;
        playerOne.switchMovements('run');
    } else {
        playerOne.switchMovements('idle');
    }

    // Jumping
    if(playerOne.velocity.y < 0){
        playerOne.switchMovements('jump');
    } else if (playerOne.velocity.y > 0) {
        playerOne.switchMovements('fall');
    }

    if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft'){
        playerTwo.velocity.x = -4.5;
        playerTwo.switchMovements('run');
    } else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight'){
        playerTwo.velocity.x = 4.5;
        playerTwo.switchMovements('run');
    } else {
        playerTwo.switchMovements('idle');
    }

    if(playerTwo.velocity.y < 0){
        playerTwo.switchMovements('jump');
    } else if (playerTwo.velocity.y > 0) {
        playerTwo.switchMovements('fall');
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