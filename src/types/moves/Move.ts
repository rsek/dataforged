
import t from 'ts-runtime/lib';
import MdString from "../general/MdString";
import Source from "../general/Source";
import Suggestions from "../general/Suggestions";
import OracleTableId from "../oracles/OracleTableId";
import MoveOutcomes from "./MoveOutcomes";
import MoveTrigger from "./MoveTrigger";
import MoveId from './MoveId';
import IMove from './interfaces/IMove';
import MoveCategory from './MoveCategory';
import buildLog from '../../utilities/buildLog';

export default class Move implements IMove {
  $id: MoveId;
  Name: string;
  Category: MoveCategory;
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
    buildLog(this.constructor, `Building ${this.$id}`);
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


