import { cloneDeep } from 'lodash'
import { type Source } from 'schema'
import { type RecursiveCollection } from 'schema/common/abstract'

export function cascadeMetadata<T extends { id: string; source: Source }>(
	collection: RecursiveCollection<T>
) {
	if (collection.collections != null) {
		for (const [key, childCollection] of Object.entries(
			collection.collections
		)) {
			if (childCollection.source == null)
				childCollection.source = Object.assign(
					cloneDeep(collection.source),
					(childCollection as any)._source ?? {}
				)
			childCollection.id = `${collection.id}/${key}`

			cascadeMetadata(childCollection)
		}
	}
	if (collection.contents != null) {
		const stubID = collection.id.replace('/collections/', '/')
		for (const [key, item] of Object.entries(collection.contents)) {
			item.id = `${stubID}/${key}`
			if (item.source == null)
				item.source = Object.assign(
					cloneDeep(collection.source),
					(item as any)._source ?? {}
				)
		}
	}
	return collection
}

// another possibility -- generate these IDs by getting a jsonpath and transforming it?
