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
import Requirements from '../../general/Requirements';
import IOracleUsageData from '../interfaces/IOracleUsageData';
import buildTemplateTable from '../../../utilities/buildTemplateTable';
import propagateObject from '../../../utilities/propagateObject';
import IOracleCategoryData from '../interfaces/IOracleCategoryData';
import buildLog from '../../../utilities/buildLog';
import buildFromTemplate from '../../../utilities/buildFromTemplate';


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
    let jsonClone = _.cloneDeep(json);
    if (jsonClone._templateInfo) {
      jsonClone = buildFromTemplate<IOracleInfoData>(jsonClone, jsonClone._templateInfo);
    }
    // if (!is<IOracleInfoData>(json)) {
    //   throw new Error("json does not conform to IOracleInfoData!");
    // }
    this.$id = buildOracleId(jsonClone, ...ancestorsJson) as OracleTableId;
    console.info(
      `[OracleInfo] Building ${this.$id}...`);
    this.Name = jsonClone.Name;
    this.Aliases = jsonClone.Aliases;
    this["Member of"] = memberOf ?? undefined;
    this.Category = category;

    this.Description = jsonClone.Description;
    this.Source = new Source(jsonClone.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Display = new OracleInfoDisplay((jsonClone.Display ?? {}) as Partial<ITableDisplay>, this.Name, this.$id);
    if (jsonClone.Usage) {
      this.Usage = new OracleUsage(jsonClone.Usage);
    }
    if (jsonClone.Content) {
      this.Content = new OracleContent(jsonClone.Content);
    }
    let tableData
    if (jsonClone._templateTable) {
      tableData = buildTemplateTable(jsonClone._templateTable);
    } else {
      tableData = jsonClone.Table as IRowData[];
    }
    if (tableData) {
      this.Table = tableData.map(row => {
        let newRow = new OracleTableRow(this.$id, row);
        // TODO: propagate requirements to child objects
        return newRow;
      });
    }
    if (jsonClone.Oracles) {
      this.Oracles = jsonClone.Oracles.map(oracleInfo => {
        // if (this.Usage) {
        //   propagateObject(this.Usage, "Usage", oracleInfo);
        // }
        // if (this.Content) {
        //   propagateObject(this.Content, "Content", oracleInfo);
        // }
        return new OracleInfo(oracleInfo, this.Category, this.$id, jsonClone, ...ancestorsJson)
      });
    }
  }
}
