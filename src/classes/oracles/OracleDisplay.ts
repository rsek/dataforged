

import _ from "lodash";
import IOracleData from "./IOracle";
import { OracleTableId } from "./OracleId";
import { IOracleInfo } from "./OracleInfo";

export interface ITableFrom {
  "Result columns": OracleTableId[];
  "Roll columns": OracleTableId[];
}

export interface IOracleDisplay {
  Title?: string;
  "Column of"?: OracleTableId;
  "Table from"?: ITableFrom;
  "Column labels"?: string[];
}

export class OracleDisplay implements IOracleDisplay {
  Title: string;
  "Column of"?: OracleTableId;
  "Table from"?: ITableFrom;
  "Column labels"?: string[];
  constructor(json: IOracleData) {
    this.Title = json.Display?.Title ?? json.Name;
  }
}

export class OracleTableDisplay extends OracleDisplay {
  "Column labels": string[] = ["Roll", "Result"];
  "Column of"?: OracleTableId;
  "Table from"?: ITableFrom;
  constructor(json: IOracleInfo) {
    super(json);
    if (json.Display) {
      if (json.Display["Table from"]) {
        if (json.Display["Column labels"]?.length != json.Display["Table from"]["Roll columns"].length + json.Display["Table from"]["Result columns"].length) {
          throw new Error("'Table from' requires the same number in 'Column labels'");
        }
      }
      _.merge(this, json.Display);
    }
  }
}
