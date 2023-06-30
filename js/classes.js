class Sprite {
    constructor({position, imgSrc, scale = 1, framesMax = 1}){
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesDelay = 10;
    }

    draw(){
        context.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            );
    }

    update(){
        this.draw();
        this.framesElapsed ++;
        if(this.framesElapsed % this.framesDelay === 0){
            if(this.frameCurrent < this.framesMax - 1){
                this.frameCurrent ++;
            } else {
                this.frameCurrent = 0;
            }
        }
        
    }
}

class Fighter {
    constructor({position, velocity, colour = 'red', offset}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        };
        this.colour = colour;
        this.isAttacking
        this.health = 100;
    }

    draw(){
        context.fillStyle = this.colour;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

         if(this.isAttacking){       
            context.fillStyle = 'yellow';
            context.fillRect(this.attackBox.position.x, 
                            this.attackBox.position.y, 
                            this.attackBox.width, 
                            this.attackBox.height)}
        }

    update(){
        this.draw();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 38) {
                this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}