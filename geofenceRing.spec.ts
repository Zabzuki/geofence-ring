import { geofenceRing } from './geofenceRing'

describe('geofenceRing', () => {
	it.each([
		[1, 3, [0, 1, 2, -2, 3], [0, 1, 4, 1, 0], 2],
		[2, 4, [4, 0, 1, -2], [-4, 4, 3, 0], 1],
		[1, 3, [0, 1, 1, 2, -2, -2, 3], [0, 1, -1, 4, -4, 1, 0], 3],
		[1, 3, [4, -4, 2], [4, -4, 2], 1], // two outside of ring
		[2, 4, [1, -1, 3], [1, 1, 3], 0], // two inside of inner ring, one outside
		// the border of the ring is not included
		[1, 3, [3], [3], 0], // outer
		[1, 3, [1, 0], [1, 1], 1], // inner
	])(
		'ring with inner size of %d and outer size of %d should for points at %s/%s return %d matches',
		(inner, outer, sheepsX, sheepsY, expected) => {
			expect(
				geofenceRing({
					inner,
					outer,
					pointsX: sheepsX,
					pointsY: sheepsY,
				}),
			).toEqual(expected)
		},
	)
})
