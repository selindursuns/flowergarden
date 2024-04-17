import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { DirectionalLightHelper } from 'three';
import Stipe from './components/Stipe.jsx'; 
import './App.css'; 
import FlowerLeaves from './components/FlowerLeaves.jsx';
import FlowerCap from './components/FlowerCap.jsx';
import Blob from './components/Blob.jsx';
import { ElevationProvider } from './components/ElevationContext.jsx';



const Scene = () => {

  const directionalLightRef = useRef(null);
  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
    value: 0.5,
    min: 0,
    max: 70,
    step: 0.4,
    }
  });

 
  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new DirectionalLightHelper(directionalLightRef.current, 0.5, lightColor);
      directionalLightRef.current.parent.add(helper);
      return () => directionalLightRef.current.parent.remove(helper);
    }
  }, [lightColor]); 
  return (
    <>
      <directionalLight position={[6, 18, 2]} intensity={lightIntensity} ref={directionalLightRef} color={lightColor}/>
      <ambientLight intensity={0.5}/>
    </>
  );
};

const RotatingGroup = () => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      // groupRef.current.rotation.y += 0.001; 
      // groupRef.current.rotation.x += 0.001; 
    }
  });

  return (
    <group ref={groupRef}>
      <Scene />
      <Stipe />
      <FlowerLeaves />
      <FlowerCap />
      <Blob />
    </group>
  );
};

const App = () => {
  const {color,intensity,x,y,z} = useControls({
    color: '#ffffff',
    intensity: 20,
    x: 9,
    y: 0,
    z: 0,
  });

  return (
    <ElevationProvider>
    <div className="App" >
      <div className = "CanvasContainer">
      <Canvas>
        <ambientLight intensity={0.3}/>
        <directionalLight position={[x, y, z]} intensity={intensity} color={color}/>
        <RotatingGroup/>
        <OrbitControls/>
      </Canvas>
      </div>
    </div>
    </ElevationProvider>
  );
}

export default App;