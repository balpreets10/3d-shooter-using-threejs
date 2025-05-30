# README.md

# Three.js Shooter Game

## Overview
This project is a 3D shooter game built using Three.js. It features a player character that can move and shoot enemies in a 3D environment.

## Project Structure
```
threejs-shooter
├── src
│   ├── index.ts
│   ├── game
│   │   ├── Game.ts
│   │   ├── Player.ts
│   │   ├── Enemy.ts
│   │   └── Weapon.ts
│   ├── scene
│   │   ├── Scene.ts
│   │   ├── Camera.ts
│   │   ├── Lighting.ts
│   │   └── Controls.ts
│   └── utils
│       ├── constants.ts
│       └── helpers.ts
├── public
│   ├── index.html
│   └── styles.css
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd threejs-shooter
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm start
   ```

## Gameplay
- Use the keyboard to control the player character.
- Shoot enemies to score points.
- Avoid enemy attacks to maintain health.

## Technologies Used
- Three.js
- TypeScript
- HTML
- CSS

## License
This project is licensed under the MIT License.