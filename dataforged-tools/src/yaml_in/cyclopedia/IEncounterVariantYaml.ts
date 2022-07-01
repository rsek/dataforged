//License: MIT
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterVariant } from "@json_out/index.js";
import type { IEncounterStarforgedYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IEncounterVariantYaml extends Partial<IEncounterStarforgedYaml> {
  $id?: IEncounterVariant["$id"];
  Name: string;
  Rank: ChallengeRank;
  Description: string;
  Nature?: EncounterNatureStarforged | undefined;
  Tags?: EncounterTags[] | undefined;
}
