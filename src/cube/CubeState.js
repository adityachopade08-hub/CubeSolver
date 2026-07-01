import { COLORS } from "../constants/colors";

class CubeState {
    constructor() {
        this.cubelets = [];
        let id = 0;

        for (let z = -1; z <= 1; z++) {
            for (let y = 1; y >= -1; y--) {
                for (let x = -1; x <= 1; x++) {

                    if (x === 0 && y === 0 && z === 0)
                        continue;

                    this.cubelets.push({
                        id: id++,

                        position: [x, y, z],

                        stickers: {
                            up: y === 1 ? COLORS.UP : null,
                            down: y === -1 ? COLORS.DOWN : null,
                            left: x === -1 ? COLORS.LEFT : null,
                            right: x === 1 ? COLORS.RIGHT : null,
                            front: z === 1 ? COLORS.FRONT : null,
                            back: z === -1 ? COLORS.BACK : null,
                        },
                    });

                }
            }
        }
    }
}

export default CubeState;