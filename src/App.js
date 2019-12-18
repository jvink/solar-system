import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import data from './data.json';
import Planet from './components/Planet.js';
import Sun from './components/Sun.js';
import LoadingBody from './components/LoadingBody.js';

extend({ OrbitControls })
const Controls = props => {
	const { gl, camera } = useThree();
	const ref = useRef();
	useRender(() => ref.current.update());
	return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export function App() {
	const SIZE_SCALE = 0.0000075;
	const DISTANCE_SCALE = 0.15;

	return (
		<Canvas shadowMap>
			<ambientLight intensity={0.1} />
			<Controls
				enableZoom={true}
				enableDamping
				dampingFactor={0.2}
				rotateSpeed={0.2}
			/>
			<Suspense fallback={null}>
				<Sun />
			</Suspense>
			{data.planets.map((planet, index) => {
				const RANDOM_ANGLE = Math.random() * Math.PI * 2;

				return (
					<Suspense
						key={planet.name}
						fallback={<LoadingBody
							{...planet}
							RANDOM_ANGLE={RANDOM_ANGLE}
							SIZE_SCALE={SIZE_SCALE}
							DISTANCE_SCALE={DISTANCE_SCALE}
						/>}>
						<Planet
							{...planet}
							index={index}
							RANDOM_ANGLE={RANDOM_ANGLE}
							SIZE_SCALE={SIZE_SCALE}
							DISTANCE_SCALE={DISTANCE_SCALE}
						/>
					</Suspense>
				)
			})}
		</Canvas>
	);
}