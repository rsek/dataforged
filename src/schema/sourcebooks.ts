import {
	type TSchema,
	Type,
	type ObjectOptions,
	type TOptional,
	type TRecord,
	type TString,
	type TRef
} from '@sinclair/typebox'

import { mapValues, pick } from 'lodash'
import { Metadata, Abstract } from 'schema/common'
import * as Oracles from 'schema/oracles'
import * as Moves from 'schema/moves'
import * as Assets from 'schema/assets'

import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'
import { REGEX_SOURCEBOOK_KEY } from 'schema/common/regex'

export const SOURCEBOOK_KEY = Type.RegEx(
	new RegExp(`^${REGEX_SOURCEBOOK_KEY.source}$`)
)

function Sourcebook<T extends Metadata.Ruleset, K extends string>(
	ruleset: T,
	contents: Record<K, TSchema>,
	metadata: Record<keyof typeof contents, ObjectOptions>,
	options: ObjectOptions = {}
) {
	const sourcebookEntries = mapValues(contents, (v, k) =>
		Type.Optional(
			Abstract.Dictionary(Type.Ref(v), metadata[k as keyof typeof contents])
		)
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

const SourcebookInfoClassic = {
	oracles: {
		description:
			'A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.'
	},
	assets: {
		description:
			'A dictionary object containing asset types, which contain assets.'
	},
	moves: {
		description:
			'A dictionary object containing move categories, which contain moves.'
	},
	site_domains: {
		description: 'A dictionary object containing delve site domains.'
	},
	site_themes: {
		description: 'A dictionary object containing delve site themes.'
	},
	encounters: {
		description:
			'A dictionary object containing Ironsworn classic-style encounters, grouped according to their nature (e.g. "Ironlander", "horror".'
	},
	regions: {
		description:
			'A dictionary object containing region entries, like those used to describe the Ironlands in classic Ironsworn.'
	},
	rarities: {
		description:
			'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
	},
	delve_sites: {
		description:
			'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
	},
	world_truths: {
		description:
			'A dictionary object of world truth categories, like those presented in classic Ironsworn.'
	}
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
		SourcebookInfoClassic,
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
		{
			...pick(SourcebookInfoClassic, ['oracles', 'moves', 'assets']),
			encounters: {
				description:
					'A dictionary object containing Starforged-style encounter entries.'
			},
			setting_truths: {
				description:
					'A dictionary object containing Starforged-style setting truths.'
			}
		},
		options
	)
}
