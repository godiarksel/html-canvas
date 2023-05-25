const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
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

const animate = () => {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    playerOne.update();
    playerTwo.update();
}

animate();


window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'd':
            playerOne.velocity.x = 1;
            break;
        case 'a':
            playerOne.velocity.x = -1;
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            playerOne.velocity.x = 0;
            break;
        case 'a':
            playerOne.velocity.x = 0;
            break;
    }
})