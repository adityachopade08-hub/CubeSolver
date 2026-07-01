import Animation from "./Animation";

class AnimationQueue {

    constructor() {

        this.queue = [];

    }

    add(move) {

        this.queue.push(

            new Animation(move)

        );

    }

    current() {

        return this.queue[0];

    }

    update() {

        if (this.queue.length === 0)
            return;

        this.queue[0].update();

        if (this.queue[0].finished)

            this.queue.shift();

    }

    isRunning() {

        return this.queue.length > 0;

    }

}

export default AnimationQueue;