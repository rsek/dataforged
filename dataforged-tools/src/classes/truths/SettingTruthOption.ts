import { Row } from "@classes/index.js";
import type { ISettingTruthOption, ISettingTruthOptionSubtableRow } from "@json_out/index.js";

/**
 * @internal
 */
export class SettingTruthOption implements ISettingTruthOption {
  $id: ISettingTruthOption["$id"];
  Floor: ISettingTruthOption["Floor"];
  Ceiling: ISettingTruthOption["Ceiling"];
  Result: string;
  Description: string;
  "Quest Starter": string;
  Subtable?: ISettingTruthOptionSubtableRow[]  | undefined;
  constructor(parentId: string, json: ISettingTruthOption) {
    this.Floor = json.Floor;
    this.Ceiling = json.Ceiling;
    let rangeString: string;
    if (this.Floor === null && this.Ceiling === null) {
      throw new Error();
    } else {
      if (this.Floor === null || this.Ceiling === null) {
        throw new Error();
      }
      rangeString = this.Floor === this.Ceiling ? `${this.Ceiling}` : `${this.Floor}-${this.Ceiling}`;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$id = `${parentId}/${rangeString}`;
    }
    this.Result = json.Result;
    this["Description"] = json["Description"];
    this["Quest Starter"] = json["Quest Starter"];
    if (this.Subtable) {
      // what is happening here?
      this.Subtable = this.Subtable.map(row => new Row((`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_")), row) as ISettingTruthOptionSubtableRow);
      this.Subtable.forEach(row => (row as Row).validateRollTemplate());
    }
  }
}

