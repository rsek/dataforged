import { Display } from "@classes/common/Display.js";
import type { EncounterStarforged  } from "@classes/index.js";
import { Source , Title } from "@classes/index.js";
import type { ChallengeRank, EncounterNatureStarforged, EncounterTags, IEncounterStarforged, IEncounterVariant } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { IEncounterVariantYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class EncounterVariant implements IEncounterVariant {
  $id: IEncounterVariant["$id"];
  Source: Source;
  Title: Title;
  Rank: ChallengeRank;
  Display: Display;
  Description: string;
  Nature: EncounterNatureStarforged;
  "Variant of": IEncounterStarforged["$id"];
  Tags?: EncounterTags[] | undefined;
  constructor(json: IEncounterVariantYaml, parent: EncounterStarforged) {
    this.$id = (`${parent.$id}/${formatIdFragment(json._idFragment??json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`);
    this.Source = new Source(parent.Source);
    this.Title = new Title(json.Title, this);
    this.Rank = json.Rank;
    this.Display = new Display(
      {
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
