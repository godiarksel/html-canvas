const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }

    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
                this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
}

const playerOne = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    }
});

const playerTwo = new Sprite({
    position: {
        x: 400,
        y: 100
    },

    velocity: {
        x: 0,
        y: 0
    }
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
};

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