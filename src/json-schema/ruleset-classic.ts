import {
	type Metadata,
	type Assets,
	type DelveSites,
	type Encounters,
	type Moves,
	type Oracles,
	type Regions,
	type RulesetClassic as Types
} from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import { schemaRef } from './common'

export const ConditionMeterAlias: Schema<Types.ConditionMeterAlias> = {
	type: 'string',
	description:
		'Tags used to group  non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.',
	enum: ['companion_health', 'attached_asset_meter']
}

export const ProgressType: Schema<Types.ProgressType> = {
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

export const SuggestionsBase: Schema<Metadata.SuggestionsBase> = {
	description: 'Related items that can be presented as useful shortcuts.',
	type: 'object',
	additionalProperties: false,
	properties: {
		assets: {
			title: 'Suggested assets',
			type: 'array',
			items: schemaRef<Assets.AssetID>('AssetID'),
			nullable: true
		},
		moves: {
			title: 'Suggested moves',
			type: 'array',
			items: schemaRef<Moves.MoveID>('MoveID'),
			nullable: true
		},
		oracles: {
			title: 'Suggested oracle tables',
			type: 'array',
			items: schemaRef<Oracles.OracleTableID>('OracleTableID'),
			nullable: true
		}
	}
}

export const Suggestions = _.merge({}, SuggestionsBase, {
	properties: {
		regions: {
			title: 'Suggested regions',
			type: 'array',
			items: schemaRef<Regions.RegionEntry>('RegionEntryID')
		},
		encounters: {
			title: 'Suggested encounters',
			type: 'array',
			items: schemaRef<Encounters.EncounterClassicID>('EncounterClassicID')
		},
		site_themes: {
			title: 'Suggested delve site themes',
			type: 'array',
			items: schemaRef<DelveSites.DelveSiteThemeID>('DelveSiteThemeID')
		},
		site_domains: {
			title: 'Suggested delve site domains',
			type: 'array',
			items: schemaRef<DelveSites.DelveSiteDomainID>('DelveSiteDomainID')
		}
	}
})
