class Vector3 {

    constructor(x = 0, y = 0, z = 0) {

        this.x = x;
        this.y = y;
        this.z = z;

    }

    clone() {

        return new Vector3(
            this.x,
            this.y,
            this.z
        );

    }

    equals(v) {

        return (

            this.x === v.x &&
            this.y === v.y &&
            this.z === v.z

        );

    }

}

export default Vector3;