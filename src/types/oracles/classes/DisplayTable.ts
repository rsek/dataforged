

import { is } from "typescript-is";
import badJsonError from "../../../functions/logging/badJsonError";
import { getNameFromId } from "../../../functions/getNameFromId";
import IDisplayTable from "../interfaces/IDisplayTable";
import OracleTableId from "../OracleTableId";
import { ResultColumn, RollColumn } from "./TableColumn";

export default class DisplayTable implements IDisplayTable {
  "Result columns": ResultColumn[];
  "Roll columns": RollColumn[];
  constructor(json: Partial<IDisplayTable>, parentId: OracleTableId) {
    if (json["Result columns"]) {
      const resultColData = json["Result columns"];
      if (resultColData.length > 1) {
        resultColData.forEach(col => {
          if (!col.Label) {
            if (!col.Content) {
              throw badJsonError(this.constructor, json["Result columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
            }
            col.Label = getNameFromId(col.Content);
          }
        });
      }
      this["Result columns"] = resultColData.map(col => new ResultColumn(col.Content ?? parentId, col.Label ?? undefined, col.Key ?? "Result"));
    } else {
      this["Result columns"] = [new ResultColumn(parentId)];
    }
    if (json["Roll columns"]) {
      const rollColData = json["Roll columns"];
      if (rollColData.length > 1) {
        rollColData.forEach(col => {
          if (!col.Label) {
            if (!col.Content) {
              throw badJsonError(this.constructor, json["Roll columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
            }
            col.Label = getNameFromId(col.Content);
          }
        });
      }
      this["Roll columns"] = rollColData.map(col => new RollColumn(col.Content ?? parentId, col.Label ?? undefined));
    } else {
      this["Roll columns"] = [new RollColumn(parentId)];
    }

  }
}