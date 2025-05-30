// src/game/Game.ts
import { Scene } from '../scene/Scene';
import { Camera } from '../scene/Camera';
import { Lighting } from '../scene/Lighting';
import { World } from '../scene/World';
import * as THREE from 'three';

export class Game {

    private scene: Scene;
    private camera: Camera;
    private lighting: Lighting;
    private world: World;
    private isRunning: boolean;

    constructor() {
        this.scene = new Scene();
        this.camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.lighting = new Lighting();
        this.world = new World(this.scene.getScene());
        this.isRunning = false;

        // Add lighting to the scene
        this.lighting.addToScene(this.scene.getScene());
    }

    start() {
        this.isRunning = true;
        this.update();
    }

    stop() {
        this.isRunning = false;
    }

    private update() {
        if (this.isRunning) {
            // Update game logic here

            requestAnimationFrame(() => this.update());
        }
    }
}