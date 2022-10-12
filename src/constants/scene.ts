import { ang2Rad } from "../helper/math"

export const cameraProps = {
    fov: 70,
    aspect: 16 / 9,
    near: 1,
    far: 1000,
    position: {
        x: 4,
        y: 8,
        z: 9,
    }
}

export const backgroundColor = 0xF5F5F5

export const orbitControlProps = {
    target: [0, 0, 0],
    minPolarAngle: 0,
    maxPolarAngle: ang2Rad(360),
    maxDistance: 50,
    minDistance: 10,
}

export const rendererProps = {
    color: 0xffffff
}

export const ambientLightProps = {
    color: 0xa0a0a0
}

export const directionalLightProps = {
    color: 0xffffff,
    intensity: 1.5,
    position: {
        x: 0,
        y: 5,
        z: 10,
    }
}

export const gridProps = {
    size: 15,
    divisions: 30,
    drawAxis: false,
}

export const wallProps = {
    1: {
        initPos: [0, 0, -5],
        rotation: [0, Math.PI, 0],
        xInfo: {
            value: [-4.2, 4.2],
            canMove: true
        },
        zInfo: {
            value: -5,
            canMove: false
        }
    },
    2: {
        initPos: [5, 0, 0],
        rotation: [0, Math.PI / 2 * 3, 0],
        xInfo: {
            value: -5,
            canMove: false
        },
        zInfo: {
            value: [-4.2, 4.2],
            canMove: true
        }
    },
    3: {
        initPos: [0, 0, 5],
        rotation: [0, Math.PI * 2, 0],
        xInfo: {
            value: [-4.2, 4.2],
            canMove: true
        },
        zInfo: {
            value: 5,
            canMove: false
        }
    }
} as any