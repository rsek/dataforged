import type { SourcebookClassic as InSourcebookClassic } from 'types/input/classic'
import type { SourcebookClassic as OutSourcebookClassic } from 'types/output/classic'

import { sourcedTransformer, type SourceHaver, transform } from './transformer'
import { mapValues } from 'lodash'
import { OracleCollection } from 'builders/oracles'
import { AssetType } from 'builders/assets'
import { MoveCategory } from 'builders/moves'
import {
	DelveSite,
	DelveSiteDomain,
	DelveSiteTheme,
	Rarity
} from 'builders/ruleset-classic'
import { Truth } from './truths'
import { NpcCollection } from 'builders/npcs'
import { Atlas } from 'builders/atlas'

export const SourcebookClassic = sourcedTransformer<
	InSourcebookClassic,
	OutSourcebookClassic,
	null
>({
	oracles: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.oracles, (v, k) =>
			transform(v, k, data, OracleCollection)
		)
	},
	assets: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.assets, (v, k) => transform(v, k, data, AssetType))
	},
	moves: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.moves, (v, k) => transform(v, k, data, MoveCategory))
	},
	npcs: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.npcs, (v, k) => transform(v, k, data, NpcCollection))
	},
	truths: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.truths, (v, k) =>
			transform(v, k, { source: data.source, id: `${data.id}/truths` }, Truth)
		)
	},

	atlas: function (
		this: SourceHaver,
		data: InSourcebookClassic,
		key: string | number,
		parent: null
	) {
		return mapValues(data.atlas, (v, k) => transform(v, k, data, Atlas))
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
	}
})
