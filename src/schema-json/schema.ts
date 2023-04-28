import _ from 'lodash'
import { type JSONSchemaType as Schema } from 'ajv'
import { type Metadata } from '@base-types'
import { Source } from './metadata'
import { type JSONSchema7 } from 'json-schema'
import { Namespaces } from '@schema-json'
import { getClassicDefs, getStarforgedDefs } from 'schema-json/definitions'

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

const defsStarforged = getStarforgedDefs()
const defsClassic = getClassicDefs()

// const $schema = 'https://json-schema.org/draft/2019-09/schema'

function toInputDefinitions(
	defs: Record<string, JSONSchema7>
): Record<string, JSONSchema7> {
	// clone to avoid mutating the original
	const newDefs: Record<string, JSONSchema7> = _.cloneDeep({
		...defs,
		SourcePartial: SourcePartial as JSONSchema7
	})
	const toMakeOptional = ['id', 'source', 'canonical_name']
	_.forEach(newDefs, (def) => {
		if (def.required != null) {
			if (def.required.includes('source')) {
				if (def.properties == null) throw Error('No properties key found')
				def.properties[SOURCE_PARTIAL_KEY] = {
					$ref: '#/definitions/SourcePartial'
				}
			}
			def.required = def.required.filter(
				(str: string) => !toMakeOptional.includes(str)
			)
		}
	})
	return newDefs
}

export const Dataforged: JSONSchema7 = {
	// $schema,
	title: 'Dataforged',
	description:
		'Describes game rules elements compatible with the Ironsworn: Starforged tabletop role-playing game by Shawn Tomkin.',
	definitions: defsStarforged,
	type: 'object',
	additionalProperties: false,
	patternProperties: {
		[NAMESPACE_KEY]: Namespaces.NamespaceDataforged
	}
}

export const DataforgedInput: JSONSchema7 = {
	// $schema,
	title: 'Dataforged data entry',
	description:
		'Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.',
	definitions: toInputDefinitions(defsStarforged),
	type: Dataforged.type,
	additionalProperties: Dataforged.additionalProperties,
	patternProperties: Dataforged.patternProperties
}

export const Datasworn: JSONSchema7 = {
	// $schema,
	title: 'Datasworn',
	description: Dataforged.description?.replace(
		'Ironsworn: Starforged',
		'Ironsworn'
	),
	definitions: defsClassic,
	type: 'object',
	additionalProperties: Dataforged.additionalProperties,
	patternProperties: {
		[NAMESPACE_KEY]: Namespaces.NamespaceDatasworn
	}
}

export const DataswornInput: JSONSchema7 = {
	// $schema,
	title: DataforgedInput.title?.replace('Dataforged', 'Datasworn'),
	description: DataforgedInput.description?.replace('Dataforged', 'Datasworn'),
	definitions: toInputDefinitions(defsClassic),
	type: Datasworn.type,
	additionalProperties: Datasworn.additionalProperties,
	patternProperties: Datasworn.patternProperties
}
