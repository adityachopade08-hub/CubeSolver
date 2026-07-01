import "./LeftPanel.css";
import TimerCard from "./TimerCard";
import { useCube } from "../../context/CubeContext";

function LeftPanel() {

    const {

        moveCount,

        timer

    } = useCube();

    return (

        <aside className="leftPanel">

            <h2>Statistics</h2>

            <TimerCard time={timer} />

            <div className="panelCard">

                <span>Moves</span>

                <h1>{moveCount}</h1>

            </div>

            <div className="panelCard">

                <span>TPS</span>

                <h1>

                    {moveCount === 0 ? "0.00" : "--"}

                </h1>

            </div>

        </aside>

    );

}

export default LeftPanel;