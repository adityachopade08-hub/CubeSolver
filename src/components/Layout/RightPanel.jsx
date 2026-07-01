import "./RightPanel.css";

import { useCube } from "../../context/CubeContext";

function RightPanel() {

    const {

        moves,

        scramble

    } = useCube();

    return (

        <aside className="rightPanel">

            <h2>History</h2>

            <div className="historyCard">

                {

                    moves.length === 0 ?

                        "No Moves"

                        :

                        moves.join(" ")

                }

            </div>

            <div className="historyCard">

                <h3>Scramble</h3>

                <p>

                    {

                        scramble || "-"

                    }

                </p>

            </div>

        </aside>

    );

}

export default RightPanel;