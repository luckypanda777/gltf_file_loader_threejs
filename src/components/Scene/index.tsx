import { Canvas } from '@react-three/fiber'
import { ambientLightProps, backgroundColor, cameraProps, directionalLightProps, orbitControlProps } from '../../constants/scene'
import useStore from '../../store'
import DraggableObject from './DraggableObject'
import { Box, OrbitControls, Preload } from '@react-three/drei'
import { GridRenderer } from './GridHelper'
import { Suspense, useRef } from 'react'
import Loader from './Loader'

/**
 * 
 * Pre-render line button images and text
 */

export const Scene = () => {
    const controlRef = useRef() as any

    const dragInfo = useStore((state: any) => state.dragInfo)
    const wallIndex = useStore((state: any) => state.wallIndex)
    const setWallIndex = useStore((state: any) => state.setWallIndex)

    const onHoverWallHandler = (index: any) => {
        if( dragInfo.isDragging && index !== wallIndex ) {
            setWallIndex(index)
        }
    }

    return (
        <Canvas
            camera={{ fov: cameraProps.fov, position: [ cameraProps.position.x, cameraProps.position.y, cameraProps.position.z ] }}
            shadows
        > 
            <color attach="background" args={[ backgroundColor ]} />

            <GridRenderer />

            <ambientLight 
                color={ ambientLightProps.color }
            />
            
            <directionalLight 
                color={ directionalLightProps.color }
                intensity={ directionalLightProps.intensity }
                position={[ directionalLightProps.position.x, directionalLightProps.position.y, directionalLightProps.position.z ]}
            />

            <OrbitControls 
                minZoom={10}
                maxZoom={50} 
                minPolarAngle={orbitControlProps.minPolarAngle}
                maxDistance={orbitControlProps.maxDistance}
                minDistance={orbitControlProps.minDistance}
                target={[orbitControlProps.target[0], orbitControlProps.target[1], orbitControlProps.target[2]]}
                enabled={!dragInfo.isDragging} 
                ref={controlRef}
            />

            <Box args={[10, 5, 0.1]} position={[0, 2.5, -5]} onPointerOver={ () => onHoverWallHandler(1) }>
                <meshStandardMaterial color={0xffffff} />
            </Box>

            <Box args={[0.1, 5, 10]} position={[-5, 2.5, 0]} onPointerOver={ () => onHoverWallHandler(2) }>
                <meshStandardMaterial color={0xffffff} />
            </Box>
            
            <Box args={[10, 5, 0.1]} position={[0, 2.5, 5]} onPointerOver={ () => onHoverWallHandler(3) }>
                <meshStandardMaterial color={0xffffff} />
            </Box>

            <Box args={[10, 0.1, 10]} position={[0, 0, 0]}>
                <meshStandardMaterial color={0xffffff} />
            </Box>

            <Suspense fallback={<Loader />}>
                <DraggableObject />
            </Suspense>

            <Preload all />
        </Canvas>
    )
}

export default Scene