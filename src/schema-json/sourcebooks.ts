import { dictionarySchema, refSchema } from './common'
import { type Metadata } from '@base-types'
import { type JSONSchema7 } from 'json-schema'
import _ from 'lodash'

const SourcebookBase: JSONSchema7 = {
	title: 'Sourcebook',
	// description: TODO
	type: 'object',
	additionalProperties: false,
	required: ['ruleset', '_source'],
	properties: {
		ruleset: {
			description:
				'The ruleset (Starforged or Classic ironsworn) that these elements are for.'
		},
		_source: {
			...(refSchema<Metadata.Source>('Source') as JSONSchema7),
			description:
				"Source information to be inherited by all eligible descendants. Descendant '_source' properties will override only the properties they specify; use the 'source' property if you'd prefer to replace the entire object."
		},
		oracles: dictionarySchema(refSchema('OracleCollection'), {
			title: 'Oracles'
		}),
		moves: dictionarySchema(refSchema('MoveCategory'), {
			title: 'Moves'
		}),
		assets: dictionarySchema(refSchema('AssetType'), {
			title: 'Assets'
		})
	}
}

export const ClassicSourcebook: JSONSchema7 = _.merge({}, SourcebookBase, {
	title: 'Sourcebook (Ironsworn classic)',
	properties: {
		ruleset: { const: 'classic' },
		encounters: dictionarySchema(refSchema('EncounterCollectionClassic'), {
			title: 'Encounters'
		}),
		world_truths: dictionarySchema(refSchema('WorldTruth'), {
			title: 'World truths'
		}),
		regions: dictionarySchema(refSchema('RegionEntry'), { title: 'Regions' }),
		site_themes: dictionarySchema(refSchema('DelveSiteTheme'), {
			title: 'Delve site themes'
		}),
		site_domains: dictionarySchema(refSchema('DelveSiteDomain'), {
			title: 'Delve site domains'
		}),
		delve_sites: dictionarySchema(refSchema('DelveSite'), {
			title: 'Delve sites'
		}),
		rarities: dictionarySchema(refSchema('Rarity'), {
			title: 'Rarities'
		})
	}
})

export const SourcebookDataforged: JSONSchema7 = _.merge({}, SourcebookBase, {
	title: 'Sourcebook (Ironsworn: Starforged)',
	properties: {
		ruleset: { const: 'starforged' },
		encounters: dictionarySchema(refSchema('EncounterStarforged'), {
			title: 'Encounters'
		}),
		setting_truths: dictionarySchema(refSchema('SettingTruth'), {
			title: 'Setting truths'
		})
	}
})
