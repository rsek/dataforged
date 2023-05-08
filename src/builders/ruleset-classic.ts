import type * as In from 'types/input/classic'
import type * as Out from 'types/output/classic'
import {
	sourcedTransformer,
	collectionTransformer,
	type Transformer,
	type SourceHaver,
	transform
} from './transformer'

export const EncounterClassic = sourcedTransformer<
	In.EncounterClassic,
	Out.EncounterClassic
>({})

export const EncounterCollectionClassic = collectionTransformer<
	In.EncounterCollectionClassic,
	Out.EncounterCollectionClassic
>('encounters', EncounterClassic, {})

export const DelveSiteTheme = sourcedTransformer<
	In.DelveSiteTheme,
	Out.DelveSiteTheme
>({})
export const DelveSiteDomain = sourcedTransformer<
	In.DelveSiteDomain,
	Out.DelveSiteDomain
>({})

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
		return `${parent.id}/denizens/${data.low}-${data.high}`
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
		return `${parent.id}/${key}`
	}
}
export const WorldTruth = sourcedTransformer<In.WorldTruth, Out.WorldTruth>({
	options(this, data, key, parent) {
		return data.options.map((option, i) =>
			transform(option, i, this, WorldTruthOption)
		)
	}
})
