import { DisplayBuilder, MoveTriggerBuilder, OutcomesBuilder, SourceBuilder, SourceInheritorBuilder, TitleBuilder } from "@builders";
import type { Asset , AssetAbility, Display, Game, Move, MoveCategory, MoveTrigger, OracleTable, Outcomes, Source, Suggestions, Title, YamlMove, } from "@schema";
import { formatId } from "@utils";
import { buildLog } from "@utils/logging/buildLog.js";
/**
 * Object representing a Starforged move.
 * @internal
 */
export class MoveBuilder extends SourceInheritorBuilder implements Move {
  $id: Move["$id"];
  Title: Title;
  Optional: boolean;
  Category: MoveCategory["$id"];
  Asset?: this["Category"] extends `${Game}/Moves/Assets` ? Asset["$id"] : undefined;
  "Progress move"?: boolean | undefined;
  "Variant of"?: Move["$id"] | undefined;
  Display: Display;
  Trigger: MoveTrigger;
  Text: string;
  Tags?: string[] | undefined;
  Oracles?: OracleTable["$id"][] | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: Outcomes | undefined;
  constructor(yaml: YamlMove, parent: MoveCategory|AssetAbility, game: Game,...sourceAncestors: Source[]) {
    super(yaml.Source ?? SourceBuilder.default(game), ...sourceAncestors);
    this.Category = yaml.Category ?? `${game}/Moves/Assets`;
    const fragment = yaml._idFragment??yaml.Title.Canonical;
    this.$id = yaml.$id ?? formatId(fragment, this.Category);
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new TitleBuilder(yaml.Title, this);
    this.Optional = yaml.Optional ?? false;
    if (this.Category === ("Starforged/Moves/Assets"||"Ironsworn/Moves/Assets")) {
      if (!yaml.Asset) {
        throw new Error("Expected an asset ID");
      }
      this.Asset = yaml.Asset as typeof this.Asset;
    }
    this.Tags = yaml.Tags;
    this["Progress move"] = yaml["Progress move"];
    this["Variant of"] = yaml["Variant of"];

    this.Display = new DisplayBuilder({
      Color: yaml.Display?.Color ?? (parent as MoveCategory).Display?.Color
    });

    this.Trigger = new MoveTriggerBuilder(yaml.Trigger,  this);
    this.Text = yaml.Text;
    this.Oracles = yaml.Oracles;


    this.Outcomes = yaml.Outcomes ? new OutcomesBuilder(yaml.Outcomes, `${this.$id}/Outcomes`) : undefined;
  }
}

