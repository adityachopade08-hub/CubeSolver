import Sticker from "./Sticker";
import { COLORS } from "../../constants/colors";

class Cubelet {

    constructor(id, x, y, z) {

        this.id = id;

        this.position = { x, y, z };

        this.rotation = {
            x: 0,
            y: 0,
            z: 0,
        };

        this.stickers = [];

        if (y === 1) this.stickers.push(new Sticker("UP", COLORS.UP));
        if (y === -1) this.stickers.push(new Sticker("DOWN", COLORS.DOWN));
        if (x === -1) this.stickers.push(new Sticker("LEFT", COLORS.LEFT));
        if (x === 1) this.stickers.push(new Sticker("RIGHT", COLORS.RIGHT));
        if (z === 1) this.stickers.push(new Sticker("FRONT", COLORS.FRONT));
        if (z === -1) this.stickers.push(new Sticker("BACK", COLORS.BACK));

    }

    rotate(axis, clockwise) {

        this.stickers.forEach((sticker) => {

            const f = sticker.face;

            switch (axis) {

                case "x":

                    if (clockwise) {

                        if (f === "UP") sticker.face = "BACK";
                        else if (f === "BACK") sticker.face = "DOWN";
                        else if (f === "DOWN") sticker.face = "FRONT";
                        else if (f === "FRONT") sticker.face = "UP";

                    } else {

                        if (f === "UP") sticker.face = "FRONT";
                        else if (f === "FRONT") sticker.face = "DOWN";
                        else if (f === "DOWN") sticker.face = "BACK";
                        else if (f === "BACK") sticker.face = "UP";

                    }

                    break;

                case "y":

                    if (clockwise) {

                        if (f === "FRONT") sticker.face = "RIGHT";
                        else if (f === "RIGHT") sticker.face = "BACK";
                        else if (f === "BACK") sticker.face = "LEFT";
                        else if (f === "LEFT") sticker.face = "FRONT";

                    } else {

                        if (f === "FRONT") sticker.face = "LEFT";
                        else if (f === "LEFT") sticker.face = "BACK";
                        else if (f === "BACK") sticker.face = "RIGHT";
                        else if (f === "RIGHT") sticker.face = "FRONT";

                    }

                    break;

                case "z":

                    if (clockwise) {

                        if (f === "UP") sticker.face = "LEFT";
                        else if (f === "LEFT") sticker.face = "DOWN";
                        else if (f === "DOWN") sticker.face = "RIGHT";
                        else if (f === "RIGHT") sticker.face = "UP";

                    } else {

                        if (f === "UP") sticker.face = "RIGHT";
                        else if (f === "RIGHT") sticker.face = "DOWN";
                        else if (f === "DOWN") sticker.face = "LEFT";
                        else if (f === "LEFT") sticker.face = "UP";

                    }

                    break;

            }

        });

    }

}

export default Cubelet;