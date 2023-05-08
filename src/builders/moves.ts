import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
import {
	type SourceHaver,
	collectionTransformer,
	sourcedTransformer
} from './Transformer'

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
