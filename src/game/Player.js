class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.moveSpeed = 0.5;
        this.jumpForce = 0.5;
        this.gravity = 0.02;
        this.velocity = new THREE.Vector3();
        this.isJumping = false;
        this.grounded = false;
        this.obstacles = []; // Store obstacles for collision checking

        // Player model (simple cube for now)
        const geometry = new THREE.BoxGeometry(2, 4, 2);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.position.set(-5, 2, -5);
        scene.add(this.mesh);

        // Camera settings
        this.cameraOffset = new THREE.Vector3(0, 5, 10);
        this.updateCamera();


        // Initialize player collider with proper size
        this.collider = new THREE.Box3();
        this.collider.setFromObject(this.mesh);
        this.collisionRadius = 1; // Adjust this value for tighter/looser collisions
        this.gravity = 0.015; // Reduced gravity for better feel
        this.jumpForce = 0.4;
        this.velocity = new THREE.Vector3();
        this.grounded = false;

        // Debug visualization
        if (scene.userData.debug) {
            this.colliderHelper = new THREE.Box3Helper(this.collider, 0x0000ff);
            scene.add(this.colliderHelper);
        }
        // Movement state
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false
        };

        // Setup controls
        this.setupControls();
    }

    setupControls() {
        // document.addEventListener('keydown', (e) => this.onKeyDown(e));
        // document.addEventListener('keyup', (e) => this.onKeyUp(e));
        // document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyW': this.keys.forward = true; break;
                case 'KeyS': this.keys.backward = true; break;
                case 'KeyA': this.keys.left = true; break;
                case 'KeyD': this.keys.right = true; break;
                case 'Space': if (this.grounded) this.velocity.y = this.jumpForce; break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyW': this.keys.forward = false; break;
                case 'KeyS': this.keys.backward = false; break;
                case 'KeyA': this.keys.left = false; break;
                case 'KeyD': this.keys.right = false; break;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (document.pointerLockElement) {
                this.mesh.rotation.y -= e.movementX * 0.002;
            }
        });
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW': this.keys.forward = true; break;
            case 'KeyS': this.keys.backward = true; break;
            case 'KeyA': this.keys.left = true; break;
            case 'KeyD': this.keys.right = true; break;
            case 'Space':
                if (!this.isJumping) {
                    this.jump();
                }
                break;
        }
    }

    onKeyUp(event) {
        switch (event.code) {
            case 'KeyW': this.keys.forward = false; break;
            case 'KeyS': this.keys.backward = false; break;
            case 'KeyA': this.keys.left = false; break;
            case 'KeyD': this.keys.right = false; break;
        }
    }

    onMouseMove(event) {
        // Rotate player based on mouse movement
        const sensitivity = 0.002;
        this.mesh.rotation.y -= event.movementX * sensitivity;
    }

    jump() {
        if (!this.isJumping) {
            this.velocity.y = this.jumpForce;
            this.isJumping = true;
        }
    }

    update() {

        // Update collider
        this.updateCollider();
        // Handle movement
        const moveVector = new THREE.Vector3();

        if (this.keys.forward) {
            moveVector.z -= this.moveSpeed;
        }
        if (this.keys.backward) {
            moveVector.z += this.moveSpeed;
        }
        if (this.keys.left) {
            moveVector.x -= this.moveSpeed;
        }
        if (this.keys.right) {
            moveVector.x += this.moveSpeed;
        }

        // Apply rotation to movement
        moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        //this.mesh.position.add(moveVector);

        const horizontalPosition = this.mesh.position.clone().add(moveVector);
        if (!this.checkCollisions(horizontalPosition)) {
            this.mesh.position.copy(horizontalPosition);
        }

        // Handle vertical movement (gravity/jumping)
        this.velocity.y -= this.gravity;
        const verticalPosition = this.mesh.position.clone();
        verticalPosition.y += this.velocity.y;

        if (!this.checkCollisions(verticalPosition)) {
            this.mesh.position.y = verticalPosition.y;
            this.grounded = false;
        } else {
            if (this.velocity.y < 0) {
                this.grounded = true;
            }
            this.velocity.y = 0;
        }

        // Update camera position
        const cameraOffset = this.cameraOffset.clone();
        cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        this.camera.position.copy(this.mesh.position).add(cameraOffset);
        this.camera.lookAt(this.mesh.position);


        // Ground check
        if (this.mesh.position.y <= 2) {
            this.mesh.position.y = 2;
            this.velocity.y = 0;
            this.isJumping = false;
        }

        this.updateCamera();
    }

    updateCamera() {
        // Calculate camera position based on player position and rotation
        const cameraOffset = this.cameraOffset.clone();
        cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mesh.rotation.y);
        this.camera.position.copy(this.mesh.position).add(cameraOffset);
        this.camera.lookAt(this.mesh.position);
    }

    // Add method to update collision boxes
    updateCollider() {
        this.collider.setFromObject(this.mesh);

        // Update helper if it exists
        if (this.colliderHelper) {
            this.colliderHelper.updateMatrixWorld(true);
        }
    }

    // Add method to set obstacles
    setObstacles(obstacles) {
        this.obstacles = obstacles;
    }

    // Method to check collisions
    checkCollisions(newPosition) {
        // Create a temporary bounding box for collision check
        const tempCollider = this.collider.clone();
        const movement = newPosition.clone().sub(this.mesh.position);
        tempCollider.translate(movement);

        // Add a small buffer to the player's bounding box
        this.collider.min.subScalar(0.1);
        this.collider.max.addScalar(0.1);

        // Check collision with each obstacle
        for (const obstacle of this.obstacles) {
            const obstacleBox = new THREE.Box3().setFromObject(obstacle);
            if (this.collider.intersectsBox(obstacleBox)) {
                return true;
            }
        }
        return false;
    }


}