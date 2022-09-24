import { DisplayBuilder , EncounterVariantBuilder , SourceBuilder , TitleBuilder } from "@builders";
import { Gamespace } from "@schema_json";
import type { ChallengeRank, EncounterNatureStarforged, EncounterStarforged, EncounterTags,  Source } from "@schema_json";
import type { YamlEncounterStarforged } from "@schema_yaml";
import { formatId } from "@utils/formatId.js";

/**
 * @internal
 */
export class EncounterStarforgedBuilder implements EncounterStarforged {
  $id: EncounterStarforged["$id"];
  Title: TitleBuilder;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: DisplayBuilder;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: EncounterVariantBuilder[] | undefined;
  Description: string;
  "Quest Starter": string;
  Source: SourceBuilder;
  constructor(json: YamlEncounterStarforged, ...ancestorSourceJson: Source[]) {
    const gamespace = Gamespace.Starforged;
    const fragment = json._idFragment?? json.Title.Canonical;
    this.$id = formatId(fragment, gamespace, "Encounters");
    this.Title = new TitleBuilder(json.Title, this);
    this.Nature = json.Nature;
    this.Summary = json.Summary;
    this.Tags = json.Tags;
    this.Rank = json.Rank;
    this.Display = new DisplayBuilder({ });
    this.Features = json.Features;
    this.Drives = json.Drives;
    this.Tactics = json.Tactics;
    const newSource = new SourceBuilder(json.Source ?? {}, ...ancestorSourceJson);
    this.Description = json.Description;
    this["Quest Starter"] = json["Quest Starter"];
    this.Source = newSource;
    if (json.Variants){
      this.Variants = json.Variants.map(variant => new EncounterVariantBuilder(variant, this));
    }
  }
}

