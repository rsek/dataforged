import { DisplayBuilder, MoveTriggerBuilder, OutcomesBuilder, SourceInheritorBuilder, TitleBuilder } from "@builders";
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
  "Progress Move"?: boolean | undefined;
  "Variant of"?: Move["$id"] | undefined;
  Display: Display;
  Trigger: MoveTrigger;
  Text: string;
  Tags?: string[] | undefined;
  Oracles?: OracleTable["$id"][] | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: Outcomes | undefined;
  constructor(json: YamlMove, parent: MoveCategory|AssetAbility, game: Game,...sourceAncestors: Source[]) {
    super(json.Source ?? {}, ...sourceAncestors);
    this.Category = json.Category ?? `${game}/Moves/Assets`;
    const fragment = json._idFragment??json.Title.Canonical;
    this.$id = json.$id ?? formatId(fragment, this.Category);
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new TitleBuilder(json.Title, this);
    this.Optional = json.Optional ?? false;
    if (this.Category === ("Starforged/Moves/Assets"||"Ironsworn/Moves/Assets")) {
      if (!json.Asset) {
        throw new Error("Expected an asset ID");
      }
      this.Asset = json.Asset as typeof this.Asset;
    }
    this.Tags = json.Tags;
    this["Progress Move"] = json["Progress Move"];
    this["Variant of"] = json["Variant of"];

    this.Display = new DisplayBuilder({
      Color: json.Display?.Color ?? (parent as MoveCategory).Display?.Color
    });

    this.Trigger = new MoveTriggerBuilder(json.Trigger,  this);
    this.Text = json.Text;
    this.Oracles = json.Oracles;


    this.Outcomes = json.Outcomes ? new OutcomesBuilder(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
  }
}

