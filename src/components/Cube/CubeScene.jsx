import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import Cube from "../../engine/core/Cube";
import CubeRenderer from "./CubeRenderer";

import { useCube } from "../../context/CubeContext";

function Scene({ cube }) {

    const [, refresh] = useState(0);

    useFrame(() => {

        cube.update();

        refresh(v => v + 1);

    });

    return (

        <>

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

            <CubeRenderer cube={cube} />

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

    const {

        setMoves,

        setMoveCount,

        setScramble

    } = useCube();

    useEffect(() => {

        function handleKey(e) {

            const key = e.key.toUpperCase();

            if (!"RLUDFB".includes(key))
                return;

            cube.execute(key);

            setMoves(previous => [

                ...previous,

                key

            ]);

            setMoveCount(previous => previous + 1);

        }

        window.addEventListener(

            "keydown",

            handleKey

        );

        const scrambleBtn = document.getElementById("scrambleBtn");

        const resetBtn = document.getElementById("resetBtn");

        const undoBtn = document.getElementById("undoBtn");

        const redoBtn = document.getElementById("redoBtn");

        scrambleBtn?.addEventListener("click", () => {

            cube.scramble();

            if (cube.history.length > 0) {

                setScramble(

                    cube.history[

                        cube.history.length - 1

                    ]

                );

            }

        });

        resetBtn?.addEventListener("click", () => {

            cube.reset();

            setMoves([]);

            setMoveCount(0);

            setScramble("");

        });

        undoBtn?.addEventListener("click", () => {

            console.log("Undo Coming Soon");

        });

        redoBtn?.addEventListener("click", () => {

            console.log("Redo Coming Soon");

        });

        return () => {

            window.removeEventListener(

                "keydown",

                handleKey

            );

        };

    }, []);

    return (

        <Canvas

            camera={{

                position: [6, 6, 6],

                fov: 45

            }}

        >

            <Scene cube={cube} />

        </Canvas>

    );

}

export default CubeScene;