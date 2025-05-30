// src/game/Weapon.ts

export class Weapon {
    private damage: number;

    constructor(damage: number) {
        this.damage = damage;
    }

    fire(): void {
        console.log(`Firing weapon with damage: ${this.damage}`);
    }

    reload(): void {
        console.log('Reloading weapon');
    }

    getDamage(): number {
        return this.damage;
    }
}