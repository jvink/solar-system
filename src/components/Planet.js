import React, { useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { getPosition } from '../helpers';

export default function Planet(props) {
	const group = useRef();
	const mesh = useRef();

	const size = [props.diameter * props.SIZE_SCALE, 32, 32];
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${props.image}`]);

	const position = getPosition(props.aphelion, props.RANDOM_ANGLE, props.DISTANCE_SCALE);

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
				<sphereBufferGeometry attach='geometry' args={size} />
				<meshStandardMaterial attach='material' map={texture} roughness={1} />
			</mesh>
			{props.name === 'Saturn' && <>
				<mesh
					rotation={new THREE.Euler(props.axialTilt + 1.5707963, 0, 0)}
					position={position}
					receiveShadow>
					<ringBufferGeometry attach='geometry' args={[2, 1.7, 32]} />
					<meshStandardMaterial attach='material' side={THREE.DoubleSide} color={props.color} />
				</mesh>
				<mesh
					rotation={new THREE.Euler(props.axialTilt + 1.5707963, 0, 0)}
					position={position}>
					<ringBufferGeometry attach='geometry' args={[1.66, 1.3, 32]} />
					<meshStandardMaterial attach='material' side={THREE.DoubleSide} color={props.color} />
				</mesh>
			</>}
		</group>
	);
}