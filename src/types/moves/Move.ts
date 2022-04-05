import _ from "lodash-es";
import type IMove from "./interfaces/IMove.js";
import type MoveCategoryId from "./MoveCategoryId.js";
import type MoveId from "./MoveId.js";
import MoveOutcomes from "./MoveOutcomes.js";
import MoveTrigger from "./MoveTrigger.js";
import buildLog from "../../functions/logging/buildLog.js";
import type AssetId from "../assets/AssetId.js";
import type IDisplay from "../general/IDisplay.js";
import type Source from "../general/Source.js";
import type { ParagraphsString } from "../general/StringTypes.js";
import type Suggestions from "../general/Suggestions.js";
import type OracleTableId from "../oracles/OracleTableId.js";

/**
 * Object representing a Starforged move.
 * @date 4/4/2022 - 10:13:30 PM
 *
 * @export
 * @class Move
 * @typedef {Move}
 * @implements {IMove}
 */
export default class Move implements IMove {
  /**
   * @date 4/4/2022 - 11:17:49 PM
   *
   * @type {MoveId}
   */
  $id: MoveId;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {string}
   */
  Name: string;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {MoveCategoryId}
   */
  Category: MoveCategoryId;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?this["Category"] extends "Moves / Assets" ? AssetId : undefined}
   */
  Asset?: this["Category"] extends "Moves / Assets" ? AssetId : undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(boolean | undefined)}
   */
  "Progress Move"?: boolean | undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(MoveId | undefined)}
   */
  "Variant of"?: MoveId | undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {IDisplay}
   */
  Display: IDisplay;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {MoveTrigger}
   */
  Trigger: MoveTrigger;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {ParagraphsString}
   */
  Text: ParagraphsString;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  Oracles?: OracleTableId[] | undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(Source | undefined)}
   */
  Source?: Source | undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(Suggestions | undefined)}
   */
  Suggestions?: Suggestions | undefined;
  /**
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @type {?(MoveOutcomes | undefined)}
   */
  Outcomes?: MoveOutcomes | undefined;
  /**
   * Creates an instance of Move.
   * @date 4/4/2022 - 10:13:30 PM
   *
   * @constructor
   * @param {IMove} json
   */
  constructor(json: IMove) {
    this.$id = json.$id ?? `${json.Category} / ${json.Name}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    this.Category = json.Category;
    if (this.Category === "Moves / Assets") {
      if (!json.Asset) {
        throw new Error();
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
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    this.Text = json.Text;
    this.Oracles = json.Oracles;
    this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id} / Outcomes`) : undefined;
    // this.Source = json.Source ? new Source(json.Source);
  }
}

