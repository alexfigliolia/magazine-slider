"use client";
import { Suspense } from "react";
import {
  Environment,
  Float,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  MagazineContextProvider,
  MagazineSlider,
} from "Components/MagazineSlider";
import { Photos } from "Tools/Photos";
import { Propless } from "Types/React";
import { Controls } from "./Controls";
import "./styles.scss";

export const Scene = (_: Propless) => {
  return (
    <MagazineContextProvider>
      <div className="scene">
        <Canvas shadows camera={{ position: [-0.5, 1, 3], fov: 45 }}>
          <group position-y={0}>
            <Suspense fallback={null}>
              <Float
                rotation-x={-Math.PI / 4}
                floatIntensity={1}
                speed={2}
                rotationIntensity={2}>
                <MagazineSlider sound images={Photos} />
              </Float>
              <OrbitControls />
              <Environment preset="studio" />
              <directionalLight
                position={[2, 5, 2]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
              />
              <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.2} />
              </mesh>
            </Suspense>
          </group>
        </Canvas>
      </div>
      <Controls />
    </MagazineContextProvider>
  );
};

useTexture.preload("/book-cover-roughness.jpg");
Photos.forEach(({ front, back }) => {
  useTexture.preload(front);
  useTexture.preload(back);
});
