
import t from 'ts-runtime/lib';
import _ from "lodash";
import { IHasId } from "../general/Id";
import OracleTableRow from "../oracles/classes/OracleTableRow";
import ITruthTableRow from './ITruthTableRow';

export default class TruthTableRow extends OracleTableRow implements ITruthTableRow, Omit<IHasId, "Name"> {
  "Quest Starter": string;
  constructor(parentId: string, json: ITruthTableRow) {
    super(parentId, json);
    if (json.Subtable) {
      json.Subtable = json.Subtable.map(row => new OracleTableRow(`${this.$id} / Subtable`, row));
    }
    this["Quest Starter"] = json["Quest Starter"];
  }
}


