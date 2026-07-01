class Rotations {

    static rotateR(cubelets){

        cubelets.forEach(cube=>{

            if(cube.position[0]!==1)
                return;

            const [x,y,z]=cube.position;

            cube.position=[x,-z,y];

        });

    }

}

export default Rotations;