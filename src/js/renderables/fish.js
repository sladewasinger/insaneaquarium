import { Entity, Renderable, Vector2d } from 'melonjs/dist/melonjs.module.js';

class FishEntity extends Renderable {

    /**
     * constructor
     */
    constructor(x, y, width, height, color, boundingRect) {
        // call the parent constructor
        super(x, y);
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
        this.targetPos = new Vector2d(Math.random() * (this.boundingRect.max.x - 100) + 50, Math.random() * (this.boundingRect.max.y - 100) + 50);
    }

    /**
     * update the entity
     */
    update(dt) {
        const movement = this.targetPos
            .clone()
            .sub(this.pos)
            .scale(0.01)
            .clamp(-this.maxSpeed, this.maxSpeed);
        if (this.pos.clone().distance(this.targetPos) <= 10) {
            if (!this.targetReached) {
                this.targetReached = true;
                setTimeout(() => {
                    this.targetReached = false;
                    this.randomizeTargetPos()
                }, 3000 * Math.random() + 500);
            }
        } else {
            this.pos.add(movement);
        }

        if (this.pos.x >= this.boundingRect.max.x - this.width / 2) {
            this.pos.x = this.boundingRect.max.x - this.width;
        }
        if (this.pos.y >= this.boundingRect.max.y - this.height / 2) {
            this.pos.y = this.boundingRect.max.y - this.height;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
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

    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
        renderer.setColor("#000");
        renderer.fillRect(this.targetPos.x, this.targetPos.y, 10, 10);
    }
};


export default FishEntity;
