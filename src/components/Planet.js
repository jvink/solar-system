import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import * as THREE from 'three';

export default function Planet(props) {
	const group = useRef();
	const mesh = useRef();

	const size = [props.diameter / 150000, 32, 32];
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${props.image}`]);

	function getPosition(aphelion) {
		const randomAngle = Math.random() * Math.PI * 2;
		const x = Math.cos(randomAngle) * aphelion;
		const z = Math.sin(randomAngle) * aphelion;
		return [x / 50, 0, z / 50];
	}

	const position = getPosition(props.aphelion);

	useFrame(() => {
		group.current.rotation.y += 1 / props.orbitalPeriod;
		mesh.current.rotation.y += 1 / props.rotationPeriod;
	});

	return (
		<group ref={group} rotation={new THREE.Euler(props.orbitalInclination, 0, 0)}>
			<mesh
				ref={mesh}
				position={position}
				rotation={new THREE.Euler(props.axialTilt, 0, 0)}
				castShadow>
				<sphereBufferGeometry attach="geometry" args={size} />
				<meshStandardMaterial attach="material" map={texture} roughness={1} />
			</mesh>
			{props.name === "Saturn" && <>
				<mesh
					rotation={new THREE.Euler(props.axialTilt + 1.5707963, 0, 0)}
					castShadow
					position={position}>
					<ringBufferGeometry attach="geometry" args={[2, 1.7, 32]} />
					<meshStandardMaterial attach="material" side={THREE.DoubleSide} color={props.color} />
				</mesh>
				<mesh
					rotation={new THREE.Euler(props.axialTilt + 1.5707963, 0, 0)}
					castShadow
					position={position}>
					<ringBufferGeometry attach="geometry" args={[1.66, 1.3, 32]} />
					<meshStandardMaterial attach="material" side={THREE.DoubleSide} color={props.color} />
				</mesh>
			</>}
		</group>
	);
}