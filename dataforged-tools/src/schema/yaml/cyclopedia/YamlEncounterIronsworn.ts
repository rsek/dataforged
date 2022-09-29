import type { EncounterClassic, EncounterNatureClassic, EncounterNatureTypeClassic, YamlStubNode, YamlTitle } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export interface YamlEncounterClassic extends YamlStubNode<EncounterClassic, 'summary', 'nature'> {
}

/**
 * @internal
 */
export interface YamlEncounterNatureClassic extends YamlStubNode<EncounterNatureClassic, '', 'encounters'> {
  title: YamlTitle & { short: keyof typeof EncounterNatureTypeClassic }
  encounters: {
    [key: SnakeCaseString]: YamlEncounterClassic
  }
}
