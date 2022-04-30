import type { MoveCategory, Suggestions } from "@classes/index.js";
import { MoveOutcomes , MoveTrigger , SourceInheritor } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetId , IDisplayWithTitle , IMove , IOracle, ISource, } from "@json_out/index.js";

import { buildLog } from "@utils/logging/buildLog.js";
import type { IMoveYaml } from "@yaml_in/moves/IMoveYaml";
import _ from "lodash-es";

/**
 * Object representing a Starforged move.
 * @internal
 */
export class Move extends SourceInheritor implements IMove {
  $id: IMove["$id"];
  Name: string;
  Category: MoveCategory["$id"];
  Asset?: this["Category"] extends `${Gamespace}/Moves/Assets` ? AssetId : undefined;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: IMove["$id"] | undefined;
  Display: IDisplayWithTitle;
  Trigger: MoveTrigger;
  Text: string;
  Oracles?: IOracle["$id"][] | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: MoveOutcomes | undefined;
  constructor(json: IMoveYaml, gamespace: Gamespace,...sourceAncestors: ISource[]) {
    super(json.Source ?? {}, ...sourceAncestors);
    this.$id = json.$id ?? `${json.Category}/${json.Name.replaceAll(" ", "_")}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Category = json.Category;
    if (this.Category === ("Starforged/Moves/Assets"||"Ironsworn/Moves/Assets")) {
      if (!json.Asset) {
        throw new Error("Expected an asset ID");
      }
      this.Asset = json.Asset as typeof this.Asset;
    }
    this["Progress Move"] = json["Progress Move"];
    this["Variant of"] = json["Variant of"];
    const displayStub: IDisplayWithTitle = { Title: this.Name };
    if (json.Display) {
      this.Display = _.merge(displayStub, json.Display);
    } else {
      this.Display = displayStub;
    }
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id}/Trigger`);
    this.Text = json.Text;
    this.Oracles = json.Oracles;
    this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id}/Outcomes`) : undefined;
  }
}

