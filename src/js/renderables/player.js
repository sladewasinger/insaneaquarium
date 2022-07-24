import { Entity } from 'melonjs/dist/melonjs.module.js';

class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);
        this.color = settings.color;
        this.body.setMaxVelocity(0, 0);
        console.log("POS: ", x, y);
    }

    /**
     * update the entity
     */
    update(dt) {
        // change body force based on inputs
        //....
        // call the parent method
        return super.update(dt);
    }

    /**
      * colision handler
      * (called when colliding with other objects)
      */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }

    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
};


export default PlayerEntity;
