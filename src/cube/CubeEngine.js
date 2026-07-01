import CubeState from "./CubeState";

class CubeEngine {

    constructor() {

        this.state = new CubeState();

    }

    getCubelets() {

        return this.state.cubelets;

    }

}

export default CubeEngine;