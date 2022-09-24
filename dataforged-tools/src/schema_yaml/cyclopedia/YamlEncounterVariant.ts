import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, EncounterVariant } from "@schema_json";
import type { YamlStubNode } from "@schema_yaml";

/**
 * @internal
 */
export interface YamlEncounterVariant extends YamlStubNode<EncounterVariant, "Nature"|"Variant of"> {
  $id?: EncounterVariant["$id"];
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNatureStarforged | undefined;
  Tags?: EncounterTags[] | undefined;
}
