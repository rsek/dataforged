import { OracleTableRowBuilder } from "@builders";
import type { TruthOption, TruthOptionSubtableRow } from "@schema_json";
import type { YamlTruthOption } from "@schema_yaml";

/**
 * @internal
 */
export class TruthOptionBuilder extends OracleTableRowBuilder implements TruthOption {
  $id: TruthOption["$id"];
  Floor!: TruthOption["Floor"];
  Ceiling!: TruthOption["Ceiling"];
  Result: string;
  Description: string;
  "Quest Starter": string;
  Subtable?: TruthOptionSubtableRow[] | undefined;
  constructor(parentId: string, json: YamlTruthOption) {
    super(parentId, json);

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
    if (json["Roll template"]){
      this["Roll template"] = { ...json["Roll template"], $id: `${this.$id}/Roll_template` };
    }
    // if (this.Subtable) {
    //   // what is happening here?
    //   this.Subtable = this.Subtable.map(row => new Row((`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_")), row) as SettingTruthOptionSubtableRow);
    // }
  }
}

