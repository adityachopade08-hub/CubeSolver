import "./Play.css";

import TopBar from "../../components/UI/TopBar";

import LeftPanel from "../../components/Layout/LeftPanel";

import CenterPanel from "../../components/Layout/CenterPanel";

import RightPanel from "../../components/Layout/RightPanel";

function Play() {

    return (

        <div className="play">

            <TopBar />

            <div className="mainLayout">

                <LeftPanel />

                <CenterPanel />

                <RightPanel />

            </div>

        </div>

    );

}

export default Play;