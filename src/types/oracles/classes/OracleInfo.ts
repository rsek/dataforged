import t from 'ts-runtime/lib';

import { is } from "typescript-is";
import _, { template } from "lodash";
import Source from "../../general/Source";
import IOracleData from "../interfaces/IOracleData";
import IOracle from "../interfaces/IOracle";
import OracleContent from "./OracleContent";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import OracleTableRow from "./OracleTableRow";
import OracleUsage from "./OracleUsage";
import buildOracleId from "../../../utilities/buildOracleId";
import OracleInfoDisplay from "./OracleInfoDisplay";
import ITableDisplay from "../interfaces/IOracleDisplay";
import IOracleInfo from '../interfaces/IOracleInfo';
import IOracleInfoData from '../interfaces/IOracleInfoData';
import IRowData, { IRowRollData } from '../interfaces/IRowData';
import IAttributeOptions from '../../gameobjects/IAttributeOptions';
import Requirements from '../../general/Requirements';
import IOracleUsageData from '../interfaces/IOracleUsageData';
import buildTemplateTable from '../../../utilities/buildTemplateTable';
import propagateObject from '../../../utilities/propagateObject';
import IOracleCategoryData from '../interfaces/IOracleCategoryData';


/**
 * Represents an Oracle, including associated metadata in addition to tables (as opposed to a Table, which contains only the table data).
 *
 * @class

 */
export default class OracleInfo implements IOracleInfo {
  $id: OracleTableId;
  "Name": string;
  Aliases?: string[] | undefined;
  "Member of"?: OracleTableId | undefined;
  Category: OracleCategoryId;
  Description?: string | undefined;
  Source: Source;
  Display: OracleInfoDisplay;
  Usage?: OracleUsage | undefined;
  Content?: OracleContent | undefined;
  Table?: OracleTableRow[] | undefined;
  Oracles?: OracleInfo[] | undefined;
  constructor(
    json: IOracleInfoData,
    category: OracleCategoryId,
    memberOf?: OracleTableId,
    ...ancestorsJson: (IOracleInfoData | IOracleCategoryData)[]
    // ancestors should be in ascending order
  ) {
    // if (!is<IOracleInfoData>(json)) {
    //   throw new Error("json does not conform to IOracleInfoData!");
    // }
    this.$id = buildOracleId(json, ...ancestorsJson) as OracleTableId;
    console.info(
      `[OracleInfo] Building ${json.Oracles ? "group " : json._templateTable ? "from template " : ""}${this.$id}...`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this["Member of"] = memberOf ?? undefined;
    this.Category = category;

    this.Description = json.Description;
    this.Source = new Source(json.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Display = new OracleInfoDisplay((json.Display ?? {}) as Partial<ITableDisplay>, this.Name, this.$id);
    if (json.Usage) {
      this.Usage = new OracleUsage(json.Usage);
    }
    if (json.Content) {
      this.Content = new OracleContent(json.Content);
    }
    let tableData
    if (json._templateTable) {
      tableData = buildTemplateTable(json._templateTable);
    } else {
      tableData = json.Table as IRowData[];
    }
    if (tableData) {
      this.Table = tableData.map(row => {
        let newRow = new OracleTableRow(this.$id, row);
        if (this.Usage?.Requires?.Attributes && newRow["Game objects"]) {
          newRow["Game objects"].forEach(gameObject => {
            let attrToMerge = { Attributes: this.Usage?.Requires?.Attributes as IAttributeOptions[] };
            if (!gameObject.Requires) {
              gameObject.Requires = {} as Requirements;
            }
            propagateObject(attrToMerge, "Attributes", gameObject.Requires);
          });
        }
        return newRow;
      });
    }
    if (json.Oracles) {
      this.Oracles = json.Oracles.map(oracleInfo => {
        if (this.Usage) {
          propagateObject(this.Usage, "Usage", oracleInfo);
        }
        if (this.Content) {
          propagateObject(this.Content, "Content", oracleInfo);
        }
        return new OracleInfo(oracleInfo, this.Category, this.$id, json, ...ancestorsJson)
      });
    }
  }
}
