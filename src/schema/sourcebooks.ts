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
import * as Truths from 'schema/truths'
import * as Atlas from 'schema/atlas'
import * as Oracles from 'schema/oracles'
import * as Moves from 'schema/moves'
import * as Assets from 'schema/assets'
import * as Npcs from 'schema/npcs'
import * as Rarities from 'schema/rarities'
import * as DelveSites from 'schema/delve-sites'

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
	npcs: {
		description:
			'A dictionary object containing NPC collections, which contain NPCs.'
	},
	atlas: {
		description:
			'A dictionary object containing atlas collections, which contain atlas entries.'
	},
	rarities: {
		description:
			'A dictionary object containing rarities, like those presented in Ironsworn: Delve.'
	},
	delve_sites: {
		description:
			'A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve'
	},
	truths: {
		description: 'A dictionary object of truth categories.'
	}
}

export function SourcebookClassic(options: ObjectOptions) {
	return Sourcebook(
		'classic',
		{
			oracles: Oracles.OracleCollection,
			moves: Moves.MoveCategory,
			assets: Assets.AssetType,
			atlas: Atlas.Atlas,
			npcs: Npcs.NpcCollection,
			rarities: Rarities.Rarity,
			delve_sites: DelveSites.DelveSite,
			site_themes: DelveSites.DelveSiteTheme,
			site_domains: DelveSites.DelveSiteDomain,
			truths: Truths.Truth
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
			npcs: Npcs.NpcCollection,
			truths: Truths.Truth
		},
		{
			...pick(SourcebookInfoClassic, [
				'oracles',
				'moves',
				'assets',
				'npcs',
				'truths'
			])
		},
		options
	)
}
