import type { Suggestions } from "@classes/index.js";
import { MoveOutcomes , MoveTrigger , SourceInheritor } from "@classes/index.js";
import type { AssetId , IDisplay , IMove , IOracle, ISource, MoveCategoryId , MoveId  } from "@json_out/index.js";

import { buildLog } from "@utils/logging/buildLog.js";
import _ from "lodash-es";

/**
 * Object representing a Starforged move.
 * @internal
 */
export class Move extends SourceInheritor implements IMove {
  $id: MoveId;
  Name: string;
  Category: MoveCategoryId;
  Asset?: this["Category"] extends "Moves/Assets" ? AssetId : undefined;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: IMove["$id"] | undefined;
  Display: IDisplay;
  Trigger: MoveTrigger;
  Text: string;
  Oracles?: IOracle["$id"][] | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: MoveOutcomes | undefined;
  constructor(json: IMove, ...sourceAncestors: ISource[]) {
    super(json.Source ?? {}, ...sourceAncestors);
    this.$id = (json.$id ?? `${json.Category}/${json.Name}`).replaceAll(" ", "_") as MoveId;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Category = json.Category;
    if (this.Category === "Moves/Assets") {
      if (!json.Asset) {
        throw new Error("Expected an asset ID");
      }
      this.Asset = json.Asset as typeof this.Asset;
    }
    this["Progress Move"] = json["Progress Move"];
    this["Variant of"] = json["Variant of"];
    const displayStub: IDisplay = { Title: this.Name };
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

