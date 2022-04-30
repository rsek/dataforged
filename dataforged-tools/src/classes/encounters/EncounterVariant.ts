import { Source } from "@classes/index.js";
import type { EncounterStarforged  } from "@classes/index.js";
import type { ChallengeRank, EncounterIdStarforged, EncounterNatureStarforged, EncounterTags, IDisplayWithTitle, IEncounterStarforged, IEncounterVariant } from "@json_out/index.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterVariant implements IEncounterVariant {
  $id: IEncounterVariant["$id"];
  Source: Source;
  Name: string;
  Rank: ChallengeRank;
  Display: IDisplayWithTitle;
  Description: string;
  Nature: EncounterNatureStarforged;
  "Variant of": IEncounterStarforged["$id"];
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, parent: EncounterStarforged) {
    this.$id = (`${parent.$id}/${json.Name.replaceAll(" ", "_")}`);
    this.Source = new Source(parent.Source);
    this.Name = json.Name;
    this.Rank = json.Rank;
    this.Display = json.Display ?? { Title: this.Name };
    if (!this.Display.Title) {
      this.Display.Title = this.Name;
    }
    this.Description = json.Description;
    this.Nature = json.Nature ?? parent.Nature;
    this["Variant of"] = parent.$id;
    this.Tags = json.Tags;
  }
}
