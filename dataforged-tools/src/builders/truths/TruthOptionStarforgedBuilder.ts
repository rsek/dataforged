import { OracleTableRowBuilder } from "@builders";
import type { TruthOptionStarforged , TruthOptionSubtableRowStarforged, YamlTruthOptionStarforged } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class TruthOptionStarforgedBuilder extends OracleTableRowBuilder implements TruthOptionStarforged {
  $id: TruthOptionStarforged["$id"];
  Floor!: TruthOptionStarforged["Floor"];
  Ceiling!: TruthOptionStarforged["Ceiling"];
  Result: string;
  Description: string;
  "Quest starter": string;
  Subtable?: TruthOptionSubtableRowStarforged[] | undefined;
  constructor(parentId: string, yaml: YamlTruthOptionStarforged) {
    super(parentId, yaml);

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
    this.Result = yaml.Result;
    this["Description"] = yaml["Description"];
    this["Quest starter"] = yaml["Quest starter"];
    if (yaml["Roll template"]){
      this["Roll template"] = { ...yaml["Roll template"], $id: formatId("Roll template",this.$id) };
    }
    // if (this.Subtable) {
    //   // what is happening here?
    //   this.Subtable = this.Subtable.map(row => new Row((`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_")), row) as SettingTruthOptionSubtableRow);
    // }
  }
}

