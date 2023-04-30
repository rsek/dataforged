import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import { refSchema } from './common'
import type * as Types from '@base-types'

export const ProgressType: Schema<Types.RulesetClassic.ProgressType> = {
	type: 'string',
	description:
		'Standard progress track types found in Ironsworn or Ironsworn: Delve',
	enum: [
		'combat_progress',
		'vow_progress',
		'scene_challenge_progress',
		'journey_progress',
		'delve_progress',
		'bonds_progress',
		'failure_track'
	]
}

export const SuggestionsBase: Schema<Types.Metadata.SuggestionsBase> = {
	description: 'Related items that can be presented as useful shortcuts.',
	type: 'object',
	additionalProperties: false,
	properties: {
		assets: {
			title: 'Suggested assets',
			type: 'array',
			items: refSchema<Types.Assets.AssetIDWildcard>('AssetIDWildcard'),
			nullable: true
		},
		moves: {
			title: 'Suggested moves',
			type: 'array',
			items: refSchema<Types.Moves.MoveID>('MoveID'),
			nullable: true
		},
		oracles: {
			title: 'Suggested oracle tables',
			type: 'array',
			items: refSchema<Types.Oracles.OracleTableID>('OracleTableID'),
			nullable: true
		}
	}
}

export const Suggestions = _.merge({}, SuggestionsBase, {
	properties: {
		regions: {
			title: 'Suggested regions',
			type: 'array',
			items: refSchema<Types.Regions.RegionEntry>('RegionEntryID')
		},
		encounters: {
			title: 'Suggested encounters',
			type: 'array',
			items:
				refSchema<Types.Encounters.EncounterClassicID>('EncounterClassicID')
		},
		site_themes: {
			title: 'Suggested delve site themes',
			type: 'array',
			items: refSchema<Types.DelveSites.DelveSiteThemeID>('DelveSiteThemeID')
		},
		site_domains: {
			title: 'Suggested delve site domains',
			type: 'array',
			items: refSchema<Types.DelveSites.DelveSiteDomainID>('DelveSiteDomainID')
		}
	}
})

export const WorldTruthID: Schema<Types.Truths.TruthID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/world_truths\/[a-z_]+$/.source,
	examples: ['classic/world_truths/iron']
}
export const WorldTruth: Schema<Types.Truths.WorldTruth> = {
	type: 'object',
	required: ['id', 'name', 'source'],
	properties: {
		id: refSchema<Types.Truths.TruthID>('WorldTruthID'),
		name: refSchema<Types.Localize.Label>('Label'),
		icon: refSchema<Types.Metadata.SvgImageURL>('SvgImageURL'),
		suggestions: refSchema<Types.Metadata.SuggestionsBase>('Suggestions'),
		source: refSchema<Types.Metadata.Source>('Source'),
		options: {
			type: 'array',
			minItems: 3,
			maxItems: 3,
			items: refSchema<Types.Truths.WorldTruthOption>('WorldTruthOption')
		}
	}
}

export const WorldTruthOptionID: Schema<Types.Truths.TruthID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/world_truths\/[a-z_]+\/[0-2]$/.source,
	examples: ['classic/world_truths/iron/0']
}
export const WorldTruthOption: Schema<Types.Truths.WorldTruthOption> = {
	type: 'object',
	required: ['id', 'description', 'quest_starter'],
	properties: {
		id: refSchema<Types.Truths.TruthID>('WorldTruthOptionID'),
		description: refSchema<Types.Localize.MarkdownString>('MarkdownString'),
		quest_starter: refSchema<Types.Localize.MarkdownString>('MarkdownString')
	}
}
