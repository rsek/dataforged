import { DisplayBuilder, EncounterVariantBuilder, SourceBuilder, TitleBuilder } from "@builders";
import { Game } from "@schema";
import type { ChallengeRank , Display, EncounterNatureStarforged, EncounterStarforged, EncounterTags,  EncounterVariant, Source, Title, YamlEncounterStarforged  } from "@schema";
import { formatId } from "@utils";
import _ from "lodash-es";

/**
 * @internal
 */
export class EncounterStarforgedBuilder implements EncounterStarforged {
  $id: EncounterStarforged["$id"];
  Title: Title;
  Nature: EncounterNatureStarforged;
  Summary: string;
  Tags?: EncounterTags[] | undefined;
  Rank: ChallengeRank;
  Display: Display;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants?: {[key:string]: EncounterVariant} | undefined;
  Description: string;
  "Quest starter": string;
  Source: Source;
  constructor(yaml: YamlEncounterStarforged, ...ancestorSourceJson: Source[]) {
    const game = Game.Starforged;
    const fragment = yaml._idFragment?? yaml.Title.Canonical;
    this.$id = formatId(fragment, game, "Encounters");
    this.Title = new TitleBuilder(yaml.Title, this);
    this.Nature = yaml.Nature;
    this.Summary = yaml.Summary;
    this.Tags = yaml.Tags;
    this.Rank = yaml.Rank;
    this.Display = new DisplayBuilder({ });
    this.Features = yaml.Features;
    this.Drives = yaml.Drives;
    this.Tactics = yaml.Tactics;
    const newSource = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Starforged), ...ancestorSourceJson);
    this.Description = yaml.Description;
    this["Quest starter"] = yaml["Quest starter"];
    this.Source = newSource;
    if (yaml.Variants){
      this.Variants = _.mapValues(yaml.Variants,variant => new EncounterVariantBuilder(variant, this));
    }
  }
}

