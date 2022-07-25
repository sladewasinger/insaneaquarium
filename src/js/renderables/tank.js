import { Entity, Vector2d, Text, input } from 'melonjs/dist/melonjs.module.js';

class TankEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings, boundingRect) {
        // call the parent constructor
        super(x, y, settings);
        this.color = settings.color;
        input.registerPointerEvent('pointermove', this, this.setPointerPos.bind(this));
    }

    setPointerPos(pointer) {
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

        renderer.setColor("#000");
        var font = new Text(100, 100, { font: "Arial", size: 24, fillStyle: "#000", text: "TANK" });
        font.draw(renderer, `${input.pointer.gameLocalX}, ${input.pointer.gameLocalY}`, 100, 100);
    }
};


export default TankEntity;
