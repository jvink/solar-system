import React, { useRef } from 'react';
import { useLoader, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { getPosition } from '../helpers';

export default function Planet(props) {
	const group = useRef();
	const mesh = useRef();

	const size = props.realisticScale ? [props.diameter * props.SIZE_SCALE, 32, 32] : [1, 32, 32];
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${props.image}`]);

	const position = getPosition(props.realisticScale ? props.aphelion : (props.index * 100), props.realisticScale ? props.RANDOM_ANGLE : 0, props.DISTANCE_SCALE, props.DISTANCE_OFFSET);

	useFrame(() => {
		if (props.realisticScale) {
			group.current.rotation.y += 1 / props.orbitalPeriod;
			mesh.current.rotation.y += 1 / props.rotationPeriod;
		}
	});

	return (
		<group ref={group} rotation={new THREE.Euler(props.orbitalInclination, 0, 0)}>
			<mesh
				ref={mesh}
				position={position}
				rotation={new THREE.Euler(props.axialTilt, 0, 0)}
				castShadow={props.realisticScale}
				receiveShadow={props.realisticScale}>
				<sphereBufferGeometry attach='geometry' args={size} />
				<meshStandardMaterial attach='material' map={texture} />
			</mesh>
			{props.rings && props.rings.map((ring, index) => {
				const NINETY_DEGREES_IN_EULER = 1.5707963;

				return (
					<mesh
						key={index}
						rotation={new THREE.Euler(props.axialTilt + NINETY_DEGREES_IN_EULER, 0, 0)}
						position={position}
						receiveShadow>
						<ringBufferGeometry attach='geometry' args={[ring.max * props.SIZE_SCALE, ring.min * props.SIZE_SCALE, 32]} />
						<meshPhysicalMaterial attach='material' side={THREE.DoubleSide} color={props.color} />
					</mesh>
				)
			})}
		</group>
	);
}