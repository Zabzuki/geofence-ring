export const distance = (
	[x1, y1]: [number, number],
	[x2, y2]: [number, number] = [0, 0],
): number => {
	const a = x1 - x2
	const b = y1 - y2
	return Math.sqrt(a * a + b * b)
}

export const geofenceRing = (_: {
	inner: number
	outer: number
	pointsX: number[]
	pointsY: number[]
}): number => {
	validateInput(_.inner, _.outer)
	const distances: number[] = []

	for (let i = 0; i < _.pointsX.length; i++) {
		distances.push(distance([_.pointsX[i], _.pointsY[i]]))
	}
	const filteredDistances = distances.filter(
		(distance) => distance > _.inner && distance < _.outer,
	)
	return filteredDistances.length
}

function validateInput(inner: number, outer: number) {
	if (inner >= outer) {
		throw new Error('error')
	}
}
