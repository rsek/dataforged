import { DF_KEY, schemaRef } from './common'
import { type Metadata } from '@base-types'
import { type JSONSchema7 } from 'json-schema'
import _ from 'lodash'

const NamespaceShared: JSONSchema7 = {
	title: 'Namespace',
	// description: TODO
	type: 'object',
	additionalProperties: false,
	required: ['_ruleset', '_source'],
	properties: {
		_ruleset: {
			description:
				'The ruleset (Starforged or Classic ironsworn) that these elements are for.'
		},
		_source: {
			...(schemaRef<Metadata.Source>('Source') as JSONSchema7),
			description:
				"Source information to be inherited by all eligible descendants. Descendant '_source' properties will override only the properties they specify; use the 'source' property if you'd prefer to replace the entire object."
		},
		oracles: {
			title: 'Oracles',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: {
					oneOf: [
						{ $ref: '#/definitions/OracleCollection' },
						{ $ref: '#/definitions/OracleCollectionExtension' }
					]
				}
			}
		},
		moves: {
			title: 'Moves',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: {
					oneOf: [
						{ $ref: '#/definitions/MoveCategory' },
						{ $ref: '#/definitions/MoveCategoryExtension' }
					]
				}
			}
		},
		assets: {
			title: 'Assets',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: {
					oneOf: [
						{ $ref: '#/definitions/AssetType' },
						{ $ref: '#/definitions/AssetTypeExtension' }
					]
				}
			}
		}
	}
}

export const NamespaceDatasworn: JSONSchema7 = _.merge({}, NamespaceShared, {
	properties: {
		_ruleset: { const: 'classic' },
		encounters: {
			title: 'Encounters',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: {
					oneOf: [
						{ $ref: '#/definitions/EncounterCollectionClassic' },
						{ $ref: '#/definitions/EncounterCollectionExtensionClassic' }
					]
				}
			}
		},
		world_truths: {
			title: 'World truths',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/WorldTruth' }
			}
		},
		regions: {
			title: 'Regions',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/RegionEntry' }
			}
		},
		site_themes: {
			title: 'Delve site themes',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/DelveSiteTheme' }
			}
		},
		site_domains: {
			title: 'Delve site domains',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/DelveSiteDomain' }
			}
		},
		delve_sites: {
			title: 'Delve sites',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/DelveSite' }
			}
		},
		rarities: {
			title: 'Rarities',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/Rarity' }
			}
		}
	}
})

export const NamespaceDataforged: JSONSchema7 = _.merge({}, NamespaceShared, {
	properties: {
		_ruleset: { const: 'starforged' },
		encounters: {
			title: 'Encounters',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/EncounterStarforged' }
			}
		},
		setting_truths: {
			title: 'Setting truths',
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[DF_KEY]: { $ref: '#/definitions/SettingTruth' }
			}
		}
	}
})
