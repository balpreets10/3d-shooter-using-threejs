import * as THREE from 'three';

export class Lighting {
    private ambientLight: THREE.AmbientLight;
    private directionalLight: THREE.DirectionalLight;

    constructor() {
        this.ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
        this.directionalLight.position.set(5, 10, 7.5); // Position of the light
    }

    public addToScene(scene: THREE.Scene): void {
        scene.add(this.ambientLight);
        scene.add(this.directionalLight);
    }
}