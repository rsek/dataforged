import type * as In from 'types/input/classic'
import type * as Out from 'types/output/classic'
import {
	sourcedTransformer,
	type Transformer,
	type SourceHaver,
	transform
} from './transformer'
import { trackID } from 'builders/id-tracker'
import {
	type DelveSiteCardRowType,
	type DelveSiteCardType
} from 'schema/ruleset-classic/delve-sites'
import { cloneDeep } from 'lodash'

type FeatureOrDangerData =
	| In.DelveSiteThemeDangerRow
	| In.DelveSiteThemeFeatureRow
	| In.DelveSiteDomainDangerRow
	| In.DelveSiteDomainFeatureRow

type FeatureOrDanger =
	| Out.DelveSiteThemeDangerRow
	| Out.DelveSiteThemeFeatureRow
	| Out.DelveSiteDomainDangerRow
	| Out.DelveSiteDomainFeatureRow

interface FeatureOrDangerMap
	extends Record<
		DelveSiteCardType,
		Record<DelveSiteCardRowType, FeatureOrDanger>
	> {
	theme: {
		feature: Out.DelveSiteThemeFeatureRow
		danger: Out.DelveSiteThemeDangerRow
	}
	domain: {
		feature: Out.DelveSiteDomainFeatureRow
		danger: Out.DelveSiteDomainDangerRow
	}
}

function featureOrDanger<TCard extends keyof FeatureOrDangerMap>(
	data: FeatureOrDangerData,
	rowType: keyof FeatureOrDangerMap[TCard],
	parentID: string
) {
	if (!(typeof data.low === 'number' && typeof data.high === 'number'))
		throw new Error(
			`Expected numeric low and high for delve card feature/danger row: ${JSON.stringify(
				data
			)}`
		)
	const id = trackID(
		`${parentID}/${rowType as string}s/${data.low}-${data.high}`
	)
	const result = cloneDeep(data) as FeatureOrDangerMap[TCard][typeof rowType]
	result.id = id
	return result
}

export const DelveSiteTheme = sourcedTransformer<
	In.DelveSiteTheme,
	Out.DelveSiteTheme
>({
	features: function (
		this: SourceHaver,
		data: In.DelveSiteTheme,
		key: string | number,
		parent: SourceHaver
	) {
		return data.features.map((row) =>
			featureOrDanger(row, 'feature', this.id)
		) as Out.DelveSiteTheme['features']
	},
	dangers: function (
		this: SourceHaver,
		data: In.DelveSiteTheme,
		key: string | number,
		parent: SourceHaver
	) {
		return data.dangers.map((row) =>
			featureOrDanger(row, 'danger', this.id)
		) as Out.DelveSiteTheme['dangers']
	}
})
export const DelveSiteDomain = sourcedTransformer<
	In.DelveSiteDomain,
	Out.DelveSiteDomain
>({
	features: function (
		this: SourceHaver,
		data: In.DelveSiteDomain,
		key: string | number,
		parent: SourceHaver
	) {
		return data.features.map((row) =>
			featureOrDanger(row, 'feature', this.id)
		) as Out.DelveSiteDomain['features']
	},
	dangers: function (
		this: SourceHaver,
		data: In.DelveSiteDomain,
		key: string | number,
		parent: SourceHaver
	) {
		return data.dangers.map((row) =>
			featureOrDanger(row, 'danger', this.id)
		) as Out.DelveSiteDomain['dangers']
	}
})

export const DelveSite = sourcedTransformer<In.DelveSite, Out.DelveSite>({
	denizens(data, key, parent) {
		return data.denizens.map((row, index) =>
			transform(row, index, this, DelveSiteDenizen)
		) as Out.DelveSite['denizens']
	}
})

export const DelveSiteDenizen: Transformer<
	In.DelveSiteDenizen,
	Out.DelveSiteDenizen
> = {
	id: function (
		data: In.DelveSiteDenizen,
		key: string | number,
		parent: SourceHaver
	): string {
		return trackID(`${parent.id}/denizens/${data.low}-${data.high}`)
	}
}

export const Rarity = sourcedTransformer<In.Rarity, Out.Rarity>({})

export const RegionEntry = sourcedTransformer<In.RegionEntry, Out.RegionEntry>(
	{}
)

export const WorldTruthOption: Transformer<
	In.WorldTruth['options'][number],
	Out.WorldTruth['options'][number]
> = {
	id: function (
		data: In.WorldTruthOption,
		key: string | number,
		parent: SourceHaver
	): string {
		return trackID(`${parent.id}/${key}`)
	}
}
export const WorldTruth = sourcedTransformer<In.WorldTruth, Out.WorldTruth>({
	options(this, data, key, parent) {
		return data.options.map((option, i) =>
			transform(option, i, this, WorldTruthOption)
		)
	}
})
