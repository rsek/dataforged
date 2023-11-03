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

import { REGEX_SOURCEBOOK_KEY } from 'schema/common/regex'

export const SOURCEBOOK_KEY = Type.RegEx(
	new RegExp(`^${REGEX_SOURCEBOOK_KEY.source}$`)
)

export function Sourcebook<K extends string>(
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

// FIXME: this should probably be done with schema builders instead
export const SourcebookInfo = {
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
