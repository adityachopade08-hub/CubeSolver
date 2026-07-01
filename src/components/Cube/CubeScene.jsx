import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import Cube from "../../engine/core/Cube";
import CubeletMesh from "./CubeletMesh";

function Scene({ cube }) {

    const [, refresh] = useState(0);

    useFrame(() => {

        cube.update();

        refresh(v => v + 1);

    });

    return (

        <>

            <color attach="background" args={["#111827"]} />

            <ambientLight intensity={1.5} />

            <directionalLight position={[5,5,5]} intensity={2}/>

            <directionalLight position={[-5,-5,-5]} intensity={1}/>

            {

                cube.getCubelets().map(cubelet=>(

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

        </>

    );

}

function CubeScene() {

    const cubeRef = useRef(new Cube());

    const cube = cubeRef.current;

    useEffect(()=>{

        function key(e){

            cube.execute(

                e.key.toUpperCase()

            );

        }

        window.addEventListener("keydown",key);

        return ()=>window.removeEventListener("keydown",key);

    },[]);

    return(

        <Canvas

            camera={{

                position:[6,6,6],

                fov:45

            }}

        >

            <Scene cube={cube}/>

        </Canvas>

    );

}

export default CubeScene;