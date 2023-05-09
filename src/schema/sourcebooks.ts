import {
	type TSchema,
	Type,
	type ObjectOptions,
	type TOptional,
	type TRecord,
	type TString,
	type TRef
} from '@sinclair/typebox'

import { mapValues } from 'lodash'
import { Metadata, Abstract } from 'schema/common'
import * as Oracles from 'schema/oracles'
import * as Moves from 'schema/moves'
import * as Assets from 'schema/assets'

import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'

export const SOURCEBOOK_KEY = Type.RegEx(/^[a-z0-9_]{3,}$/)

function Sourcebook<T extends Metadata.Ruleset, K extends string>(
	ruleset: T,
	contents: Record<K, TSchema>,
	options: ObjectOptions = {}
) {
	const sourcebookEntries = mapValues(contents, (v) =>
		Type.Optional(Abstract.Dictionary(Type.Ref(v)))
	) as {
		[x in keyof typeof contents]: TOptional<
			TRecord<TString, TRef<(typeof contents)[x]>>
		>
	}
	const meta = {
		id: SOURCEBOOK_KEY,
		ruleset: Type.Literal(ruleset),
		source: Type.Ref(Metadata.Source)
	}
	const result = Type.Object(
		{
			...meta,
			...sourcebookEntries
		} as typeof sourcebookEntries & typeof meta,
		options
	)
	return result
}

export function SourcebookClassic(options: ObjectOptions) {
	return Sourcebook(
		'classic',
		{
			oracles: Oracles.OracleCollection,
			moves: Moves.MoveCategory,
			assets: Assets.AssetType,
			regions: RulesetClassic.RegionEntry,
			encounters: RulesetClassic.EncounterCollectionClassic,
			rarities: RulesetClassic.Rarity,
			delve_sites: RulesetClassic.DelveSite,
			site_themes: RulesetClassic.DelveSiteTheme,
			site_domains: RulesetClassic.DelveSiteDomain,
			world_truths: RulesetClassic.WorldTruth
		},
		options
	)
}

export function SourcebookStarforged(options: ObjectOptions) {
	return Sourcebook(
		'starforged',
		{
			oracles: Oracles.OracleCollection,
			moves: Moves.MoveCategory,
			assets: Assets.AssetType,
			encounters: RulesetStarforged.EncounterStarforged,
			setting_truths: RulesetStarforged.SettingTruth
		},
		options
	)
}
