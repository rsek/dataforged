import type { EncounterClassic, EncounterNatureClassic, NatureKey, YamlStubNode, YamlTitle } from '@schema'

/**
 * @internal
 */
export interface YamlEncounterClassic extends YamlStubNode<EncounterClassic, 'Summary', 'Nature'> {
}

/**
 * @internal
 */
export interface YamlEncounterNature extends YamlStubNode<EncounterNatureClassic, '', 'Encounters'> {
  Title: YamlTitle & {Short: NatureKey}

  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Encounters: {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
    [key: string]: YamlEncounterClassic}
}
