import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import Cube from "../../engine/core/Cube";
import CubeletMesh from "./CubeletMesh";

function CubeScene() {

    const cubeRef = useRef(new Cube());

    const cube = cubeRef.current;

    const [, forceUpdate] = useState(0);

    useEffect(() => {

        cube.subscribe(() => {

            forceUpdate(n => n + 1);

        });

    }, []);

    useEffect(() => {

        function handleKey(e) {

            switch (e.key) {

                case "r":
                case "R":
                    cube.execute("R");
                    break;

                case "l":
                case "L":
                    cube.execute("L");
                    break;

                case "u":
                case "U":
                    cube.execute("U");
                    break;

                case "d":
                case "D":
                    cube.execute("D");
                    break;

                case "f":
                case "F":
                    cube.execute("F");
                    break;

                case "b":
                case "B":
                    cube.execute("B");
                    break;

                default:
                    break;

            }

        }

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);

    }, []);

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

                cube.getCubelets().map((cubelet) => (

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