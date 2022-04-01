

import type IMove from "./interfaces/IMove.js";
import type MoveCategoryName from "./MoveCategoryName.js";
import type MoveId from "./MoveId.js";
import MoveOutcomes from "./MoveOutcomes.js";
import MoveTrigger from "./MoveTrigger.js";
import buildLog from "../../functions/logging/buildLog.js";
import type MdString from "../general/MdString.js";
import type Source from "../general/Source.js";
import type Suggestions from "../general/Suggestions.js";
import type OracleTableId from "../oracles/OracleTableId.js";

export default class Move implements IMove {
  $id: MoveId;
  Name: string;
  Category: MoveCategoryName;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: MoveId | undefined;
  Trigger: MoveTrigger;
  Text: MdString;
  Oracles?: OracleTableId[] | undefined;
  Source?: Source | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: MoveOutcomes | undefined;
  constructor(json: IMove, id?: MoveId) {
    this.$id = id ?? `Moves / ${json.Name}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Category = json.Category;
    this["Progress Move"] = json["Progress Move"];
    this["Variant of"] = json["Variant of"];
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    this.Text = json.Text;
    this.Oracles = json.Oracles;
    this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id} / Outcomes`) : undefined;
    // this.Source = json.Source ? new Source(json.Source);
  }
}

