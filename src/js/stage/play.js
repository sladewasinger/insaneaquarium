import { Stage, game, ColorLayer, BitmapText, Vector2d, Renderer } from 'melonjs/dist/melonjs.module.js';
import * as me from 'melonjs/dist/melonjs.module.js';
import FishEntity from "../renderables/fish.js";
import TankEntity from '../renderables/tank.js';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.world.gravity = new Vector2d(0, 0);

        this.fishes = [];
        this.startingFish = 10;
        this.boundingRect = game.viewport.getBounds();

        game.world.addChild(new ColorLayer('background', '#013'), 0);

        const tank = new TankEntity(
            5,
            5,
            {
                width: this.boundingRect.max.x - 20,
                height: this.boundingRect.max.y - 20,
                color: "#aaf",
                shape: "rect"
            });
        game.world.addChild(tank, 1);

        console.log(game.viewport);
        for (var i = 0; i < this.startingFish; i++) {
            const fish = new FishEntity(
                this.boundingRect.max.x * Math.random(),
                this.boundingRect.max.y * Math.random(),
                50,
                50,
                "#0ff",
                this.boundingRect);
            this.fishes.push(fish);
            game.world.addChild(fish, 2 + i);
        }
    }
};

export default PlayScreen;
