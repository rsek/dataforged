import type * as In from '../types/DataswornSource.js'
import type * as Out from '../types/Datasworn.js'
import { collectionTransformer, sourcedTransformer } from './transformer.js'
import { type SourcedNode } from '../schema/datasworn/generic/SourcedNode.js'

import type { Datasworn, DataswornSource } from '../types/index.js'

export const Move = sourcedTransformer<DataswornSource.Move, Datasworn.Move>({
	trigger: function (
		this: SourcedNode,
		data: DataswornSource.Move,
		key: string | number,
		parent: SourcedNode
	): Datasworn.Trigger {
		// this doesn't need transforms ATM, because it gets the optional defaults supplied automatically by AJV
		return data.trigger as Datasworn.Trigger
	}
})

export const MoveCategory = collectionTransformer<
	DataswornSource.MoveCategory,
	Datasworn.MoveCategory
>('moves', Move, {})
