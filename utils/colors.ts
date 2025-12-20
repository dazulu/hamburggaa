export const generateTagColors = (tagName: string) => {
	// IMPORTANT: these match Tags defined in Contentful
	// but we need to explicitly define specific colors for them
	const PREDEFINED_HUES: Record<string, number> = {
		Camogie: 85, // Yellow-Green
		Hurling: 85, // Yellow-Green
		"Gaelic football": 85, // Yellow-Green
		History: 280, // Purple
		"Club News": 30, // Orange
		"Coaching & Skills": 325, // Magenta
		"Gaelic Athletics Association (GAA)": 200, // Light Blue
		Ireland: 140, // Indigo
		"Press Releases": 305, // Deep Purple
		"Social Events": 350, // Pink
		Sponsorship: 165, // Teal
		Tournaments: 10, // Red
	};

	let hue: number;

	if (PREDEFINED_HUES[tagName] !== undefined) {
		hue = PREDEFINED_HUES[tagName];
	} else {
		// Fallback: Golden Ratio hash for better distribution
		let hash = 2166136261 >>> 0; // FNV-1a-ish
		for (let i = 0; i < tagName.length; i++) {
			hash ^= tagName.charCodeAt(i);
			hash = Math.imul(hash, 16777619);
		}
		hash = hash >>> 0;

		const golden = 0.61803398875;
		const baseHue = (hash % 360) / 360;
		const spacedHue = (baseHue + golden * (hash % 10)) % 1;

		// Snap to 25-degree buckets to avoid near-dupes
		const hueBucketSize = 25 / 360;
		const hueBucket = Math.round(spacedHue / hueBucketSize) * hueBucketSize;

		hue = Math.round((hueBucket % 1) * 360);
	}

	return {
		backgroundColor: `oklch(96% 0.04 ${hue})`,
		color: `oklch(40% 0.12 ${hue})`,
	};
};
