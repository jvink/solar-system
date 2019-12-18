export function getPosition(aphelion, randomAngle, distanceScale) {
	const x = Math.cos(randomAngle) * aphelion;
	const z = Math.sin(randomAngle) * aphelion;

	return [x * distanceScale, 0, z * distanceScale];
}