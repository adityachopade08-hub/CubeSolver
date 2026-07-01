import "./CenterPanel.css";
import CubeScene from "../Cube/CubeScene";
import ControlBar from "../UI/ControlBar";

function CenterPanel() {

    return (

        <div className="centerPanel">

            <div className="cubeViewport">

                <CubeScene />

            </div>

            <ControlBar />

        </div>

    );

}

export default CenterPanel;