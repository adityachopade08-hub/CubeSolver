import { Edges } from "@react-three/drei";
import { COLORS } from "../../constants/colors";

function CubeletMesh({ cubelet }) {

    const { x, y, z } = cubelet.position;

    const getColor = (face) => {

        const sticker = cubelet.stickers.find(
            (sticker) => sticker.face === face
        );

        return sticker ? sticker.color : COLORS.INNER;
    };

    return (

        <mesh position={[x, y, z]}>

            <boxGeometry args={[0.95, 0.95, 0.95]} />

            <meshStandardMaterial attach="material-0" color={getColor("RIGHT")} />
            <meshStandardMaterial attach="material-1" color={getColor("LEFT")} />
            <meshStandardMaterial attach="material-2" color={getColor("UP")} />
            <meshStandardMaterial attach="material-3" color={getColor("DOWN")} />
            <meshStandardMaterial attach="material-4" color={getColor("FRONT")} />
            <meshStandardMaterial attach="material-5" color={getColor("BACK")} />

            <Edges color="black" />

        </mesh>

    );

}

export default CubeletMesh;