export const IDTracker = new Set<string>()

/** Add IDs to a Set as they're generated to ensure they're unique */
export function trackID(id: string) {
	// root IDs and collections can occur across multiple files, so it's OK for them to have duplicates
	if (id.includes('/') && !id.includes('/collections/')) {
		if (IDTracker.has(id)) throw new Error(`Duplicate ID: ${id}`)
		IDTracker.add(id)
	}
	return id
}
