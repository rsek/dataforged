import { type TObject, TypeGuard, type TSchema, Type } from '@sinclair/typebox'
import _, { mapValues } from 'lodash'
import { Assets, Enum, ID, Localize, Moves, Oracles } from 'schema'
import * as RulesetStarforged from 'schema/ruleset-starforged'
import * as RulesetClassic from 'schema/ruleset-classic'

import { SourceStub } from 'schema/common/metadata'

import { PartialBy } from 'schema/common/utils'
import { SourcebookClassic, SourcebookStarforged } from 'schema/sourcebooks'

export const SOURCEBOOK_KEY = Type.RegEx(/^[a-z0-9_]{3,}$/)

export const DATASWORN_VERSION = '2.0.0-dev'
export const DATAFORGED_VERSION = '2.0.0-dev'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export const SOURCE_PARTIAL_KEY = '_source'

function getDataEntryDefinitions(
	defs: Record<string, TSchema>
): Record<string, TSchema> {
	// clone to avoid mutating the original
	const newDefs: Record<string, TSchema> = _.cloneDeep({
		...defs,
		SourceStub: SourceStub as TSchema
	})
	for (let [key, def] of Object.entries(newDefs)) {
		if (
			TypeGuard.TOptional(def) ||
			TypeGuard.TLiteral(def) ||
			TypeGuard.TRef(def)
		)
			continue
		if (
			TypeGuard.TString(def) ||
			TypeGuard.TNumber(def) ||
			TypeGuard.TInteger(def) ||
			TypeGuard.TBoolean(def)
		)
			if (def.default != null) def = Type.Optional(def)

		if (TypeGuard.TObject(def)) {
			const objKeys = Object.keys(def.properties)
			const optionalKeys = ['source', 'id'] // TODO: check if any children have defaults

			for (const key of objKeys) {
				const value = def.properties[key]
				if (value.default != null) optionalKeys.push(key)
			}

			def = PartialBy(def, optionalKeys)
			if (objKeys.includes('source'))
				def = Type.Composite([
					def as TObject,
					Type.Object({
						[SOURCE_PARTIAL_KEY]: Type.Optional(Type.Ref(SourceStub))
					})
				])

			newDefs[key] = def
		}
	}

	return newDefs
}

export const Dataforged = Type.Record(SOURCEBOOK_KEY, SourcebookStarforged, {
	$schema,
	$id: 'https://ironswornrpg.com/starforged.schema.json',
	title: `Dataforged v${DATAFORGED_VERSION}`,
	description:
		'Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.',
	$defs: {
		...ID,
		...Localize,
		...Enum,
		...Oracles,
		...Moves,
		...Assets,
		...RulesetStarforged
	}
})

export const DataforgedInput = Type.Record(
	SOURCEBOOK_KEY,
	SourcebookStarforged,
	{
		$schema,
		$id: 'https://ironswornrpg.com/starforged-input.schema.json',
		title: `Dataforged v${DATAFORGED_VERSION} (data entry)`,
		description:
			'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
		$defs: getDataEntryDefinitions(Dataforged.$defs)
	}
)

export const Datasworn = Type.Record(SOURCEBOOK_KEY, SourcebookClassic, {
	$schema,
	$id: 'https://ironswornrpg.com/classic.schema.json',
	title: `Datasworn v${DATASWORN_VERSION}`,
	description:
		'Describes game rules elements compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.',
	$defs: {
		...ID,
		...Localize,
		...Enum,
		...Oracles,
		...Moves,
		...Assets,
		...RulesetClassic
	}
})

export const DataswornInput = Type.Record(SOURCEBOOK_KEY, SourcebookClassic, {
	$schema,
	$id: 'https://ironswornrpg.com/classic-input.schema.json',
	title: `Datasworn v${DATASWORN_VERSION} (data entry)`,
	description:
		'Data entry schema for Datasworn, which provides templates, fallbacks/default values for many undefined keys, and other conveniences like source inheritance. It must be processed into the standard Datasworn format.',
	$defs: getDataEntryDefinitions(Datasworn.$defs)
})
