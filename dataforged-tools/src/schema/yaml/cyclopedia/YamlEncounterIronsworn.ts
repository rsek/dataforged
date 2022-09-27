import type { EncounterClassic, EncounterNatureClassicInfo , NatureKey, YamlStubNode, YamlTitle } from "@schema";

/**
 * @internal
 */
export interface YamlEncounterClassic extends YamlStubNode<EncounterClassic, "Summary", "Nature"> {
}

/**
 * @internal
 */
export interface YamlEncounterNatureInfo extends YamlStubNode<EncounterNatureClassicInfo, "", "Encounters"> {
  Title: YamlTitle & {Short: NatureKey}

  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Encounters: {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
    [key:string]: YamlEncounterClassic};
}