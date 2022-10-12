import { useDrag } from "@use-gesture/react";
import { useState } from "react";
import * as THREE from 'three'
import useStore from '../../../store';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";
import { wallProps } from "../../../constants/scene";

export const DraggableObject = (props: any) => {
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0.001, 0), 0)
    floorPlane.translate(new THREE.Vector3(0, 0.001, 0))

    const setDragInfo = useStore((state: any) => state.setDragInfo)
    const wallIndex = useStore((state: any) => state.wallIndex)

    let planeIntersectPoint = new THREE.Vector3()

    const wallInfo = wallProps[wallIndex]

    const [pos, setPos] = useState( wallInfo.initPos ) as any

    const object = useLoader(GLTFLoader, './models/wooden_door/scene.gltf');

    const bind = useDrag(
        ({ active, movement: [x, y], timeStamp, event }: any) => {
            event.stopPropagation()

            if (active) {
                document.body.style.cursor = 'grabbing'

                event.ray.intersectPlane(floorPlane, planeIntersectPoint)

                const newPos = {
                    x: !wallInfo.xInfo.canMove ? wallInfo.xInfo.value : planeIntersectPoint.x,
                    y: pos[1],
                    z: !wallInfo.zInfo.canMove ? wallInfo.zInfo.value : planeIntersectPoint.z
                }

                if( wallInfo.xInfo.canMove ) {
                    if( newPos.x <= wallInfo.xInfo.value[0] )
                        newPos.x = wallInfo.xInfo.value[0]
                    if( newPos.x >= wallInfo.xInfo.value[1] )
                        newPos.x = wallInfo.xInfo.value[1]
                }

                if( wallInfo.zInfo.canMove ) {
                    if( newPos.z <= wallInfo.zInfo.value[0] )
                        newPos.z = wallInfo.zInfo.value[0]
                    if( newPos.z >= wallInfo.zInfo.value[1] )
                        newPos.z = wallInfo.zInfo.value[1]
                }

                setPos([newPos.x, newPos.y, newPos.z])
            } else {
                document.body.style.cursor = 'grab'
            }
        
            setDragInfo({
                isDragging: active,
            })
        
            return timeStamp
        },
        { delay: false }
    )

    const onPointerOverHandler = (e: any) => {
        e.stopPropagation()
        document.body.style.cursor = 'grab'
    }

    const onPointerOutHandler = () => {
        document.body.style.cursor = ''
    }

    return (
        <>
            <mesh
                position={pos}
                {  ...bind() as any} 
                onPointerOver={ onPointerOverHandler } 
                onPointerOut={ onPointerOutHandler }
            >
                <mesh scale={[1.5, 1.5, 1.5]} rotation={ wallProps[wallIndex].rotation }>
                    <primitive object={ object.scene } />
                </mesh>
            </mesh>
        </>
    )
}

export default DraggableObject