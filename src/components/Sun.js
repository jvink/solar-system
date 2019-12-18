import React from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

export default function Sun({ realisticScale, SIZE_SCALE, SUN_DIAMETER }) {
	const [texture] = useLoader(THREE.TextureLoader, [`planets/sun.jpg`]);
	const size = realisticScale ? [SUN_DIAMETER * SIZE_SCALE, 32, 32] : [1, 32, 32];

	return (
		<mesh position={[0, 0, 0]}>
			<sphereBufferGeometry attach='geometry' args={size} />
			<meshBasicMaterial attach='material' map={texture} />
			{realisticScale && <pointLight castShadow color='white' />}
		</mesh>
	);
}