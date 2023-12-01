import { sourcedTransformer, transform } from './transformer.js'
import { mapValues } from 'lodash-es'
import { OracleCollection } from './oracles.js'
import { AssetType } from './assets.js'
import { MoveCategory } from './moves.js'
import { DelveSite, DelveSiteDomain, DelveSiteTheme } from './delve-site.js'
import { Rarity } from './rarities.js'
import { Truth } from './truths.js'
import { NpcCollection } from './npcs.js'
import { Atlas } from './atlas.js'
import { VERSION } from '../scripts/const.js'
import type { Datasworn, DataswornSource } from '../types/index.js'

export const RulesPackage = sourcedTransformer<
	DataswornSource.RulesPackage,
	Datasworn.RulesPackage,
	null
>({
	datasworn_version: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return VERSION
	},
	rules: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return data.rules
	},
	oracles: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.oracles, (v, k) =>
			transform(v, k, data, OracleCollection)
		)
	},
	assets: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.assets, (v, k) => transform(v, k, data, AssetType))
	},
	moves: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.moves, (v, k) => transform(v, k, data, MoveCategory))
	},
	npcs: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.npcs, (v, k) => transform(v, k, data, NpcCollection))
	},
	truths: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.truths, (v, k) =>
			transform(v, k, { id: `${data.id}/truths` }, Truth)
		)
	},

	atlas: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.atlas, (v, k) => transform(v, k, data, Atlas))
	},
	rarities: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.rarities, (v, k) =>
			transform(v, k, { id: `${data.id}/rarities` }, Rarity)
		)
	},
	delve_sites: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.delve_sites, (v, k) =>
			transform(v, k, { id: `${data.id}/delve_sites` }, DelveSite)
		)
	},
	site_themes: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.site_themes, (v, k) =>
			transform(v, k, { id: `${data.id}/site_themes` }, DelveSiteTheme)
		)
	},
	site_domains: function (
		this: DataswornSource.RulesPackage,
		data: DataswornSource.RulesPackage,
		key: string | number,
		parent: null
	) {
		return mapValues(data.site_domains, (v, k) =>
			transform(v, k, { id: `${data.id}/site_domains` }, DelveSiteDomain)
		)
	}
})
