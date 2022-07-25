import { Entity, Vector2d } from 'melonjs/dist/melonjs.module.js';

class TankEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings, boundingRect) {
        // call the parent constructor
        super(x, y, settings);
        this.color = settings.color;
    }

    /**
     * update the entity
     */
    update(dt) {
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
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
};


export default TankEntity;
