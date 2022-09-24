import type { EncounterClassic , EncounterNatureClassicInfo, NatureKey } from "@schema_json";
import type { YamlStubNode, YamlTitle } from "@schema_yaml";

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
  Encounters: {[key:string]: YamlEncounterClassic};
}