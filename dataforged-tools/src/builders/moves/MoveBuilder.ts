import { DisplayBuilder , MoveOutcomesBuilder , MoveTriggerBuilder , SourceInheritorBuilder , TitleBuilder } from "@builders";
import type { AssetBuilder, MoveCategoryBuilder, SuggestionsBuilder } from "@builders";
import type { AssetAbility , Gamespace , Move , MoveCategory, OracleTable, Source, } from "@schema_json";
import { formatId } from "@utils";
import { buildLog } from "@utils/logging/buildLog.js";
import type { YamlMove } from "@schema_yaml";

/**
 * Object representing a Starforged move.
 * @internal
 */
export class MoveBuilder extends SourceInheritorBuilder implements Move {
  $id: Move["$id"];
  Title: TitleBuilder;
  Optional: boolean;
  Category: MoveCategoryBuilder["$id"];
  Asset?: this["Category"] extends `${Gamespace}/Moves/Assets` ? AssetBuilder["$id"] : undefined;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: Move["$id"] | undefined;
  Display: DisplayBuilder;
  Trigger: MoveTriggerBuilder;
  Text: string;
  Tags?: string[] | undefined;
  Oracles?: OracleTable["$id"][] | undefined;
  Suggestions?: SuggestionsBuilder | undefined;
  Outcomes?: MoveOutcomesBuilder | undefined;
  constructor(json: YamlMove, parent: MoveCategory|AssetAbility, gamespace: Gamespace,...sourceAncestors: Source[]) {
    super(json.Source ?? {}, ...sourceAncestors);
    this.Category = json.Category ?? `${gamespace}/Moves/Assets`;
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


    this.Outcomes = json.Outcomes ? new MoveOutcomesBuilder(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
  }
}

