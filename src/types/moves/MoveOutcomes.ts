
import t from 'ts-runtime/lib';
import { IHasId } from '../general/Id';
import IMoveOutcome from './interfaces/IMoveOutcome';
import IMoveOutcomes from './interfaces/IMoveOutcomes';
import MoveOutcome from './MoveOutcome';

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