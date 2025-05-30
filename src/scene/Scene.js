import * as THREE from 'three';

export class Scene {
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;

    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    public addObject(object: THREE.Object3D) {
        this.scene.add(object);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public getScene() {
        return this.scene;
    }
}