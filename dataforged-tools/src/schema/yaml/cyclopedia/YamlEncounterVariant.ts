import type { ChallengeRank , EncounterNatureStarforged, EncounterTags, EncounterVariant, YamlStubNode } from "@schema";

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
