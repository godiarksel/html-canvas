class Sprite {
    constructor({position, imgSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}){
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
        this.offset = offset;
    }

    draw(){
        context.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            );
    }

    animateFrames(){
        this.framesElapsed ++;
        if(this.framesElapsed % this.framesDelay === 0){
            if(this.frameCurrent < this.framesMax - 1){
                this.frameCurrent ++;
            } else {
                this.frameCurrent = 0;
            }
        }
    }

    update(){
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        colour = 'red',  
        imgSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        movements,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }){
        super({
            position,
            imgSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        };
        this.colour = colour;
        this.isAttacking
        this.health = 100;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesDelay = 10;
        this.movements = movements;

        for (let movement in this.movements) {
            movements[movement].image = new Image();
            movements[movement].image.src = movements[movement].imgSrc;
        }
        console.log(this.movements)

    }


    update(){
        this.draw();
        this.animateFrames();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        //  context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 38) {
                this.velocity.y = 0;
                this.position.y = 388;
        } else this.velocity.y += gravity;
    }

    attack(){
        this.switchMovements('attack1')
        this.isAttacking = true;  
    }

    takeHit(){
        this.switchMovements('takeHit')
        this.health -= 10; 
    }

    switchMovements(movement){
        // overrides other mvts with attack mvt
        if(
        this.image === this.movements.attack1.image &&
        this.frameCurrent < this.movements.attack1.framesMax - 1
            ) 
            return
        // overrides other mvts with take hit mvt
            if(
        this.image === this.movements.takeHit.image &&
        this.frameCurrent < this.movements.takeHit.framesMax - 1
            ) 
            return
 
        switch (movement){
            case 'idle':
              if(this.image !== this.movements.idle.image) {
                this.image = this.movements.idle.image;
                this.framesMax = this.movements.idle.framesMax;
                this.frameCurrent = 0;
              } 
              break;
            case 'run':
              if(this.image !== this.movements.run.image){
                this.image = this.movements.run.image;
                 this.framesMax = this.movements.run.framesMax;
                 this.frameCurrent = 0;
              }   
              break;
            case 'jump':
              if(this.image !== this.movements.jump.image){
                this.image = this.movements.jump.image;
                this.framesMax = this.movements.jump.framesMax;
                this.frameCurrent = 0;
              }  
               break;
            case 'fall':
              if(this.image !== this.movements.fall.image){
                this.image = this.movements.fall.image;
                this.framesMax = this.movements.fall.framesMax;
                this.frameCurrent = 0;
              }  
               break;
            case 'attack1':
              if(this.image !== this.movements.attack1.image){
                this.image = this.movements.attack1.image;
                this.framesMax = this.movements.attack1.framesMax;
                this.frameCurrent = 0;
              }  
               break;
            case 'takeHit':
              if(this.image !== this.movements.takeHit.image){
                this.image = this.movements.takeHit.image;
                this.framesMax = this.movements.takeHit.framesMax;
                this.frameCurrent = 0;
              }  
               break;
        }
    }

}