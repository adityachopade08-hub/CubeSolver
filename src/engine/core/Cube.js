import Cubelet from "./Cubelet";
import MoveParser from "../moves/MoveParser";
import MoveExecutor from "../moves/MoveExecutor";

class Cube {

    constructor() {
        this.cubelets = [];
        this.history = [];
        this.createCube();
    }

    createCube() {

        let id = 0;

        for (let z = -1; z <= 1; z++) {
            for (let y = 1; y >= -1; y--) {
                for (let x = -1; x <= 1; x++) {

                    if (x === 0 && y === 0 && z === 0) continue;

                    this.cubelets.push(
                        new Cubelet(id++, x, y, z)
                    );

                }
            }
        }

    }

    execute(algorithm) {

        const moves = MoveParser.parse(algorithm);

        this.history.push(algorithm);

        MoveExecutor.execute(this, moves);

    }

    getCubelets() {

        return this.cubelets;

    }

    reset() {

        this.cubelets = [];
        this.history = [];
        this.createCube();

    }

}

export default Cube;