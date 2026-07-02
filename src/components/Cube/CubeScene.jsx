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
    const redoStackRef = useRef([]);
    const viewportRef = useRef(null);
    const cube = cubeRef.current;

    const {
        moves,
        setMoveCount,
        setMoves,
        setScramble,
        setTimer,
    } = useCube();

    const { registerActions } = useCubeActions();

    const movesRef = useRef(moves);

    useEffect(() => {
        movesRef.current = moves;
    }, [moves]);

    const syncMoveState = useCallback((nextMoves) => {
        movesRef.current = nextMoves;
        setMoves(nextMoves);
        setMoveCount(nextMoves.length);
    }, [setMoveCount, setMoves]);

    const replayMoves = useCallback((nextMoves) => {
        cube.reset();

        if (nextMoves.length > 0) {
            cube.execute(nextMoves.join(" "));
        }
    }, [cube]);

    const executeMove = useCallback((algorithm) => {
        const normalized = algorithm.trim().toUpperCase();

        if (!normalized) {
            return;
        }

        const nextMoves = normalized.split(/\s+/);
        const updatedMoves = [...movesRef.current, ...nextMoves];

        cube.execute(normalized);
        redoStackRef.current = [];
        syncMoveState(updatedMoves);
    }, [cube, syncMoveState]);

    const scramble = useCallback(() => {
        const nextScramble = Scrambler.generate();

        setScramble(nextScramble);
        executeMove(nextScramble);
    }, [executeMove, setScramble]);

    const undo = useCallback(() => {
        if (movesRef.current.length === 0) {
            return;
        }

        const updatedMoves = movesRef.current.slice(0, -1);
        const removedMove = movesRef.current[movesRef.current.length - 1];

        redoStackRef.current.push(removedMove);
        replayMoves(updatedMoves);
        syncMoveState(updatedMoves);
    }, [replayMoves, syncMoveState]);

    const redo = useCallback(() => {
        if (redoStackRef.current.length === 0) {
            return;
        }

        const restoredMove = redoStackRef.current.pop();
        const updatedMoves = [...movesRef.current, restoredMove];

        replayMoves(updatedMoves);
        syncMoveState(updatedMoves);
    }, [replayMoves, syncMoveState]);

    const reset = useCallback(() => {
        redoStackRef.current = [];
        cube.reset();
        setScramble("");
        setTimer("00:00.00");
        syncMoveState([]);
    }, [cube, setScramble, setTimer, syncMoveState]);

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
            redo,
            reset,
            scramble,
            undo,
        });

        focusViewport();

        return () => {
            registerActions();
        };
    }, [executeMove, focusViewport, redo, registerActions, reset, scramble, undo]);

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
