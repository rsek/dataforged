import { type JSONSchema7Object } from 'json-schema'
import { toTemplateSchema } from 'schema-json/templates/common'

export const LocationOraclePartial: JSONSchema7Object = toTemplateSchema(
	{
		table: [
			{ result: 'Planetside' },
			{ result: 'Orbital' },
			{ result: 'Deep Space' }
		]
	},
	'LocationOracle'
)
