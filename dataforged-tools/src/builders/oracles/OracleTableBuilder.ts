
import { OracleBuilder , OracleContentBuilder  , OracleTableDisplayBuilder , OracleTableRowBuilder  , RowNullStubBuilder } from "@builders";
import type { OracleContent, OracleSet, OracleTable, OracleTableDisplay, OracleTableRow, RowNullStub } from "@schema_json";
import type { YamlOracleSet, YamlOracleTable, YamlSimpleTableRow , YamlStub } from "@schema_yaml";
import { formatId } from "@utils";
import { inferSetsAttributes } from "@utils/object_transform/inferSetsAttributes.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class OracleTableBuilder extends OracleBuilder implements OracleTable  {
  Display: OracleTableDisplay;
  Content? : OracleContent | undefined;
  "On a Match"?: OracleTable["On a Match"] | undefined;
  Table: (OracleTableRow|RowNullStub)[];
  constructor(
    json: YamlOracleTable,
    parentId: OracleSet["$id"],
    ...ancestorsJson: YamlOracleSet[]
    // ancestors should be in ascending order
  ) {
    super(
      json, parentId,
      ...ancestorsJson);
    this.Display = new OracleTableDisplayBuilder(json.Display ?? {}, this);
    if (json.Content) {
      this.Content = new OracleContentBuilder(json.Content);
    }
    if (json["On a Match"]) {
      this["On a Match"] = { $id: formatId( "On a Match",this.$id),...json["On a Match"] };
      ;
    }
    const tableData = (this.yamlData as YamlOracleTable)?.Table ?? json.Table as YamlSimpleTableRow[];

    this.Table = tableData.map((row: YamlSimpleTableRow|YamlStub<OracleTableRow>, index) => {
      // TODO: propagate attributes to row objects
      let newRow: OracleTableRowBuilder | RowNullStubBuilder;
      if (Array.isArray(row)) {
        if (row[0] === null && row[1] === null) {
          const filteredRow = row.filter(item => typeof item==="string") as string[];
          newRow = new RowNullStubBuilder({ Result: filteredRow[0],Summary: filteredRow[1] });
        } else {
          newRow = new OracleTableRowBuilder(this.$id, row);
        }
      } else if (typeof row === "object") {
        if (row.Floor === null && row.Ceiling === null) {
          newRow = new RowNullStubBuilder(row);
        } else {
          newRow = new OracleTableRowBuilder(this.$id, row);
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