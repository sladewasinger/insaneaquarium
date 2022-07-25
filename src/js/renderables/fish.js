import { Entity, Renderable, Vector2d, input, Text, Sprite, loader } from 'melonjs/dist/melonjs.module.js';

class FishEntity extends Sprite {

    /**
     * constructor
     */
    constructor(x, y, width, height, color, boundingRect) {
        // call the parent constructor
        const image = loader.getImage('fish');
        super(x, y, {
            width: width,
            height: height,
            image: image
        })
        this.pos = new Vector2d(x, y);
        this.x = x;
        this.y = y;
        this.maxSpeed = 2;
        this.width = width;
        this.height = height;
        this.color = color;
        this.boundingRect = boundingRect;
        this.targetPos = new Vector2d(200, 40);
        this.targetReached = false;
        this.randomizeTargetPos();
    }

    randomizeTargetPos() {
        const randomPos = new Vector2d(
            Math.floor(1000 * Math.random() - 500),
            Math.floor(1000 * Math.random() - 500));

        this.targetPos = this.pos
            .clone()
            .add(randomPos);

        if (this.targetPos.x >= this.boundingRect.max.x - this.width / 2 - 50) {
            this.targetPos.x = this.boundingRect.max.x - this.width / 2 - 50;
        }
        if (this.targetPos.y >= this.boundingRect.max.y - this.height / 2 - 50) {
            this.targetPos.y = this.boundingRect.max.y - this.height / 2 - 50;
        }
        if (this.targetPos.x < 0 + this.width / 2 + 50) {
            this.targetPos.x = 0 + this.width / 2 + 50;
        }
        if (this.targetPos.y < 0 + this.height / 2 + 50) {
            this.targetPos.y = 0 + this.height / 2 + 50;
        }
    }

    /**
     * update the entity
     */
    update(dt) {
        const dist = this.pos.distance(this.targetPos);

        let movement = this.targetPos
            .clone()
            .sub(this.pos)
            .normalize()
            .scale(this.maxSpeed);

        if (dist < this.width * 3) {
            movement = this.targetPos
                .clone()
                .sub(this.pos)
                .scale(0.03)
                .clamp(-this.maxSpeed, this.maxSpeed);
        }

        if (dist <= 15) {
            if (!this.targetReached) {
                this.targetReached = true;
                setTimeout(() => {
                    this.targetReached = false;
                    this.randomizeTargetPos()
                }, 3000 * Math.random() + 250);
            }
        } else {
            this.pos.add(movement);
        }

        if (this.pos.x >= this.boundingRect.max.x - this.width / 2) {
            this.pos.x = this.boundingRect.max.x - this.width / 2;
        }
        if (this.pos.y >= this.boundingRect.max.y - this.height / 2) {
            this.pos.y = this.boundingRect.max.y - this.height / 2;
        }
        if (this.pos.x < 0 + this.width / 2) {
            this.pos.x = 0 + this.width / 2;
        }
        if (this.pos.y < 0 + this.height / 2) {
            this.pos.y = 0 + this.height / 2;
        }


        // call the parent method
        return super.update(dt);
    }

    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision(response, other) {
        // Make all other objects solid
        return false;
    }

    // draw(renderer) {
    //     renderer.setColor(this.color);
    //     renderer.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
    //     // renderer.setColor("#000");
    //     // renderer.fillRect(this.targetPos.x, this.targetPos.y, 10, 10);
    //     // var font = new Text(100, 100, { font: "Arial", size: 16, fillStyle: "#000", text: "TANK" });
    //     // font.draw(renderer, `${this.targetPos.x.toFixed(0)}, ${this.targetPos.x.toFixed(0)} `, this.targetPos.x - 40, this.targetPos.y - 20);
    // }
};


export default FishEntity;
