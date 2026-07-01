import { createContext, useContext, useState } from "react";

const CubeContext = createContext();

export function CubeProvider({ children }) {

    const [moves, setMoves] = useState([]);

    const [scramble, setScramble] = useState("");

    const [moveCount, setMoveCount] = useState(0);

    const [timer, setTimer] = useState("00:00.00");

    return (

        <CubeContext.Provider

            value={{

                moves,

                setMoves,

                scramble,

                setScramble,

                moveCount,

                setMoveCount,

                timer,

                setTimer

            }}

        >

            {children}

        </CubeContext.Provider>

    );

}

export function useCube() {

    return useContext(CubeContext);

}