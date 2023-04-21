import { DisplayWithTitle } from "@classes/common/Display.js";
import { Source } from "@classes/index.js";
import type { EncounterStarforged  } from "@classes/index.js";
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterStarforged, IEncounterVariant } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterVariant implements IEncounterVariant {
  $id: IEncounterVariant["$id"];
  Source: Source;
  Name: string;
  Rank: ChallengeRank;
  Display: DisplayWithTitle;
  Description: string;
  Nature: EncounterNatureStarforged;
  "Variant of": IEncounterStarforged["$id"];
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, parent: EncounterStarforged) {
    this.$id = (`${parent.$id}/${formatIdFragment(json.Name)}`);
    this.Source = new Source(parent.Source);
    this.Name = json.Name;
    this.Rank = json.Rank;
    this.Display = new DisplayWithTitle(
      {
        Title: json.Display?.Title ?? this.Name,
        Icon: json.Display?.Icon,
        Images: json.Display?.Images,
        Color: json.Display?.Color
      }
    );
    this.Description = json.Description;
    this.Nature = json.Nature ?? parent.Nature;
    this["Variant of"] = parent.$id;
    this.Tags = json.Tags;
  }
}
