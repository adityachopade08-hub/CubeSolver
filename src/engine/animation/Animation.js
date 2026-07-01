class Animation {

    constructor(move) {

        this.move = move;

        this.angle = 0;

        this.finished = false;

    }

    update(speed = 6) {

        this.angle += speed;

        if (this.angle >= 90) {

            this.angle = 90;

            this.finished = true;

        }

    }

}

export default Animation;