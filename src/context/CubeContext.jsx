import { createContext, useContext, useMemo, useState } from "react";

const CubeContext = createContext(null);

export function CubeProvider({ children }) {
    const [moves, setMoves] = useState([]);
    const [scramble, setScramble] = useState("");
    const [moveCount, setMoveCount] = useState(0);
    const [timer, setTimer] = useState("00:00.00");

    const value = useMemo(
        () => ({
            moves,
            setMoves,
            scramble,
            setScramble,
            moveCount,
            setMoveCount,
            timer,
            setTimer,
        }),
        [moveCount, moves, scramble, timer]
    );

    return (
        <CubeContext.Provider value={value}>
            {children}
        </CubeContext.Provider>
    );
}

export function useCube() {
    return useContext(CubeContext);
}
