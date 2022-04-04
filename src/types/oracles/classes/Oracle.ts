import _ from "lodash-es";
import OracleContent from "./OracleContent.js";
import OracleDisplay from "./OracleDisplay.js";
import OracleUsage from "./OracleUsage.js";
import Row from "./Row.js";
import buildOracleId from "../../../functions/buildOracleId.js";
import buildLog from "../../../functions/logging/buildLog.js";
import inferSetsAttributes from "../../../functions/object-transform/inferSetsAttributes.js";
import propagateToChildren from "../../../functions/object-transform/propagateToChildren.js";
import templateOracle from "../../../functions/object-transform/templateOracle.js";
import templateOracleTable from "../../../functions/object-transform/templateOracleTable.js";
import type { AttributeKey } from "../../gameObjects/IAttribute.js";
import type IAttribute from "../../gameObjects/IAttribute.js";
import type MdString from "../../general/MdString.js";
import Source from "../../general/Source.js";
import type IOracleBase from "../interfaces/IOracleBase.js";
import type ITableDisplay from "../interfaces/IOracleDisplay.js";
import type IOracleCategoryYaml from "../interfaces/yaml/IOracleCategoryYaml.js";
import type IOracleYaml from "../interfaces/yaml/IOracleYaml.js";
import type IRowYaml from "../interfaces/yaml/IRowYaml.js";
import type OracleCategoryId from "../OracleCategoryId.js";
import type OracleTableId from "../OracleTableId.js";

export default class Oracle implements IOracleBase {
  $id: OracleTableId;
  "Name": string;
  Aliases?: string[] | undefined;
  "Member of"?: OracleTableId | undefined;
  Category: OracleCategoryId;
  Description?: MdString | undefined;
  Source: Source;
  Display: OracleDisplay;
  Usage?: OracleUsage | undefined;
  Content?: OracleContent | undefined;
  Table?: Row[] | undefined;
  Oracles?: Oracle[] | undefined;
  constructor(
    json: IOracleYaml,
    category: OracleCategoryId,
    memberOf?: OracleTableId,
    ...ancestorsJson: (IOracleYaml | IOracleCategoryYaml)[]
    // ancestors should be in ascending order
  ) {
    let jsonClone = _.cloneDeep(json);
    if (jsonClone._templateInfo) {
      jsonClone = templateOracle<IOracleYaml>(jsonClone, jsonClone._templateInfo);
    }
    // if (!is<IOracleInfoData>(json)) {
    //   throw new Error("json does not conform to IOracleInfoData!");
    // }
    this.$id = buildOracleId(jsonClone, ...ancestorsJson) as OracleTableId;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = jsonClone.Name;
    this.Aliases = jsonClone.Aliases;
    this["Member of"] = memberOf ?? undefined;
    this.Category = category;

    this.Description = jsonClone.Description;
    this.Source = new Source(jsonClone.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Display = new OracleDisplay((jsonClone.Display ?? {}) as Partial<ITableDisplay>, this.Name, this.$id);
    if (jsonClone.Usage) {
      this.Usage = new OracleUsage(jsonClone.Usage);
    }
    if (jsonClone.Content) {
      this.Content = new OracleContent(jsonClone.Content);
    }
    let tableData;
    if (jsonClone._templateTable) {
      tableData = templateOracleTable(jsonClone._templateTable);
    } else {
      tableData = jsonClone.Table as IRowYaml[];
    }
    if (tableData) {
      this.Table = tableData.map(row => {
        // TODO: propagate attributes to row objects
        return new Row(this.$id, row);
      });
    }
    if (jsonClone.Oracles) {
      this.Oracles = jsonClone.Oracles.map(oracleInfo => {
        if (jsonClone.Usage) {
          propagateToChildren(jsonClone.Usage, "Usage", oracleInfo);
        }
        if (jsonClone.Content) {
          propagateToChildren(jsonClone.Content, "Content", oracleInfo);
        }
        return new Oracle(oracleInfo, this.Category, this.$id, jsonClone, ...ancestorsJson);
      });
    }
    if (this.Table) {
      const attrs = inferSetsAttributes(this.Table);
      if (attrs.length > 0) {
        if (!this.Usage) {
          this.Usage = {};
        }
        if (typeof this.Usage["Sets attributes"] === "undefined") {
          this.Usage["Sets attributes"] = [];
        }
        // console.log("attrs", attrs);
        this.Usage["Sets attributes"] = this.Usage["Sets attributes"].concat(...attrs);
      }
    }
    if (this.Oracles) {
      const keys = new Set<AttributeKey>();
      if (!this.Usage) {
        this.Usage = {};
      }
      if (this.Usage?.["Sets attributes"]) {
        this.Usage["Sets attributes"].map(item => item.Key).forEach(key => keys.add(key));
      }
      this.Oracles.forEach(oracle => {
        if (oracle.Usage?.["Sets attributes"]) {
          oracle.Usage["Sets attributes"].map(item => item.Key).forEach(key => keys.add(key));
        }
      });
      if (keys.size > 0) {
        this.Usage["Sets attributes"] = Array.from(keys).map(Key => { return { Key } as IAttribute; });
      }
    }
  }
}
