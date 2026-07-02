import "./ControlBar.css";

import {

    useCubeActions

} from "../../context/CubeActions";

function ControlBar(){

    const{

        scramble,

        reset,

        undo,

        redo,

        solve

    } = useCubeActions();

    return(

        <div className="controls">

            <button onClick={scramble}>

                🎲 Scramble

            </button>

            <button onClick={undo}>

                ↩ Undo

            </button>

            <button onClick={redo}>

                ↪ Redo

            </button>

            <button onClick={reset}>

                🔄 Reset

            </button>

            <button onClick={solve}>

                🤖 Solve

            </button>

        </div>

    );

}

export default ControlBar;