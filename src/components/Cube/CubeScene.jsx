import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";

import Cube from "../../engine/core/Cube";
import Scrambler from "../../engine/scramble/Scrambler";
import { useCube } from "../../context/CubeContext";
import { useCubeActions } from "../../context/CubeActions";
import CubeletMesh from "./CubeletMesh";

function formatElapsedTime(elapsedMs) {
    const totalCentiseconds = Math.floor(elapsedMs / 10);
    const centiseconds = totalCentiseconds % 100;
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return [
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
    ].join(":") + `.${String(centiseconds).padStart(2, "0")}`;
}

function Scene({ cube, onFrame }) {
    const [, refresh] = useState(0);

    useFrame(() => {
        cube.update();
        onFrame();
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
    const timerStartRef = useRef(null);
    const timerRunningRef = useRef(false);
    const viewportRef = useRef(null);
    const cube = cubeRef.current;

    const {
        moves,
        setMoveCount,
        setMoves,
        setScramble,
        setTimer,
        setTps,
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

    const startTimer = useCallback(() => {
        if (timerRunningRef.current) {
            return;
        }

        timerStartRef.current = performance.now();
        timerRunningRef.current = true;
    }, []);

    const handleFrame = useCallback(() => {
        if (!timerRunningRef.current || timerStartRef.current === null) {
            return;
        }

        const elapsedMs = performance.now() - timerStartRef.current;
        const elapsedSeconds = elapsedMs / 1000;
        const currentMoveCount = movesRef.current.length;

        setTimer(formatElapsedTime(elapsedMs));
        setTps(
            elapsedSeconds > 0
                ? (currentMoveCount / elapsedSeconds).toFixed(2)
                : "0.00"
        );
    }, [setTimer, setTps]);

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

        startTimer();
        cube.execute(normalized);
        redoStackRef.current = [];
        syncMoveState(updatedMoves);
    }, [cube, startTimer, syncMoveState]);

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
        timerStartRef.current = null;
        timerRunningRef.current = false;
        cube.reset();
        setScramble("");
        setTimer("00:00.00");
        setTps("0.00");
        syncMoveState([]);
    }, [cube, setScramble, setTimer, setTps, syncMoveState]);

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
                <Scene cube={cube} onFrame={handleFrame} />
            </Canvas>
        </div>
    );
}

export default CubeScene;
