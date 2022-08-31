import { Display } from "@classes/common/Display.js";
import type { Asset, MoveCategory, Suggestions } from "@classes/index.js";
import { MoveOutcomes , MoveTrigger , SourceInheritor , Title } from "@classes/index.js";
import type { Gamespace , IAssetAbility , IMove , IMoveCategory, IOracle, ISource, } from "@json_out/index.js";

import { buildLog } from "@utils/logging/buildLog.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IMoveYaml } from "@yaml_in/moves/IMoveYaml";

/**
 * Object representing a Starforged move.
 * @internal
 */
export class Move extends SourceInheritor implements IMove {
  $id: IMove["$id"];
  Title: Title;
  Optional: boolean;
  Category: MoveCategory["$id"];
  Asset?: this["Category"] extends `${Gamespace}/Moves/Assets` ? Asset["$id"] : undefined;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: IMove["$id"] | undefined;
  Display: Display;
  Trigger: MoveTrigger;
  Text: string;
  Tags?: string[] | undefined;
  Oracles?: IOracle["$id"][] | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: MoveOutcomes | undefined;
  constructor(json: IMoveYaml, parent: IMoveCategory|IAssetAbility, gamespace: Gamespace,...sourceAncestors: ISource[]) {
    super(json.Source ?? {}, ...sourceAncestors);
    this.Category = json.Category ?? `${gamespace}/Moves/Assets`;
    this.$id = json.$id ?? `${this.Category}/${formatIdFragment(json._idFragment??json.Title.Canonical)}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Title = new Title(json.Title, this);
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

    this.Display = new Display({
      Color: json.Display?.Color ?? (parent as IMoveCategory).Display?.Color
    });

    this.Trigger = new MoveTrigger(json.Trigger,  this);
    this.Text = json.Text;
    this.Oracles = json.Oracles;


    this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
  }
}

