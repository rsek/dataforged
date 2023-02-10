import { type JSONSchema7 } from 'json-schema'
import _ from 'lodash'
import { defsStarforged, defsClassic } from './definitions.js'
import { type JSONSchemaType as Schema } from 'ajv'
import { type Metadata } from '@base-types'
import { Source } from './metadata.js'
import { Namespaces } from '@df-json-schema'

export const DATASWORN_VERSION = '2.0.0'
export const DATAFORGED_VERSION = '2.0.0'

// TODO: figure out if there's a sensible way to version the schema

export const NAMESPACE_KEY = /^[a-z0-9][a-z0-9_]+$/.source

export const SOURCE_PARTIAL_KEY = '_source'
export const SourcePartial: Schema<Partial<Metadata.Source>> = {
	description:
		'A source data stub that inherits data from ancestor elements during post-processing.',
	type: 'object',
	properties: Source.properties
}

function toInputDefinitions(
	defs: Record<string, JSONSchema7>
): Record<string, JSONSchema7> {
	const newDefs: Record<string, JSONSchema7> = {
		...defs,
		SourcePartial: SourcePartial as JSONSchema7
	}
	const toMakeOptional = ['_id', 'source']
	_.forEach(newDefs, (def) => {
		if (def.required != null) {
			if (def.required.includes('source')) {
				if (def.properties == null) throw Error('No properties key found')
				def.properties[SOURCE_PARTIAL_KEY] = { $ref: '#/$defs/SourcePartial' }
			}
			def.required = def.required.filter(
				(str: string) => !toMakeOptional.includes(str)
			)
		}
	})
	return newDefs
}

export const Dataforged: JSONSchema7 = {
	$schema: 'http://json-schema.org/draft-07/schema',
	title: 'Dataforged',
	description:
		'Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.',
	$defs: defsStarforged,
	type: 'object',
	additionalProperties: false,
	patternProperties: {
		[NAMESPACE_KEY]: Namespaces.NamespaceDataforged
	}
}

export const DataforgedInput: JSONSchema7 = {
	$schema: 'http://json-schema.org/draft-07/schema',
	title: 'Dataforged data entry',
	description:
		'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
	$defs: toInputDefinitions(defsStarforged),
	type: Dataforged.type,
	additionalProperties: Dataforged.additionalProperties,
	patternProperties: Dataforged.patternProperties
}

export const Datasworn: JSONSchema7 = {
	$schema: 'http://json-schema.org/draft-07/schema',
	title: 'Datasworn',
	description: Dataforged.description?.replace(
		'Ironsworn: Starforged',
		'Ironsworn'
	),
	$defs: defsClassic,
	type: 'object',
	additionalProperties: Dataforged.additionalProperties,
	patternProperties: {
		[NAMESPACE_KEY]: Namespaces.NamespaceDatasworn
	}
}

export const DataswornInput: JSONSchema7 = {
	$schema: 'http://json-schema.org/draft-07/schema',
	title: DataforgedInput.title?.replace('Dataforged', 'Datasworn'),
	description: DataforgedInput.description?.replace('Dataforged', 'Datasworn'),
	$defs: toInputDefinitions(defsClassic),
	type: Datasworn.type,
	additionalProperties: Datasworn.additionalProperties,
	patternProperties: Datasworn.patternProperties
}
