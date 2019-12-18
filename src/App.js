import React, { useRef, Suspense } from "react";
import { Canvas, extend, useThree, useRender } from "react-three-fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import data from './data.json';
import Planet from "./components/Planet.js";
import Sun from "./components/Sun.js";

extend({ OrbitControls })
const Controls = props => {
	const { gl, camera } = useThree();
	const ref = useRef();
	useRender(() => ref.current.update());
	return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

export function App() {
	return (
		<Canvas shadowMap>
			<ambientLight intensity={0.2} />
			<Controls
				enableZoom={true}
				enableDamping
				dampingFactor={0.2}
				rotateSpeed={0.2}
			/>
			<Suspense fallback={null}>
				<Sun />
			</Suspense>
			{data.planets.map((planet, index) => (
				<Suspense fallback={null} key={planet.name}>
					<Planet {...planet} index={index} />
				</Suspense>
			))}
		</Canvas>
	);
}