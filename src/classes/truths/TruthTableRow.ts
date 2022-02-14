import _ from "lodash";
import { IHasId, IWillHaveId } from "../general/Id";
import { IOracleTableRow, OracleTableRow } from "../oracles/OracleTableRow";

export class TruthTableRow extends OracleTableRow implements ITruthTableRow, Omit<IHasId, "Name"> {
  "Quest Starter": string;
  constructor(parentId: string, json: ITruthTableRow) {
    let jsonContent = _.omit(json, "Floor", "Ceiling");
    // console.info("jsonContent", jsonContent);

    super(parentId, json.Floor, json.Ceiling, jsonContent);
    if (json.Subtable) {
      json.Subtable = json.Subtable.map(row => {
        let rowContent = _.omit(row, "Floor", "Ceiling");
        // console.info("rowContent", rowContent);
        return new OracleTableRow(`${this.$id} / Subtable`, row.Floor, row.Ceiling, rowContent)
      });
    }
    Object.assign(this, json);
  }
}

export interface ITruthTableRow extends Omit<IOracleTableRow, "$id">, IWillHaveId {
  "Quest Starter": string;
}
