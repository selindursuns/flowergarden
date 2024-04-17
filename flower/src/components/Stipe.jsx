import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useElevation } from './ElevationContext';

  
// const Petal = ({ position, rotation }) => {
//     const petalGeometry = useMemo(() => new THREE.SphereGeometry(1.2, 100, 10, 40), []);
//     const petalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
//         color: 'purple',
//         side: THREE.DoubleSide,
//     }), []);

//     return (
//         <mesh position={position} rotation={rotation} geometry={petalGeometry} material={petalMaterial} />
//     );
// };

const Stipe = () => {

    const { elevation } = useElevation();

    const vSegments = 20;  // vertical resolution
    const rSegments = 20;  // angular resolution
    // const height = 5;
    const baseRadius = 0.4;
    const noise_c = 0.5;
    const meshRef = useRef();

    const colors = ['purple', 'red', 'blue', 'green', 'yellow', 'orange'];


    const stipe_radius = (angle, t) => {
        const heightFactor = Math.cos(t * Math.PI * 3); // Simple wave along the height
        const angleFactor = Math.sin(angle * 1);       // Wavy pattern around the circumference
        const noise = (1 - t) * (1 + Math.random()) * noise_c;
        return baseRadius + (0.1 * angleFactor * heightFactor) + noise;
    };

    const { stipe_points, stipe_indices } = useMemo(() => {
        const points = [];
        const indices = [];

        for (let v = 0; v <= vSegments; v++) {
            const t = v / vSegments;
            for (let r = 0; r < rSegments; r++) {
                const angle = (r / rSegments) * Math.PI * 2;
                const radius = stipe_radius(angle, t);
                const x = radius * Math.cos(angle);
                const y = t * elevation;
                const z = radius * Math.sin(angle);
                points.push(x, y, z);
            }
        }

        for (let v = 0; v < vSegments; v++) {
            for (let r = 0; r < rSegments; r++) {
                let topLeft = v * rSegments + r;
                let topRight = topLeft + 1;
                let bottomLeft = (v + 1) * rSegments + r;
                let bottomRight = bottomLeft + 1;

                if (r === rSegments - 1) {
                    topRight -= rSegments;
                    bottomRight -= rSegments;
                }

                indices.push(topLeft, bottomLeft, topRight);
                indices.push(topRight, bottomLeft, bottomRight);
            }
        }

        return { stipe_points: points, stipe_indices: indices };
    }, [vSegments, rSegments, elevation, baseRadius, noise_c, stipe_radius]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(stipe_points), 3));
        geo.setIndex(stipe_indices);
        geo.computeVertexNormals();
        return geo;
    }, [stipe_points, stipe_indices]);

    // const petals = useMemo(() => {
    //     const petalsArray = [];
    //     for (let i = 0; i < 6; i++) {
    //         const angle = (i / 6) * Math.PI * 2;
    //         const x = Math.cos(angle) * 2;
    //         const z = Math.sin(angle) * 2;
    //         const rotation = [-Math.PI / 2, 0, angle];
    //         petalsArray.push(<Petal key={i} position={[x, 5, z]} rotation={rotation} colors={colors}/>);
    //     }
    //     return petalsArray;
    // }, [colors]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.8;
        }
    });

    return (
        <mesh ref={meshRef}>
            <bufferGeometry attach="geometry" {...geometry} />
            <meshStandardMaterial attach="material" color={"#FFF017"} metalness={0.89} roughness={0.2} />
            {/* {petals} */}
            {colors}
        </mesh>
    );
};

export default Stipe;
