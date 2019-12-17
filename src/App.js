import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "react-three-fiber";
import * as THREE from 'three';
import data from './data.json';

function Planet(props) {
	const ref = useRef();
	const position = [0, 0, props.aphelion / 100];
	const size = [props.diameter / 150000, 32, 32];
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${props.image}`]);
	console.log(size);
	
	useFrame(() => {
		ref.current.rotation.y += 0.01;
	});

	return (
		<mesh
			ref={ref}
			position={position}
			castShadow>
			<sphereBufferGeometry attach="geometry" args={size} />
			<meshStandardMaterial attach="material" map={texture} roughness={1} />
		</mesh>
	);
}

function Sun() {
	const [texture] = useLoader(THREE.TextureLoader, [`planets/sun.jpg`]);
	const size = [1392530 / 150000, 32, 32];

	return (
		<mesh position={[0, 0, 0]}>
			<sphereBufferGeometry attach="geometry" args={size} />
			<meshBasicMaterial attach="material" map={texture} fog={false} />
			<pointLight distance={6100} color="white" />
		</mesh>
	);
}

function Camera({ selected }) {
	const { camera } = useThree();

	useEffect(() => {
		camera.fov = 40;
		camera.position.set(data.planets[selected].diameter / 36000, 0, data.planets[selected].aphelion / 100);
		camera.lookAt(0, 0, data.planets[selected].aphelion / 100);
		camera.updateProjectionMatrix();
	}, [camera, selected]);

	return (
		<mesh position={[2, 2, 2]}>
			<camera />
		</mesh>
	);
}

export function App() {
	const [selected, setSelected] = useState(2);

	return (
		<>
			{!(selected === (data.planets.length - 1)) && <div style={{
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				zIndex: 10
			}}>
				<h4 style={{ color: "#fff", margin: "1em" }} onClick={() => setSelected(selected + 1)}>{data.planets[selected + 1].name}</h4>
			</div>}
			{!(selected === 0) && <div style={{
				position: "absolute",
				top: "50%",
				right: 0,
				transform: "translateY(-50%)",
				visibility: selected === 0 ? "hidden" : "visible",
				zIndex: 10
			}}>
				<h4 style={{ color: "#fff", margin: "1em" }} onClick={() => setSelected(selected - 1)}>{data.planets[selected - 1].name}</h4>
			</div>}
			<Canvas shadowMap>
				<ambientLight intensity={0.5} />
				<Camera selected={selected} />
				<Suspense fallback={null}>
					<Sun />
					{data.planets.map((planet, index) => <Planet {...planet} index={index} key={planet.name} />)}
				</Suspense>
			</Canvas>
		</>
	);
}