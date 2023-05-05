import { TypeGuard } from '@sinclair/typebox'
import { type TSchema, Type } from '@sinclair/typebox'
import _ from 'lodash'
import {
	Assets,
	Enum,
	ID,
	Localize,
	Moves,
	Oracles,
	RulesetStarforged
} from 'schema'
import { Source } from 'schema/common/metadata'
import { PartialBy } from 'schema/common/utils'
import * as Sourcebooks from 'schema/sourcebooks'

export const SOURCEBOOK_KEY = Type.RegEx(/^[a-z0-9_]{3,}$/)

export const DATASWORN_VERSION = '2.0.0'
export const DATAFORGED_VERSION = '2.0.0'

export const $schema = 'http://json-schema.org/draft-07/schema#'

export const SOURCE_PARTIAL_KEY = '_source'
export const SourcePartial = Type.Partial(Source, {
	description:
		'A source data stub that inherits data from ancestor elements during post-processing. To prevent inheritance, use the regular `source` property instead.',
	$id: '#/definitions/SourcePartial'
})

function getDataEntryDefinitions(
	defs: Record<string, TSchema>
): Record<string, TSchema> {
	// clone to avoid mutating the original
	const newDefs: Record<string, TSchema> = _.cloneDeep({
		...defs,
		SourcePartial: SourcePartial as TSchema
	})
	for (let def of Object.values(newDefs)) {
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
			const optionalKeys = ['source', 'id'] // TODO: iterate over keys, checking if any children have defaults

			for (const key of objKeys) {
				const value = def.properties[key]
				if (value.default != null) optionalKeys.push(key)
			}

			def = Type.Composite([
				PartialBy(def, optionalKeys),
				Type.Object({
					[SOURCE_PARTIAL_KEY]: Type.Optional(Type.Ref(SourcePartial))
				})
			])
		}
	}

	return newDefs
}

export const Dataforged = Type.Record(
	SOURCEBOOK_KEY,
	Sourcebooks.SourcebookStarforged,
	{
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
	}
)

export const DataforgedInput = Type.Record(
	SOURCEBOOK_KEY,
	Sourcebooks.SourcebookStarforged,
	{
		$schema,
		$id: 'https://ironswornrpg.com/starforged-input.schema.json',
		title: `Dataforged v${DATAFORGED_VERSION} (data entry)`,
		description:
			'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
		$defs: getDataEntryDefinitions(Dataforged.$defs)
	}
)

export const Datasworn = Type.Record(
	SOURCEBOOK_KEY,
	Sourcebooks.SourcebookClassic,
	{
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
			...RulesetStarforged
		}
	}
)

export const DataswornInput = Type.Record(
	SOURCEBOOK_KEY,
	Sourcebooks.SourcebookClassic,
	{
		$schema,
		$id: 'https://ironswornrpg.com/classic-input.schema.json',
		title: `Datasworn v${DATASWORN_VERSION} (data entry)`,
		description:
			'Data entry schema for Datasworn, which provides templates, fallbacks/default values for many undefined keys, and other conveniences like source inheritance. It must be processed into the standard Datasworn format.',
		$defs: getDataEntryDefinitions(Datasworn.$defs)
	}
)
