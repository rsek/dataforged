
import t from 'ts-runtime/lib';
import { IHasId, IWillHaveId } from "../general/Id";
import { MdString } from "../general/MdString";

export interface IMoveOutcomes extends IWillHaveId {
  $id?: string;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
}

export interface IMoveOutcome extends IWillHaveId {
  $id?: string;
  Text: MdString;
  "With a Match"?: IMoveOutcome | undefined;
}

export class MoveOutcome implements IMoveOutcome, Omit<IHasId, "Name"> {
  $id: string;
  Text: MdString;
  "With a Match"?: MoveOutcome | undefined;
  constructor(json: IMoveOutcome, id: string) {
    this.$id = id;
    this.Text = json.Text;
    if (json["With a Match"]) {
      this["With a Match"] = new MoveOutcome(json["With a Match"], `${this.$id} / With a Match`);
    }
  }
}

export default class MoveOutcomes implements IMoveOutcomes, Omit<IHasId, "Name"> {
  $id: string;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
  constructor(json: IMoveOutcomes, id: string) {
    this.$id = id;
    this["Strong Hit"] = new MoveOutcome(json["Strong Hit"], `${this.$id} / Strong Hit`);
    this["Weak Hit"] = new MoveOutcome(json["Weak Hit"], `${this.$id} / Weak Hit`);
    this["Miss"] = new MoveOutcome(json["Miss"], `${this.$id} / Miss`);
  }
}