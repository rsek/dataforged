import { ResultColumn, RollColumn } from "@classes/index.js";
import type { IDisplayTable, OracleTableId } from "@json_out/index.js";
import { getNameFromId } from "@utils/getNameFromId.js";
import { badJsonError } from "@utils/logging/badJsonError.js";


export class DisplayTable implements IDisplayTable {
  "Result columns": ResultColumn[];
  "Roll columns": RollColumn[];
  constructor(json: Partial<IDisplayTable>, parentId: OracleTableId) {
    if (json["Result columns"]) {
      const resultColData = json["Result columns"];
      if (resultColData.length > 1) {
        resultColData.forEach(col => {
          if (!col.Label) {
            if (!col["Use content from"]) {
              throw badJsonError(this.constructor, json["Result columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
            }
            col.Label = getNameFromId(col["Use content from"]);
          }
        });
      }
      this["Result columns"] = resultColData.map(col => new ResultColumn(col["Use content from"] ?? parentId, col.Label ?? undefined, col.Key ?? "Result"));
    } else {
      this["Result columns"] = [new ResultColumn(parentId)];
    }
    if (json["Roll columns"]) {
      const rollColData = json["Roll columns"];
      if (rollColData.length > 1) {
        rollColData.forEach(col => {
          if (!col.Label) {
            if (!col["Use content from"]) {
              throw badJsonError(this.constructor, json["Roll columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
            }
            col.Label = getNameFromId(col["Use content from"]);
          }
        });
      }
      this["Roll columns"] = rollColData.map(col => new RollColumn(col["Use content from"] ?? parentId, col.Label ?? undefined));
    } else {
      this["Roll columns"] = [new RollColumn(parentId)];
    }
  }
}