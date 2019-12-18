import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useLoader, useFrame, extend, useThree, useRender } from "react-three-fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three';
import data from './data.json';

extend({ OrbitControls })
const Controls = props => {
	const { gl, camera } = useThree();
	const ref = useRef();
	useRender(() => ref.current.update());
	return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

function Planet(props) {
	const group = useRef();
	const mesh = useRef();

	const size = [props.diameter / 150000, 32, 32];
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${props.image}`]);

	const randomAngle = Math.random() * Math.PI * 2;
	const x = Math.cos(randomAngle) * props.aphelion;
	const z = Math.sin(randomAngle) * props.aphelion;

	const position = useMemo(() => [x / 50, 0, z / 50], [x, z]);

	useFrame(() => {
		group.current.rotation.y += 1 / props.orbitalPeriod;
		mesh.current.rotation.y += 1 / props.rotationPeriod;
	});
	
	return (
		<group ref={group}>
			<mesh
				ref={mesh}
				position={position}
				rotation={new THREE.Euler(props.axialTilt, 0, 0)}
				castShadow>
				<sphereBufferGeometry attach="geometry" args={size} />
				<meshStandardMaterial attach="material" map={texture} roughness={1} />
			</mesh>
			{props.name === "Saturn" && <mesh
				rotation={new THREE.Euler(props.axialTilt + 1.5707963, 0, 0)}
				castShadow
				position={position}>
				<ringBufferGeometry attach="geometry" args={[1.4, 1, 32]} />
				<meshStandardMaterial attach="material" side={THREE.DoubleSide} color={props.color} />
			</mesh>}
		</group>
	);
}

function Sun() {
	const [texture] = useLoader(THREE.TextureLoader, [`planets/sun.jpg`]);
	const size = [1392530 / 2500000, 32, 32];

	return (
		<mesh position={[0, 0, 0]}>
			<sphereBufferGeometry attach="geometry" args={size} />
			<meshBasicMaterial attach="material" map={texture} fog={false} />
			<pointLight distance={6100} color="white" />
		</mesh>
	);
}

export function App() {
	return (
		<Canvas shadowMap>
			<ambientLight intensity={0.2} />
			<Controls
				enableZoom={true}
				enableDamping
				dampingFactor={0.2}
				rotateSpeed={0.2}
			/>
			<Suspense fallback={null}>
				<Sun />
				{data.planets.map((planet, index) => <Planet {...planet} index={index} key={planet.name} />)}
			</Suspense>
		</Canvas>
	);
}