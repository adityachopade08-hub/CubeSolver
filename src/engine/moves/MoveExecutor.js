import RotationEngine from "../math/RotationEngine";

class MoveExecutor {

    static execute(cube, moves) {

        moves.forEach((move) => {

            switch (move.face) {

                case "R":
                    RotationEngine.rotate(cube, "x", 1, move.clockwise, move.turns);
                    break;

                case "L":
                    RotationEngine.rotate(cube, "x", -1, !move.clockwise, move.turns);
                    break;

                case "U":
                    RotationEngine.rotate(cube, "y", 1, move.clockwise, move.turns);
                    break;

                case "D":
                    RotationEngine.rotate(cube, "y", -1, !move.clockwise, move.turns);
                    break;

                case "F":
                    RotationEngine.rotate(cube, "z", 1, move.clockwise, move.turns);
                    break;

                case "B":
                    RotationEngine.rotate(cube, "z", -1, !move.clockwise, move.turns);
                    break;

                default:
                    console.warn("Unknown move:", move.face);

            }

        });

    }

}

export default MoveExecutor;