import React from 'react';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

export default function Sun() {
	const [texture] = useLoader(THREE.TextureLoader, [`planets/sun.jpg`]);
	const size = [1392530 / 150000, 32, 32];

	return (
		<mesh position={[0, 0, 0]}>
			<sphereBufferGeometry attach='geometry' args={size} />
			<meshBasicMaterial attach='material' map={texture} fog={false} />
			<pointLight castShadow color='white' />
		</mesh>
	);
}