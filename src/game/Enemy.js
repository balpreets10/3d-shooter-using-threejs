// src/game/Enemy.ts

export class Enemy {
    position: THREE.Vector3;
    health: number;

    constructor(position: THREE.Vector3, health: number) {
        this.position = position;
        this.health = health;
    }

    move(direction: THREE.Vector3) {
        this.position.add(direction);
    }

    attack() {
        // Implement attack logic here
    }
}