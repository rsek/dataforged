import type { SourcebookStarforged as InSourcebookStarforged } from 'types/input/starforged'
import type { SourcebookStarforged as OutSourcebookStarforged } from 'types/output/starforged'
import type { SourcebookClassic as InSourcebookClassic } from 'types/input/classic'
import type { SourcebookClassic as OutSourcebookClassic } from 'types/output/classic'

import { sourcedTransformer, type SourceHaver, transform } from './transformer'
import { mapValues, pick } from 'lodash'
import { OracleCollection } from 'builders/oracle'
import { AssetType } from 'builders/assets'
import { MoveCategory } from 'builders/moves'
import { EncounterStarforged, SettingTruth } from 'builders/ruleset-starforged'
import {
	DelveSite,
	DelveSiteDomain,
	DelveSiteTheme,
	EncounterCollectionClassic,
	Rarity,
	RegionEntry,
	WorldTruth
} from 'builders/ruleset-classic'

export const SourcebookStarforged = sourcedTransformer<
	InSourcebookStarforged,
	OutSourcebookStarforged,
	null
>({
	oracles: function (
		this: SourceHaver,
		data: InSourcebookStarforged,
		key: string | number,
		parent: null
	) {
		return mapValues(data.oracles, (v, k) =>
			transform(v, k, data, OracleCollection)
		)
	},
	assets: function (
		this: SourceHaver,
		data: InSourcebookStarforged,
		key: string | number,
		parent: null
	) {
		return mapValues(data.assets, (v, k) => transform(v, k, data, AssetType))
	},
	moves: function (
		this: SourceHaver,
		data: InSourcebookStarforged,
		key: string | number,
		parent: null
	) {
		return mapValues(data.moves, (v, k) => transform(v, k, data, MoveCategory))
	},
	encounters: function (
		this: SourceHaver,
		data: InSourcebookStarforged,
		key: string | number,
		parent: null
	) {
		return mapValues(data.encounters, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id as string}/encounters` },
				EncounterStarforged
			)
		)
	},
	setting_truths: function (
		this: SourceHaver,
		data: InSourcebookStarforged,
		key: string | number,
		parent: null
	) {
		return mapValues(data.setting_truths, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/setting_truths` },
				SettingTruth
			)
		)
	}
})

export const SourcebookClassic = sourcedTransformer<
	InSourcebookClassic,
	OutSourcebookClassic,
	null
>({
	...(pick(SourcebookStarforged, [
		'assets',
		'moves',
		'oracles'
	]) as unknown as Pick<
		ReturnType<
			typeof sourcedTransformer<InSourcebookClassic, OutSourcebookClassic, null>
		>,
		'assets' | 'moves' | 'oracles'
	>),
	encounters: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.encounters, (v, k) =>
			transform(v, k, data, EncounterCollectionClassic)
		)
	},
	regions: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.regions, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/regions` },
				RegionEntry
			)
		)
	},
	rarities: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.rarities, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/rarities` },
				Rarity
			)
		)
	},
	delve_sites: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.delve_sites, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/delve_sites` },
				DelveSite
			)
		)
	},
	site_themes: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.site_themes, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/site_themes` },
				DelveSiteTheme
			)
		)
	},
	site_domains: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.site_domains, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/site_domains` },
				DelveSiteDomain
			)
		)
	},
	world_truths: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.world_truths, (v, k) =>
			transform(
				v,
				k,
				{ source: data.source, id: `${data.id}/world_truths` },
				WorldTruth
			)
		)
	}
})
