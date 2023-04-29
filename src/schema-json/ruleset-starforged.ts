import type * as Types from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import { refSchema } from './common'
import { SuggestionsBase } from './ruleset-classic'

// export const ConditionMeterAlias: Schema<Types.RulesetStarforged.ConditionMeterAlias> =
// 	{
// 		type: 'string',
// 		description:
// 			'Tags used to group non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.',
// 		enum: [
// 			'companion_health',
// 			'attached_asset_meter',
// 			'vehicle_integrity',
// 			'command_vehicle_integrity',
// 			'support_vehicle_integrity',
// 			'incidental_vehicle_integrity'
// 		]
// 	}

export const ProgressType: Schema<Types.RulesetStarforged.ProgressType> = {
	type: 'string',
	description: 'Standard progress track types found in Ironsworn: Starforged.',
	enum: [
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'expedition_progress',
		'connection_progress',
		'quests_legacy',
		'bonds_legacy',
		'discoveries_legacy'
	]
}

export const Suggestions: Schema<Types.RulesetStarforged.Suggestions> = _.merge(
	{},
	SuggestionsBase,

	{
		properties: {
			encounters: {
				title: 'Suggested encounters',
				type: 'array',
				items: refSchema<Types.Encounters.EncounterClassicID>(
					'EncounterStarforgedID'
				)
			}
		}
	}
) as any

export const SettingTruthID: Schema<Types.Truths.TruthID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/[a-z_]+\/setting_truths\/[a-z_]+$/.source,
	examples: ['starforged/setting_truths/exodus']
}
export const SettingTruth: Schema<Types.Truths.SettingTruth> = {
	type: 'object',
	required: ['id', 'name', 'source'],
	properties: {
		id: refSchema<Types.Truths.TruthID>('SettingTruthID'),
		name: refSchema<Types.Localize.Label>('Label'),
		icon: refSchema<Types.Metadata.SvgImageUrl>('Icon'),
		suggestions: refSchema<Types.Metadata.SuggestionsBase>('Suggestions'),
		source: refSchema<Types.Metadata.Source>('Source'),
		options: {
			type: 'array',
			maxItems: 3,
			minItems: 3,
			items: refSchema<Types.Truths.SettingTruthOption>('SettingTruthOption')
		}
	}
}

export const SettingTruthOptionID: Schema<Types.Truths.TruthID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/[a-z_]+\/setting_truths\/[a-z_]+\/[0-2]$/.source,
	examples: ['starforged/setting_truths/exodus/0']
}
export const SettingTruthOption: Schema<Types.Truths.SettingTruthOption> = {
	type: 'object',
	required: ['id', 'description', 'quest_starter'],
	properties: {
		id: refSchema<Types.Truths.TruthID>('SettingTruthOptionID'),
		summary: refSchema<Types.Localize.MarkdownPhrase>('MarkdownPhrase'),
		description:
			refSchema<Types.Localize.MarkdownParagraphs>('MarkdownParagraphs'),
		quest_starter:
			refSchema<Types.Localize.MarkdownParagraph>('MarkdownParagraph')
	}
}
