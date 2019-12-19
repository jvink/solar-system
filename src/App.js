import React, { useRef, Suspense, useState, useCallback, useMemo, useEffect } from 'react';
import { Canvas, extend, useThree, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as tf from '@tensorflow/tfjs';
import data from './data.json';
import Body from './components/Body.js';

extend({ OrbitControls })
const Controls = props => {
	const { gl, camera } = useThree();
	const ref = useRef();
	useRender(() => ref.current.update());
	return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

const numberOfPlanets = data.planets.length;
const xInitialArray = data.planets.map(planet => planet.x);
const vInitialArray = data.planets.map(planet => planet.v);
const masses = data.planets.map(planet => planet.m);

const xInitial = tf.tensor2d(xInitialArray, [numberOfPlanets, 3]);
const vInitial = tf.tensor2d(vInitialArray, [numberOfPlanets, 3]);
const G = tf.scalar(data.G);

function SolarSystem({ dt = 0.1 }) {
	const [pos, setPos] = useState(xInitialArray);
	const x = useRef(xInitial);
	const v = useRef(vInitial);
	const dtTensor = useMemo(() => tf.scalar(dt), [dt]);
	const compute = useCallback(() => {
		const [newX, newV] = tf.tidy(() => {
			const a = calculateAcceleration(x.current);
			const newX = x.current.add(tf.mul(v.current, dtTensor));
			const newV = v.current.add(tf.mul(a, dtTensor));

			return [newX, newV];
		});

		tf.dispose([x.current, v.current]);
		x.current = newX;
		v.current = newV;

		newX.array().then(newPos => {
			setPos(newPos);
		});
	}, [x, v, dtTensor]);

	useEffect(() => {
		requestAnimationFrame(() => {
			compute();
		});
	}, [pos, compute]);

	return (
		<group>
			{pos.map((ppos, i) => (
				<Suspense fallback={null} key={`body-${i}`}>
					<Body ppos={ppos} index={i} />
				</Suspense>
			))}
		</group>
	);
}

function calculateAcceleration(x) {
	const unstackedX = tf.unstack(x);
	const accelerations = Array(numberOfPlanets).fill(tf.tensor1d([0, 0, 0]));

	for (let i = 0; i < numberOfPlanets; i++) {
		const iX = unstackedX[i];
		for (let j = i + 1; j < numberOfPlanets; j++) {
			const jX = unstackedX[j];
			const vector = tf.sub(jX, iX);
			const r = tf.norm(vector);

			const force = G.mul(masses[i])
				.mul(masses[j])
				.div(tf.pow(r, 3))
				.mul(vector);
			accelerations[i] = accelerations[i].add(force);
			accelerations[j] = accelerations[j].sub(force);
		}

		accelerations[i] = accelerations[i].div(masses[i]);
	}

	return tf.stack(accelerations);
}

export function App() {
	return (
		<div className="main">
			<div>
				
			</div>
			<Canvas shadowMap camera={{ position: [2, 0, 0] }}>
				<SolarSystem />
				<ambientLight intensity={1} />
				<Controls
					enableZoom={true}
					enableDamping
					dampingFactor={0.2}
					rotateSpeed={0.2}
				/>
			</Canvas>
		</div>
	);
}