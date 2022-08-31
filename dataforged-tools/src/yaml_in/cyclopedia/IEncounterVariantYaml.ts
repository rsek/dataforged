import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterVariant } from "@json_out/index.js";
import type { YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterVariantYaml extends YamlStubTitle<IEncounterVariant, "Nature"|"Variant of"> {
  $id?: IEncounterVariant["$id"];
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNatureStarforged | undefined;
  Tags?: EncounterTags[] | undefined;

}
