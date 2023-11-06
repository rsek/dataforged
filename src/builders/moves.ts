import type * as In from '../types/io/datasworn-input.js'
import type * as Out from '../types/io/datasworn.js'
import {
	type SourceHaver,
	collectionTransformer,
	sourcedTransformer
} from './transformer'

export const Move = sourcedTransformer<In.Move, Out.Move>({
	trigger: function (
		this: SourceHaver,
		data: In.Move,
		key: string | number,
		parent: SourceHaver
	): Out.Trigger {
		// this doesn't need transforms ATM, because it gets the optional defaults supplied automatically by AJV
		return data.trigger as Out.Trigger
	}
})

export const MoveCategory = collectionTransformer<
	In.MoveCategory,
	Out.MoveCategory
>('moves', Move, {})
