class RotationEngine {

    static rotate(cube, axis, layer, clockwise = true, turns = 1) {

        for (let t = 0; t < turns; t++) {

            cube.cubelets.forEach((cubelet) => {

                const p = cubelet.position;

                let belongs = false;

                switch (axis) {

                    case "x":
                        belongs = p.x === layer;
                        break;

                    case "y":
                        belongs = p.y === layer;
                        break;

                    case "z":
                        belongs = p.z === layer;
                        break;

                }

                if (!belongs)
                    return;

                RotationEngine.rotatePosition(
                    cubelet,
                    axis,
                    clockwise
                );

                RotationEngine.rotateStickers(
                    cubelet,
                    axis,
                    clockwise
                );

            });

        }

    }

    static rotatePosition(cubelet, axis, clockwise) {

        let { x, y, z } = cubelet.position;

        switch (axis) {

            case "x":

                if (clockwise)
                    cubelet.position = { x, y: -z, z: y };
                else
                    cubelet.position = { x, y: z, z: -y };

                break;

            case "y":

                if (clockwise)
                    cubelet.position = { x: z, y, z: -x };
                else
                    cubelet.position = { x: -z, y, z: x };

                break;

            case "z":

                if (clockwise)
                    cubelet.position = { x: -y, y: x, z };
                else
                    cubelet.position = { x: y, y: -x, z };

                break;

        }

    }

    static rotateStickers(cubelet, axis, clockwise) {

        cubelet.rotate(axis, clockwise);

    }

}

export default RotationEngine;