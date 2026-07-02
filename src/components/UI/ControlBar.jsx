import "./ControlBar.css";

import { useCubeActions } from "../../context/CubeActions";

function ControlBar() {
    const {
        scramble,
        reset,
        undo,
        redo,
        solve,
    } = useCubeActions();

    return (
        <div className="controls">
            <button type="button" onClick={scramble}>
                Scramble
            </button>

            <button type="button" onClick={undo}>
                Undo
            </button>

            <button type="button" onClick={redo}>
                Redo
            </button>

            <button type="button" onClick={reset}>
                Reset
            </button>

            <button type="button" onClick={solve}>
                Solve
            </button>
        </div>
    );
}

export default ControlBar;
