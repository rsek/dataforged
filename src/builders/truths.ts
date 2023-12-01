import { trackID } from './id-tracker.js'
import type * as In from '../types/DataswornSource.js'
import type * as Out from '../types/Datasworn.js'
import {
	sourcedTransformer,
	transform,
	type SourceHaver,
	type Transformer
} from './transformer'

export const TruthOption: Transformer<In.TruthOption, Out.TruthOption> = {
	id: function (
		data: In.TruthOption,
		key: string | number,
		parent: SourceHaver
	): string {
		return trackID(`${parent.id}/${key}`)
	}
}

export const Truth = sourcedTransformer<In.Truth, Out.Truth>({
	options: function (
		this: SourceHaver,
		data: In.Truth,
		key: string | number,
		parent: SourceHaver
	): Out.TruthOption[] {
		return data.options.map((option, i) =>
			transform(option, i, this, TruthOption)
		)
	}
})
