import { mapValues } from 'lodash'
import type * as In from 'types/input/starforged'
import type * as Out from 'types/output/starforged'
import {
	type Transformer,
	transform,
	sourcedTransformer,
	type SourceHaver
} from './transformer'

export const EncounterStarforged = sourcedTransformer<
	In.EncounterStarforged,
	Out.EncounterStarforged
>({
	variants: function (
		this,
		data,
		key,
		parent
	): Record<string, Out.EncounterVariantStarforged> | undefined {
		if (data.variants == null) return undefined

		return mapValues(data.variants, (v, k) =>
			transform(v, k, this, EncounterVariantStarforged)
		)
	}
})

export const EncounterVariantStarforged: Transformer<
	In.EncounterVariantStarforged,
	Out.EncounterVariantStarforged
> = {
	id(data, key, parent) {
		return `${parent.id}/variants/${key}`
	}
}

export const SettingTruthOption: Transformer<
	In.SettingTruthOption,
	Out.SettingTruthOption
> = {
	id: function (
		data: In.SettingTruthOption,
		key: string | number,
		parent: SourceHaver
	): string {
		return `${parent.id}/${key}`
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
