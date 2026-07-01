const MOVES = [

    "R","L","U","D","F","B",

    "R'","L'","U'","D'","F'","B'"

];

class Scrambler {

    static generate(length = 20) {

        const scramble = [];

        let previous = "";

        while (scramble.length < length) {

            const move = MOVES[
                Math.floor(Math.random() * MOVES.length)
            ];

            if (move[0] === previous)
                continue;

            scramble.push(move);

            previous = move[0];

        }

        return scramble.join(" ");

    }

}

export default Scrambler;