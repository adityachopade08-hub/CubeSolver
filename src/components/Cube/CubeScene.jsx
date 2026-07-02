import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";

import Cube from "../../engine/core/Cube";
import Scrambler from "../../engine/scramble/Scrambler";
import { useCube } from "../../context/CubeContext";
import { useCubeActions } from "../../context/CubeActions";
import CubeletMesh from "./CubeletMesh";

function Scene({ cube }) {
    const [, refresh] = useState(0);

    useFrame(() => {
        cube.update();
        refresh((value) => value + 1);
    });

    return (
        <>
            <color attach="background" args={["#111827"]} />

            <ambientLight intensity={1.5} />

            <directionalLight position={[5, 5, 5]} intensity={2} />

            <directionalLight position={[-5, -5, -5]} intensity={1} />

            {cube.getCubelets().map((cubelet) => (
                <CubeletMesh key={cubelet.id} cubelet={cubelet} />
            ))}

            <OrbitControls enablePan={false} minDistance={5} maxDistance={15} />
        </>
    );
}

function CubeScene() {
    const cubeRef = useRef(new Cube());
    const viewportRef = useRef(null);
    const cube = cubeRef.current;

    const {
        setMoveCount,
        setMoves,
        setScramble,
    } = useCube();

    const { registerActions } = useCubeActions();

    const executeMove = useCallback((algorithm) => {
        const normalized = algorithm.trim().toUpperCase();

        if (!normalized) {
            return;
        }

        const nextMoves = normalized.split(/\s+/);

        cube.execute(normalized);
        setMoves((previous) => [...previous, ...nextMoves]);
        setMoveCount((previous) => previous + nextMoves.length);
    }, [cube, setMoveCount, setMoves]);

    const scramble = useCallback(() => {
        const nextScramble = Scrambler.generate();

        setScramble(nextScramble);
        executeMove(nextScramble);
    }, [executeMove, setScramble]);

    const reset = useCallback(() => {
        cube.reset();
        setMoves([]);
        setScramble("");
        setMoveCount(0);
    }, [cube, setMoveCount, setMoves, setScramble]);

    const handleKeyDown = useCallback((event) => {
        const key = event.key.toUpperCase();

        if (!"RLUDFB".includes(key)) {
            return;
        }

        event.preventDefault();
        executeMove(key);
    }, [executeMove]);

    const focusViewport = useCallback(() => {
        viewportRef.current?.focus();
    }, []);

    useEffect(() => {
        registerActions({
            executeMove,
            reset,
            scramble,
        });

        focusViewport();

        return () => {
            registerActions();
        };
    }, [executeMove, focusViewport, registerActions, reset, scramble]);

    return (
        <div
            ref={viewportRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={focusViewport}
            style={{
                height: "100%",
                outline: "none",
                width: "100%",
            }}
        >
            <Canvas
                camera={{
                    position: [6, 6, 6],
                    fov: 45,
                }}
            >
                <Scene cube={cube} />
            </Canvas>
        </div>
    );
}

export default CubeScene;
