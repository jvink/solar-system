import React, { useRef, Suspense, useState } from 'react';
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
	const [realisticScale, setToRealisticScale] = useState(true);
	const SIZE_SCALE = 0.00001;
	const SUN_DIAMETER = 1392530;
	const DISTANCE_SCALE = 0.05;
	const DISTANCE_OFFSET = realisticScale ? 250 : 50;
	const constants = {
		realisticScale,
		SIZE_SCALE,
		DISTANCE_SCALE,
		DISTANCE_OFFSET
	};

	return (
		<div className="main">
			<div>
				<button onClick={() => setToRealisticScale(!realisticScale)}>to {realisticScale ? 'unrealistic' : 'realistic'} scale</button>
			</div>
			<Canvas shadowMap>
				<ambientLight intensity={0.1} />
				<Controls
					enableZoom={true}
					enableDamping
					dampingFactor={0.2}
					rotateSpeed={0.2}
				/>
				<Suspense fallback={null}>
					<Sun
						realisticScale={realisticScale}
						SUN_DIAMETER={SUN_DIAMETER}
						SIZE_SCALE={SIZE_SCALE}
					/>
				</Suspense>
				{data.planets.map((planet, index) => {
					const RANDOM_ANGLE = Math.random() * Math.PI * 2;

					return (
						<Suspense
							key={planet.name}
							fallback={<LoadingBody
								{...planet}
								{...constants}
								RANDOM_ANGLE={RANDOM_ANGLE}
							/>}>
							<Planet
								{...planet}
								{...constants}
								index={index}
								RANDOM_ANGLE={RANDOM_ANGLE}
							/>
						</Suspense>
					)
				})}
			</Canvas>
		</div>
	);
}