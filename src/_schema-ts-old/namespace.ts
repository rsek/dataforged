import { type JSONSchema7 } from 'json-schema'
import { merge } from 'lodash'
import { dfRecordSchema } from './utils'

/**
 * Schemas common to both classic Ironsworn and Starforged.
 */
const NamespaceBase: JSONSchema7 = {
  additionalProperties: false,
  properties: {
    assets: dfRecordSchema('AssetCollection'),
    moves: dfRecordSchema('MoveCollection'),
    oracles: dfRecordSchema('OracleCollection')
  }
}

export const NamespaceClassic: JSONSchema7 = merge(NamespaceBase, {
  properties: {
    _game: { const: 'classic' },
    world_truths: dfRecordSchema('WorldTruthClassic', 'WorldTruthsClassic'),
    encounters: dfRecordSchema('Encounter'),
    regions: dfRecordSchema('RegionEntry', 'Regions'),
    rarities: dfRecordSchema('Rarity', 'Rarities'),
    site_domains: dfRecordSchema('DelveSiteDomain'),
    site_themes: dfRecordSchema('DelveSiteTheme'),
    delve_sites: dfRecordSchema('DelveSite')
  }
})

export const NamespaceStarforged: JSONSchema7 = merge(NamespaceBase, {
  properties: {
    _game: { const: 'starforged' },
    encounters: dfRecordSchema('EncounterStarforged', 'EncountersStarforged'),
    setting_truths: dfRecordSchema('SettingTruthStarforged', 'SettingTruthsStarforged')
  }
})
