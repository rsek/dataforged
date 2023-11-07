import { type KeywordDefinition } from 'ajv'
import { JsonEnum } from '../../typebox/enum.js'
import { Type } from '@sinclair/typebox'

export const KEYWORDS: Record<string, Omit<KeywordDefinition, 'keyword'>> = {
	releaseStage: {
		metaSchema: JsonEnum(['unstable', 'experimental', 'release'], {
			description:
				"Indicates the release status of this schema.  Non-'release' schema may be stripped from the output.",
			default: 'release'
		})
	},
	i18n: {
		type: 'string',
		metaSchema: Type.Boolean({
			description:
				'Indicates that a string value is localizable, and should be included with internationalization (A.K.A. i18n) data.',
			default: false
		})
	},
	macro: {
		metaSchema: Type.Boolean({
			default: false,
			description:
				'If `true`, this schema is used only to compile the JSON, and is removed from the final output schema.'
		})
	},
	tsType: {
		metaSchema: Type.String({
			description:
				"Overrides the type that's generated from the schema. See https://github.com/bcherny/json-schema-to-typescript"
		})
	},
	isSourcedNode: {
		type: 'object',
		metaSchema: Type.Boolean({})
	},
	inheritFromCollection: {
		type: 'object',
		metaSchema: Type.Array(Type.String(), {
			description:
				'Properties that this object can inherit from its most recent Collection ancestor. Those properties can be omitted for data entry.',
			default: []
		})
	},
	// TODO

	defaultsToValueOf: {
		metaSchema: Type.String({
			description: 'This value defaults to the value of the provided property.'
		})
	},
	rollable: {
		type: 'object',
		metaSchema: Type.Intersect([
			Type.Object({
				tableKey: Type.String({
					description: 'They property key that contains the row objects.'
				})
			}),
			Type.Union([
				Type.Object({
					diceKey: Type.String({ description: '' })
				}),
				Type.Object({
					dice: Type.String({ description: '', format: 'dice_notation' })
				})
			])
		])
	}
}
