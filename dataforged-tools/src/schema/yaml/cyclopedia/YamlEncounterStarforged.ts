import type { EncounterStarforged, YamlEncounterVariant , YamlStubNode } from "@schema";

/**
 * @internal
 */
export interface YamlEncounterStarforged extends YamlStubNode<EncounterStarforged, "", "Variants"> {
  Variants?: YamlEncounterVariant[] | undefined;
}
