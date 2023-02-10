import { type RulesetClassic } from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'

export const ProgressType: Schema<RulesetClassic.ProgressType> = {
	type: 'string',
	description:
		'Standard progress track types found in Ironsworn or Ironsworn: Delve',
	enum: [
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'journey_progress',
		'delve_progress',
		'bonds_progress'
	]
}
