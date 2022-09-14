
import { OracleContent , OracleTableDisplay  , Row , RowNullStub  } from "@classes/index.js";
import { OracleBase } from "@classes/oracles/OracleBase.js";
import type { IOracleSet, IOracleTable, IRow } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import { inferSetsAttributes } from "@utils/object_transform/inferSetsAttributes.js";
import type { IOracleTableYaml, IRowYaml, YamlStub } from "@yaml_in/index.js";
import type { IOracleSetYaml } from "@yaml_in/oracles/IOracleSetYaml.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class OracleTable extends OracleBase implements IOracleTable  {
  Display: OracleTableDisplay;
  Content? : OracleContent | undefined;
  "On a Match"?: IOracleTable["On a Match"] | undefined;
  Table: (Row|RowNullStub)[];
  constructor(
    json: IOracleTableYaml,
    parentId: IOracleSet["$id"],
    ...ancestorsJson: IOracleSetYaml[]
    // ancestors should be in ascending order
  ) {
    super(
      json, parentId,
      ...ancestorsJson);
    this.Display = new OracleTableDisplay(json.Display ?? {}, this);
    if (json.Content) {
      this.Content = new OracleContent(json.Content);
    }
    if (json["On a Match"]) {
      this["On a Match"] = { $id: this.$id+"/"+formatIdFragment("On a Match"),...json["On a Match"] };
      ;
    }
    const tableData = (this.yamlData as IOracleTableYaml)?.Table ?? json.Table as IRowYaml[];

    this.Table = tableData.map((row: IRowYaml|YamlStub<IRow>, index) => {
      // TODO: propagate attributes to row objects
      let newRow: Row | RowNullStub;
      if (Array.isArray(row)) {
        if (row[0] === null && row[1] === null) {
          const filteredRow = row.filter(item => typeof item==="string") as string[];
          newRow = new RowNullStub({ Result: filteredRow[0],Summary: filteredRow[1] });
        } else {
          newRow = new Row(this.$id, row);
        }
      } else if (typeof row === "object") {
        if (row.Floor === null && row.Ceiling === null) {
          newRow = new RowNullStub(row);
        } else {
          newRow = new Row(this.$id, row);
        }
      } else { throw new Error(`Unable to infer row type from row at index ${index} of ${this.$id}`);}
      return newRow;
    });

    const attrs = inferSetsAttributes(this.Table);
    if (attrs.length > 0) {
      if (!this.Usage) {
        this.Usage = {};
      }
      if (typeof this.Usage["Sets"] === "undefined") {
        this.Usage["Sets"] = [];
      }
      this.Usage["Sets"] = this.Usage["Sets"].concat(...attrs);
    }
  }
}