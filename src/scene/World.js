class World {
    constructor(scene) {
        this.scene = scene;
        this.worldSize = {
            width: 100,
            height: 20,
            depth: 100
        };
        this.obstacles = []; // Initialize the obstacles array
        let debug = true;
    }

    init() {
        this.createFloor();
        this.createWalls();
        this.createObstacles();
    }

    createFloor() {
        const floorGeometry = new THREE.PlaneGeometry(this.worldSize.width, this.worldSize.depth);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    createWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
            roughness: 0.6,
            metalness: 0.2
        });

        const walls = [
            { size: [this.worldSize.width, this.worldSize.height, 2], position: [0, this.worldSize.height / 2, -this.worldSize.depth / 2] },
            { size: [this.worldSize.width, this.worldSize.height, 2], position: [0, this.worldSize.height / 2, this.worldSize.depth / 2] },
            { size: [2, this.worldSize.height, this.worldSize.depth], position: [this.worldSize.width / 2, this.worldSize.height / 2, 0] },
            { size: [2, this.worldSize.height, this.worldSize.depth], position: [-this.worldSize.width / 2, this.worldSize.height / 2, 0] }
        ];

        walls.forEach(wall => {
            const geometry = new THREE.BoxGeometry(...wall.size);
            const mesh = new THREE.Mesh(geometry, wallMaterial);
            mesh.position.set(...wall.position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
            this.obstacles.push(mesh); // Add wall to obstacles
        });
    }

    createObstacles() {
        const boxMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.7,
            metalness: 0.2
        });

        const boxPositions = [
            // Moved center box away from spawn point
            { pos: [5, 2, 5], size: [4, 4, 4] },
            { pos: [10, 2, 10], size: [4, 4, 4] },
            { pos: [-10, 2, -10], size: [4, 4, 4] },
            { pos: [10, 2, -10], size: [4, 4, 4] },
            { pos: [-10, 2, 10], size: [4, 4, 4] },
            { pos: [20, 1.5, 20], size: [3, 3, 3] },
            { pos: [-20, 1.5, -20], size: [3, 3, 3] }
        ];

        boxPositions.forEach(box => {
            const geometry = new THREE.BoxGeometry(...box.size);
            const mesh = new THREE.Mesh(geometry, boxMaterial);
            mesh.position.set(...box.pos);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // Add collision box as a property of the mesh
            mesh.userData.collider = new THREE.Box3().setFromObject(mesh);

            if (this.debug) {
                const helper = new THREE.Box3Helper(mesh.userData.collider, 0xffff00);
                this.scene.add(helper);
            }

            this.scene.add(mesh);
            this.obstacles.push(mesh); // Add box to obstacles
        });
    }

    getObstacles() {
        return this.obstacles;
    }
}