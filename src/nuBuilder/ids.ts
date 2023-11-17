import { In, Out } from '../types/index.js'

export class RulesetBuilder implements Out.Datasworn {
	#data: In.Datasworn[] = []

	/**
	 *
	 */
	constructor() {}

	accessor id: string
	accessor source: Out.Source

	accessor rules: Out.Rules | undefined
	accessor oracles: { [k: string]: Out.OracleCollection } = {}
	accessor assets: { [k: string]: Out.AssetType } = {}
	accessor atlas: { [k: string]: Out.Atlas } = {}
	accessor delve_sites: { [k: string]: Out.DelveSite } = {}
	accessor moves: { [k: string]: Out.MoveCategory } = {}
	accessor npcs: { [k: string]: Out.NpcCollection } = {}
	accessor rarities: { [k: string]: Out.Rarity } = {}
	accessor site_domains: { [k: string]: Out.DelveSiteDomain } = {}
	accessor site_themes: { [k: string]: Out.DelveSiteTheme } = {}
	accessor truths: { [k: string]: Out.Truth } = {}
}
// export interface RulesetBuilder extends Out.Datasworn {}
