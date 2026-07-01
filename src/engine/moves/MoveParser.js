import Move from "./Move";

class MoveParser {

    static parse(algorithm) {

        if (!algorithm.trim())
            return [];

        return algorithm

            .trim()

            .split(/\s+/)

            .map(token => {

                const face = token[0];

                const clockwise = !token.includes("'");

                const turns = token.includes("2") ? 2 : 1;

                return new Move(

                    face,

                    clockwise,

                    turns

                );

            });

    }

}

export default MoveParser;