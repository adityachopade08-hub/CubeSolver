import "./ControlBar.css";

function ControlBar() {

    return (

        <div className="controls">

            <button id="scrambleBtn">🎲 Scramble</button>

            <button id="undoBtn">↩ Undo</button>

            <button id="redoBtn">↪ Redo</button>

            <button id="resetBtn">🔄 Reset</button>

            <button id="solveBtn">🤖 Solve</button>

        </div>

    );

}

export default ControlBar;