import { type JSONSchemaType as Schema } from 'ajv'
import type * as Types from '@base-types'
import _ from 'lodash'
import { DICT_KEY, refSchema } from './common'
import { Abstract } from '@schema-json'

export const EncounterNatureStarforged: Schema<Types.Encounters.EncounterNatureStarforged> =
	{
		type: 'string',
		examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle']
	}
export const EncounterNatureClassic: Schema<Types.Encounters.EncounterNatureClassic> =
	{
		type: 'string',
		examples: [
			'Ironlander',
			'firstborn',
			'animal',
			'beast',
			'horror',
			'anomaly'
		]
	}

export const EncounterClassicID: Schema<Types.Encounters.EncounterClassicID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/encounters(\/[a-z_]+){2}$/.source,
	examples: [
		'classic/encounters/firstborn/elf',
		'delve/encounters/anomalies/glimmer'
	]
}

export const EncounterStarforgedID: Schema<Types.Encounters.EncounterStarforgedID> =
	{
		type: 'string',
		pattern: /^[a-z0-9_]{3,}\/encounters\/[a-z_]+(\/variants\/[a-z_]+)?$/
			.source,
		examples: [
			'starforged/encounters/chiton',
			'starforged/encounters/chiton/variants/chiton_drone_pack'
		]
	}

// FIXME: i should probably just make this game-specific across all things that use it.
export const EncounterID: Schema<Types.Encounters.EncounterID> = {
	oneOf: [EncounterClassicID, EncounterStarforgedID]
}

export const EncounterClassic: Schema<Types.Encounters.EncounterClassic> = {
	type: 'object',
	description:
		'An encounter entry, similar to those in Chapter 5 of the Ironsworn Rulebook.',
	required: [
		'name',
		'rank',
		'features',
		'drives',
		'tactics',
		'description',
		'quest_starter',
		'source',
		'id'
	],
	properties: {
		name: refSchema<Types.Localize.Label>('Label'),
		rank: refSchema<Types.Progress.ChallengeRank>('ChallengeRank'),
		features: {
			type: 'array',
			items: refSchema<Types.Localize.MarkdownString>('MarkdownString') as any
		},
		drives: {
			type: 'array',
			items: refSchema<Types.Localize.MarkdownString>('MarkdownString') as any
		},
		tactics: {
			type: 'array',
			items: refSchema<Types.Localize.MarkdownString>('MarkdownString') as any
		},
		description: refSchema<Types.Localize.MarkdownString>('MarkdownString'),
		quest_starter: {
			description:
				'A localizable markdown string describing the quest starter associated with this item.',
			$ref: '#/definitions/MarkdownString'
		},
		your_truths: refSchema<Types.Localize.MarkdownString>('MarkdownString'),
		source: refSchema<Types.Metadata.Source>('Source'),
		id: refSchema<Types.Encounters.EncounterClassicID>('EncounterClassicID'),
		suggestions: refSchema<Types.Metadata.SuggestionsBase>('Suggestions')
	}
}

export const EncounterStarforged: Schema<Types.Encounters.EncounterStarforged> =
	{
		type: 'object',
		description:
			'An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.',
		required: [
			'name',
			'nature',
			'summary',
			'rank',
			'features',
			'drives',
			'tactics',
			'description',
			'quest_starter',
			'source',
			'id'
		],
		properties: {
			name: EncounterClassic.properties?.name,
			nature: { $ref: '#/definitions/EncounterNatureStarforged' },
			summary: { $ref: '#/definitions/MarkdownString' },
			rank: EncounterClassic.properties?.rank,
			features: EncounterClassic.properties?.features,
			drives: EncounterClassic.properties?.drives,
			tactics: EncounterClassic.properties?.tactics,
			variants: {
				title: 'Encounter variants',
				type: 'object',
				// additionalProperties: false,
				patternProperties: {
					[DICT_KEY]: { $ref: '#/definitions/EncounterVariantStarforged' }
				}
			} as any,
			description: EncounterClassic.properties?.description,
			quest_starter: EncounterClassic.properties?.quest_starter,
			source: EncounterClassic.properties?.source,
			id: { $ref: '#/definitions/EncounterStarforgedID' },
			suggestions: refSchema<Types.Metadata.SuggestionsBase>('Suggestions')
		} as any
	}

const SFVariantKeys = ['name', 'nature', 'rank', 'description', 'suggestions']

export const EncounterVariantStarforged: Schema<Types.Encounters.EncounterVariantStarforged> =
	{
		title: 'Encounter variant (Starforged)',
		type: 'object',
		additionalProperties: false,
		required: SFVariantKeys.filter((item) => item !== 'suggestions') as any,
		properties: _.pick(EncounterStarforged.properties, ...SFVariantKeys) as any
	}

export const EncounterCollectionClassic: Schema<Types.Encounters.EncounterCollectionClassic> =
	_.set(
		Abstract.collectionSchema<Types.Encounters.EncounterCollectionClassic>(
			'EncounterClassic',
			'EncounterCollectionClassicID'
		),
		'properties.member_label',
		refSchema('Label')
	)

export const EncounterCollectionClassicID: Schema<Types.Encounters.EncounterCollectionID> =
	{
		type: 'string',
		pattern: /^[a-z0-9_]{3,}\/collections\/encounters(\/[a-z_]+){1}$/.source
	}
