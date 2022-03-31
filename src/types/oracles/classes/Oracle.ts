import jsonpath from "jsonpath";
import _ from "lodash-es";
import buildOracleId from "../../../functions/buildOracleId";
import buildLog from "../../../functions/logging/buildLog";
import inferSetsAttributes from "../../../functions/object-transform/inferSetsAttributes";
import propagateToChildren from "../../../functions/object-transform/propagateToChildren";
import templateOracle from "../../../functions/object-transform/templateOracle";
import templateOracleTable from "../../../functions/object-transform/templateOracleTable";
import IAttribute, { AttributeKey } from "../../gameObjects/IAttribute";
import Source from "../../general/Source";
import IOracleBase from "../interfaces/IOracleBase";
import ITableDisplay from "../interfaces/IOracleDisplay";
import IOracleCategoryYaml from "../interfaces/yaml/IOracleCategoryYaml";
import IOracleYaml from "../interfaces/yaml/IOracleYaml";
import IRowYaml from "../interfaces/yaml/IRowYaml";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import OracleContent from "./OracleContent";
import OracleDisplay from "./OracleDisplay";
import OracleUsage from "./OracleUsage";
import Row from "./Row";


export default class Oracle implements IOracleBase {
  $id: OracleTableId;
  "Name": string;
  Aliases?: string[] | undefined;
  "Member of"?: OracleTableId | undefined;
  Category: OracleCategoryId;
  Description?: string | undefined;
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
        return new Oracle(oracleInfo, this.Category, this.$id, jsonClone, ...ancestorsJson)
      });
    }
    if (this.Table) {
      const attrs = inferSetsAttributes(this.Table);
      if (attrs.length > 0) {
        if (!this.Usage) {
          this.Usage = {};
        }
        if (typeof this.Usage["Sets attributes"] == "undefined") {
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
