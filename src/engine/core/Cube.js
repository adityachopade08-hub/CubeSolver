import Cubelet from "./Cubelet";
import MoveParser from "../moves/MoveParser";
import MoveExecutor from "../moves/MoveExecutor";
import AnimationQueue from "../animation/AnimationQueue";

class Cube {

    constructor() {

        this.cubelets = [];
        this.history = [];
        this.listeners = [];

        this.animation = new AnimationQueue();

        this.createCube();

    }

    createCube() {

        let id = 0;

        for (let z = -1; z <= 1; z++) {

            for (let y = 1; y >= -1; y--) {

                for (let x = -1; x <= 1; x++) {

                    if (x === 0 && y === 0 && z === 0)
                        continue;

                    this.cubelets.push(

                        new Cubelet(id++, x, y, z)

                    );

                }

            }

        }

    }

    getCubelets() {

        return this.cubelets;

    }

    execute(algorithm) {

        const moves = MoveParser.parse(algorithm);

        moves.forEach(move => {

            this.animation.add(move);

        });

        this.history.push(algorithm);

    }

    update() {

        if (!this.animation.isRunning())
            return;

        const animation = this.animation.current();

        animation.update();

        if (animation.finished) {

            MoveExecutor.execute(this, [animation.move]);

            this.animation.update();

        }

        this.notify();

    }

    subscribe(listener) {

        this.listeners.push(listener);

    }

    notify() {

        this.listeners.forEach(

            listener => listener()

        );

    }

}

export default Cube;