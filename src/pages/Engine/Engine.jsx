import Cube from "../../engine/core/Cube";

function Engine() {

    const cube = new Cube();

    cube.execute("R U R' U' L D F B R2 U2 F2");

    console.table(cube.getCubelets());

    return (

        <div
            style={{
                background: "#111827",
                color: "white",
                minHeight: "100vh",
                padding: "30px",
                fontFamily: "monospace"
            }}
        >

            <h1>Engine Running ✅</h1>

            <p>Console contains updated cube state.</p>

        </div>

    );

}

export default Engine;