import { trackID } from 'builders/id-tracker'
import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
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
