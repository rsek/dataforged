import { IHasId, IWillHaveId } from "../general/Id";
import { MdString } from "../general/MdString";

export interface IMoveOutcomes extends IWillHaveId {
  $id?: string;
  "Strong Hit with a Match"?: IMoveOutcome | undefined;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
  "Miss with a Match"?: IMoveOutcome | undefined;
}

export interface IMoveOutcome extends IWillHaveId {
  $id?: string;
  Text: MdString;
}

export class MoveOutcome implements IMoveOutcome, Omit<IHasId, "Name"> {
  $id: string;
  Text!: string;
  constructor(json: IMoveOutcome, id: string) {
    this.$id = id;
    Object.assign(this, json);
  }
}

export default class MoveOutcomes implements IMoveOutcomes, Omit<IHasId, "Name"> {
  $id: string;
  "Strong Hit with a Match"?: IMoveOutcome | undefined;
  "Strong Hit": IMoveOutcome;
  "Weak Hit": IMoveOutcome;
  "Miss": IMoveOutcome;
  "Miss with a Match"?: IMoveOutcome | undefined;
  constructor(json: IMoveOutcomes, id: string) {
    this.$id = id;
    this["Strong Hit with a Match"] = new MoveOutcome(json["Strong Hit with a Match"] ?? json["Strong Hit"], `${this.$id} / Strong Hit with a Match`);
    this["Miss with a Match"] = new MoveOutcome(json["Miss with a Match"] ?? json["Miss"], `${this.$id} / Miss with a Match`);
    this["Strong Hit"] = new MoveOutcome(json["Strong Hit"],`${this.$id} / Strong Hit`);
    this["Weak Hit"] = new MoveOutcome(json["Weak Hit"],`${this.$id} / Weak Hit`);
    this["Miss"] = new MoveOutcome(json["Miss"],`${this.$id} / Miss`);
  }
}