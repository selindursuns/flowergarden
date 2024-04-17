import React, { useMemo } from 'react';
import * as THREE from 'three';
// import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva'; 
// import vertexPetal from '../shaders/vertexPetal.glsl';
// import fragmentPetal from '../shaders/fragmentPetal.glsl';
import { useElevation } from './ElevationContext'; 

const CapPetal = ({ position, rotation, bevelThickness }) => {
    const petalShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.1, 0.1, 0.4, 0.5, 0, 1);
        shape.bezierCurveTo(-0.4, 0.5, -0.1, 0.1, 0, 0);
        return shape;
    }, []);

    const extrudeSettings = {
        steps: 2,
        depth: 0.02,
        bevelEnabled: true,
        bevelThickness: 0.4,
        bevelSize: 0.9,
        bevelOffset: 0,
        bevelSegments: 100
    };

    // return (
    //     <mesh position={position} rotation={rotation}>
    //         <extrudeGeometry args={[petalShape, extrudeSettings]} />
    //         <shaderMaterial
    //             fragmentShader={fragmentPetal}
    //             vertexShader={vertexPetal}
    //             wireframe={false}
    //         />
    //     </mesh>
    // );


    const petalGeometry = useMemo(() => new THREE.ExtrudeGeometry(petalShape, extrudeSettings), [petalShape, extrudeSettings]);
    const petalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#FC0FC0',
        metalness: '1',
        roughness: '0.9',
        side: THREE.DoubleSide,
    }), []);

    return (
        <mesh position={position} rotation={rotation} geometry={petalGeometry} material={petalMaterial} />
    );

    

};

const FlowerCap = ({ numPetals = 8}) => {

    const { elevation } = useElevation();

    const { bevelThickness } = useControls({
        bevelThickness: { value: 0.7, min: 0.1, max: 20 }, 
    });

    const petals = useMemo(() => {
        return Array.from({ length: numPetals }, (_, i) => {
            const angle = (i / numPetals) * Math.PI * 2;
            const x = Math.cos(angle) * 1; 
            const z = Math.sin(angle) * 1;
            const rotation = [Math.PI / 1, angle, 4]; 
            return <CapPetal key={i} position={[x, elevation, z]} rotation={rotation} />;
        });
    }, [numPetals, elevation, bevelThickness]);


    return <>{petals}</>;
};

export default FlowerCap;

// selin's notes: things that can change are 
// 1. bevelThickness -> from 0.3-4. 
// 2. bevelSize -> 0.4 to 1. 
// 3. in const petal function, const rotation = [Math.PI / 1, angle, 4]; the number 4 can be 3-4-5. these three numbers alter the shape really well! 
// 4. also numpetals can change from 3-4 to 20! 
// 5. aaand color if we want. color can be between neon yellow-neon pink-neon purple-neon green gradient only. and this can be the only color that changes. not necessary but keeping it here as an option. :) 