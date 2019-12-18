export function getPosition(aphelion, randomAngle, distanceScale, distanceOffset) {
	const x = Math.cos(randomAngle) * (aphelion + distanceOffset);
	const z = Math.sin(randomAngle) * (aphelion + distanceOffset);

	return [x * distanceScale, 0, z * distanceScale];
}