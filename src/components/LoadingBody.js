import React, { useRef } from 'react';
import * as THREE from 'three';
import { getPosition } from '../helpers';

export default function LoadingBody(props) {
	const group = useRef();
	const mesh = useRef();

	const size = [props.diameter / props.SIZE_SCALE, 32, 32];

	const position = getPosition(props.aphelion, props.RANDOM_ANGLE, props.DISTANCE_SCALE, props.DISTANCE_OFFSET);

	return (
		<group ref={group} rotation={new THREE.Euler(props.orbitalInclination, 0, 0)}>
			<mesh
				ref={mesh}
				position={position}
				rotation={new THREE.Euler(props.axialTilt, 0, 0)}
				castShadow>
				<sphereBufferGeometry attach='geometry' args={size} />
				<meshStandardMaterial attach='material' color={props.color} />
			</mesh>
		</group>
	);
}