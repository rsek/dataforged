import { type JSONSchemaType as Schema } from 'ajv'
import { type Metadata, type Encounters as Types } from '@base-types'
import _ from 'lodash'
import { DF_KEY, schemaRef } from './common'

export const EncounterNatureStarforged: Schema<Types.EncounterNatureStarforged> =
	{
		type: 'string',
		examples: ['creature', 'horror', 'human', 'machine', 'monster', 'vehicle']
	}
export const EncounterNatureClassic: Schema<Types.EncounterNatureClassic> = {
	type: 'string',
	examples: ['Ironlander', 'firstborn', 'animal', 'beast', 'horror', 'anomaly']
}

export const EncounterClassicID: Schema<Types.EncounterClassicID> = {
	type: 'string',
	$comment: '{namespace}/encounters/{nature}/{encounter}',
	pattern: /^[a-z0-9][a-z0-9_]+\/encounters(\/[a-z][a-z_]*[a-z]){2}$/.source
}

export const EncounterStarforgedID: Schema<Types.EncounterStarforgedID> = {
	type: 'string',
	$comment: '{namespace}/encounters/{encounter}',
	pattern: /^[a-z0-9][a-z0-9_]+\/encounters(\/[a-z][a-z_]*[a-z]){1}$/.source
}

// FIXME: i should probably just make this game-specific across all things that use it.
export const EncounterID: Schema<Types.EncounterID> = {
	oneOf: [EncounterClassicID, EncounterStarforgedID]
}

export const EncounterClassic: Schema<Types.EncounterClassic> = {
	type: 'object',
	description:
		'An encounter entry similar to those in Chapter 5 of classic Ironsworn.',
	required: [
		'name',
		'nature',
		'rank',
		'features',
		'drives',
		'tactics',
		'description',
		'quest_starter',
		'source',
		'_id'
	],
	properties: {
		name: { $ref: '#/$defs/Label' },
		nature: { $ref: '#/$defs/EncounterNatureClassic' },
		rank: { $ref: '#/$defs/ChallengeRank' },
		features: {
			type: 'array',
			items: { $ref: '#/$defs/MarkdownPhrase' } as any
		},
		drives: { type: 'array', items: { $ref: '#/$defs/MarkdownPhrase' } as any },
		tactics: {
			type: 'array',
			items: { $ref: '#/$defs/MarkdownPhrase' } as any
		},
		description: { $ref: '#/$defs/MarkdownParagraphs' },
		quest_starter: {
			description:
				'A localizable markdown string describing the quest starter associated with this item.',
			$ref: '#/$defs/MarkdownParagraphs'
		},
		your_truths: { $ref: '#/$defs/MarkdownSentences' },
		source: { $ref: '#/$defs/Source' },
		_id: { $ref: '#/$defs/EncounterClassicID' },
		suggestions: schemaRef<Metadata.Suggestions>('Suggestions') 
	}
}

export const EncounterStarforged: Schema<Types.EncounterStarforged> = {
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
		'_id'
	],
	properties: {
		name: EncounterClassic.properties?.name,
		nature: { $ref: '#/$defs/EncounterNatureStarforged' },
		summary: { $ref: '#/$defs/MarkdownSentences' },
		rank: EncounterClassic.properties?.rank,
		features: EncounterClassic.properties?.features,
		drives: EncounterClassic.properties?.drives,
		tactics: EncounterClassic.properties?.tactics,
		variants: {
			title: 'Encounter variants',
			type: 'object',
			// additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/$defs/EncounterVariantStarforged' }
			}
		} as any,
		description: EncounterClassic.properties?.description,
		quest_starter: EncounterClassic.properties?.quest_starter,
		source: EncounterClassic.properties?.source,
		_id: { $ref: '#/$defs/EncounterStarforgedID' },
		suggestions: schemaRef<Metadata.Suggestions>('Suggestions') 
	} as any
}

const SFVariantKeys = ['name', 'nature', 'rank', 'description', 'suggestions']

export const EncounterVariantStarforged: Schema<Types.EncounterVariantStarforged> =
	{
		title: 'Encounter variant (Starforged)',
		type: 'object',
		additionalProperties: false,
		required: SFVariantKeys.filter((item) => item !== 'suggestions') as any,
		properties: _.pick(EncounterStarforged.properties, ...SFVariantKeys) as any
	}
