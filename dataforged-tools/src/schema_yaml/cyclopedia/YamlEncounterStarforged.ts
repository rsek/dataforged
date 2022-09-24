import type { EncounterStarforged } from "@schema_json";
import type { YamlEncounterVariant, YamlStubNode } from "@schema_yaml";

/**
 * @internal
 */
export interface YamlEncounterStarforged extends YamlStubNode<EncounterStarforged, "", "Variants"> {
  Variants?: YamlEncounterVariant[] | undefined;
}
