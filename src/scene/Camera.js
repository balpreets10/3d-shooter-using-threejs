import * as THREE from 'three';

export class Camera {
    private camera: THREE.PerspectiveCamera;

    constructor(fov: number, aspect: number, near: number, far: number) {
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 1, 5); // Set initial camera position
    }

    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public updateCameraPosition(x: number, y: number, z: number): void {
        this.camera.position.set(x, y, z);
    }

    public lookAt(target: THREE.Vector3): void {
        this.camera.lookAt(target);
    }
}