import { DisplayBuilder, SourceBuilder, TitleBuilder } from "@builders";
import type { ChallengeRank , Display, EncounterNatureStarforged, EncounterStarforged, EncounterTags, EncounterVariant, Source, Title, YamlEncounterVariant } from "@schema";
import { formatId } from "@utils";


/**
 * @internal
 */
export class EncounterVariantBuilder implements EncounterVariant {
  $id: EncounterVariant["$id"];
  Source: Source;
  Title: Title;
  Rank: ChallengeRank;
  Display: Display;
  Description: string;
  Nature: EncounterNatureStarforged;
  "Variant of": EncounterStarforged["$id"];
  Tags?: EncounterTags[] | undefined;
  constructor(json: YamlEncounterVariant, parent: EncounterStarforged) {
    const fragment = json._idFragment??json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment, parent.$id);
    this.Source = new SourceBuilder(parent.Source);
    this.Title = new TitleBuilder(json.Title, this);
    this.Rank = json.Rank;
    this.Display = new DisplayBuilder(
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
