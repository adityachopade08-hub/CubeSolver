import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import Cube from "../../engine/core/Cube";
import CubeletMesh from "./CubeletMesh";

function CubeScene() {

    const cubeRef = useRef(new Cube());

    const cube = cubeRef.current;

    const cubelets = cube.getCubelets();

    return (

        <Canvas
            camera={{
                position: [6, 6, 6],
                fov: 45,
            }}
        >

            <color
                attach="background"
                args={["#111827"]}
            />

            <ambientLight intensity={1.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={2}
            />

            <directionalLight
                position={[-5, -5, -5]}
                intensity={1}
            />

            {

                cubelets.map((cubelet) => (

                    <CubeletMesh
                        key={cubelet.id}
                        cubelet={cubelet}
                    />

                ))

            }

            <OrbitControls
                enablePan={false}
                minDistance={5}
                maxDistance={15}
            />

        </Canvas>

    );

}

export default CubeScene;