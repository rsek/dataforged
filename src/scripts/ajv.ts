import addFormats from 'ajv-formats'
import { log } from './logger.js'
import Ajv from 'ajv'
import { BlankDiceRange, DiceRange } from '../schema/common/abstract.js'
import { Type } from '@sinclair/typebox'
import { JsonEnum } from '../typebox/enum.js'
import { DiceNotation } from '../schema/oracles.js'
import { omit } from 'lodash-es'

// Initialize AJV

const ajv = new Ajv({
	logger: log,
	passContext: true,
	removeAdditional: true,
	strict: 'log',
	strictSchema: 'log',
	strictTypes: 'log',
	useDefaults: true,
	validateFormats: true,
	verbose: true
})
	.addFormat('markdown', true)
	.addFormat('dice_notation', true)
	.addKeyword({
		keyword: 'releaseStage',
		metaSchema: JsonEnum(['unstable', 'experimental', 'release'], {
			description:
				"Indicates the release status of this schema.  Non-'release' schema may be stripped from the output.",
			default: 'release'
		})
	})
	.addKeyword({
		keyword: 'i18n',
		type: 'string',
		metaSchema: Type.Boolean({
			description:
				'Indicates that a string value is localizable, and should be included with internationalization (A.K.A. i18n) data.',
			default: false
		})
	})
	.addKeyword({
		keyword: 'macro',
		metaSchema: Type.Boolean({
			description:
				'Indicates that this schema is used for compiling data, but is not included in the final data output.',
			default: false
		})
	})
	.addKeyword({
		keyword: 'tsType',
		metaSchema: Type.String({
			description:
				"Overrides the type that's generated from the schema. See https://github.com/bcherny/json-schema-to-typescript"
		})
	})
	.addKeyword({
		keyword: 'inheritFromCollection',
		type: 'object',
		metaSchema: Type.Array(Type.String(), {
			description:
				'Properties that this object can inherit from its most recent Collection ancestor. Those properties can be omitted for data entry.',
			default: []
		})
	})
	.addKeyword({
		keyword: 'rollable',
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
	})

addFormats(ajv)

ajv.schemas

export default ajv
