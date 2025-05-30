// src/scene/Controls.ts

export class Controls {
    private keys: { [key: string]: boolean } = {};

    constructor() {
        this.init();
    }

    private init() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    public isKeyPressed(key: string): boolean {
        return this.keys[key] || false;
    }

    public update() {
        // Handle input updates for player movement and actions
        if (this.isKeyPressed('w')) {
            // Move forward
        }
        if (this.isKeyPressed('s')) {
            // Move backward
        }
        if (this.isKeyPressed('a')) {
            // Move left
        }
        if (this.isKeyPressed('d')) {
            // Move right
        }
        if (this.isKeyPressed('space')) {
            // Shoot
        }
    }
}