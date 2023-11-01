import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
import {
	type Transformer,
	transform,
	sourcedTransformer,
	type SourceHaver
} from './transformer'
import { trackID } from 'builders/id-tracker'

export const SettingTruthOption: Transformer<
	In.SettingTruthOption,
	Out.SettingTruthOption
> = {
	id: function (
		data: In.SettingTruthOption,
		key: string | number,
		parent: SourceHaver
	): string {
		return trackID(`${parent.id}/${key}`)
	}
}

export const SettingTruth = sourcedTransformer<
	In.SettingTruth,
	Out.SettingTruth
>({
	options: function (
		this: SourceHaver,
		data: In.SettingTruth,
		key: string | number,
		parent: SourceHaver
	): Out.SettingTruthOption[] {
		return data.options.map((option, i) =>
			transform(option, i, this, SettingTruthOption)
		)
	}
})
