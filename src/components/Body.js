import React from 'react';
import data from '../data.json';
import { useLoader } from 'react-three-fiber';
import * as THREE from 'three';

export default function Body({ ppos, index }) {
	const [texture] = useLoader(THREE.TextureLoader, [`planets/${data.planets[index].image}`]);

	return (
		<>
			<mesh position={ppos} key={`planet-${index}`}>
				<sphereBufferGeometry
					args={[index === 0 ? 0.2 : data.planets[index].r * 800, 30, 30]}
					attach="geometry"
				/>
				<meshStandardMaterial
					map={texture}
					roughness={1}
					attach="material"
				/>
			</mesh>
			{data.planets[index].rings && data.planets[index].rings.map((ring, j) => {
				const NINETY_DEGREES_IN_EULER = 1.5707963;

				return (
					<mesh
						key={j}
						rotation={new THREE.Euler(data.planets[index].axialTilt + NINETY_DEGREES_IN_EULER, 0, 0)}
						position={ppos}
						receiveShadow>
						<ringBufferGeometry attach='geometry' args={[ring.max * 0.000003, ring.min * 0.000003, 32]} />
						<meshPhysicalMaterial attach='material' side={THREE.DoubleSide} color={data.planets[index].color} />
					</mesh>
				)
			})}
		</>
	);
}