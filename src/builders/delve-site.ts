import {
	sourcedTransformer,
	type Transformer,
	transform
} from './transformer.js'
import { type SourcedNode } from '../schema/datasworn/generic/SourcedNode.js'
import { trackID } from './id-tracker.js'
import { cloneDeep } from 'lodash-es'
import type { Datasworn, DataswornSource } from '../types/index.js'

type FeatureOrDangerData =
	| DataswornSource.DelveSiteThemeDangerRow
	| DataswornSource.DelveSiteThemeFeatureRow
	| DataswornSource.DelveSiteDomainDangerRow
	| DataswornSource.DelveSiteDomainFeatureRow

type FeatureOrDanger =
	| Datasworn.DelveSiteThemeDangerRow
	| Datasworn.DelveSiteThemeFeatureRow
	| Datasworn.DelveSiteDomainDangerRow
	| Datasworn.DelveSiteDomainFeatureRow

interface FeatureOrDangerMap
	extends Record<
		DelveSiteCardType,
		Record<DelveSiteCardRowType, FeatureOrDanger>
	> {
	theme: {
		feature: Datasworn.DelveSiteThemeFeatureRow
		danger: Datasworn.DelveSiteThemeDangerRow
	}
	domain: {
		feature: Datasworn.DelveSiteDomainFeatureRow
		danger: Datasworn.DelveSiteDomainDangerRow
	}
}

function featureOrDanger<TCard extends keyof FeatureOrDangerMap>(
	data: FeatureOrDangerData,
	rowType: keyof FeatureOrDangerMap[TCard],
	parentID: string
) {
	if (!(typeof data.min === 'number' && typeof data.max === 'number'))
		throw new Error(
			`Expected numeric low and high for delve card feature/danger row: ${JSON.stringify(
				data
			)}`
		)
	const id = trackID(
		`${parentID}/${rowType as string}s/${data.min}-${data.max}`
	)
	const result = cloneDeep(data) as FeatureOrDangerMap[TCard][typeof rowType]
	result.id = id
	return result
}

export const DelveSiteTheme = sourcedTransformer<
	DataswornSource.DelveSiteTheme,
	Datasworn.DelveSiteTheme
>({
	features: function (
		this: SourcedNode,
		data: DataswornSource.DelveSiteTheme,
		key: string | number,
		parent: SourcedNode
	) {
		return data.features.map((row) =>
			featureOrDanger(row, 'feature', this.id)
		) as Datasworn.DelveSiteTheme['features']
	},
	dangers: function (
		this: SourcedNode,
		data: DataswornSource.DelveSiteTheme,
		key: string | number,
		parent: SourcedNode
	) {
		return data.dangers.map((row) =>
			featureOrDanger(row, 'danger', this.id)
		) as Datasworn.DelveSiteTheme['dangers']
	}
})
export const DelveSiteDomain = sourcedTransformer<
	DataswornSource.DelveSiteDomain,
	Datasworn.DelveSiteDomain
>({
	features: function (
		this: SourcedNode,
		data: DataswornSource.DelveSiteDomain,
		key: string | number,
		parent: SourcedNode
	) {
		return data.features.map((row) =>
			featureOrDanger(row, 'feature', this.id)
		) as Datasworn.DelveSiteDomain['features']
	},
	dangers: function (
		this: SourcedNode,
		data: DataswornSource.DelveSiteDomain,
		key: string | number,
		parent: SourcedNode
	) {
		return data.dangers.map((row) =>
			featureOrDanger(row, 'danger', this.id)
		) as Datasworn.DelveSiteDomain['dangers']
	}
})

export const DelveSite = sourcedTransformer<
	DataswornSource.DelveSite,
	Datasworn.DelveSite
>({
	denizens(data, key, parent) {
		return data.denizens.map((row, index) =>
			transform(row, index, this, DelveSiteDenizen)
		) as Datasworn.DelveSite['denizens']
	}
})

export const DelveSiteDenizen: Transformer<
	DataswornSource.DelveSiteDenizen,
	Datasworn.DelveSiteDenizen
> = {
	id: function (
		data: DataswornSource.DelveSiteDenizen,
		key: string | number,
		parent: SourcedNode
	): string {
		return trackID(`${parent.id}/denizens/${data.min}-${data.max}`)
	}
}
