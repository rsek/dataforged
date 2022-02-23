import t from 'ts-runtime/lib';

import _ from "lodash";
import Source from "../../general/Source";
import IOracleData from "../interfaces/IOracleData";
import IOracle from "../interfaces/IOracle";
import OracleContent from "./OracleContent";
import OracleCategoryId from "../OracleCategoryId";
import OracleTableId from "../OracleTableId";
import OracleTableRow from "./OracleTableRow";
import OracleUsage from "./OracleUsage";
import { isOracles, isOracleTable, isOracleUsage } from "../../typeguards";
import buildOracleId from "../../../utilities/buildOracleId";
import OracleInfoDisplay from "./OracleInfoDisplay";
import ITableDisplay from "../interfaces/IOracleDisplay";
import IOracleInfo from '../interfaces/IOracleInfo';
import IOracleInfoData from '../interfaces/IOracleInfoData';
import IRowData, { IRowRollData } from '../interfaces/IRowData';
import propagateObject from '../../utils/propagateObject';
import IAttributeOptions from '../../gameobjects/IAttributeOptions';
import Requirements from '../../general/Requirements';


/**
 * Represents an Oracle, including associated metadata in addition to tables (as opposed to a Table, which contains only the table data).
 *
 * @class

 */
export default class OracleInfo implements IOracleInfo, IOracle {
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
    ...ancestorsJson: IOracleData[]
    // ancestors should be in ascending order
  ) {
    this.$id = buildOracleId(json, ...ancestorsJson) as OracleTableId;
    console.info(
      `[OracleInfo.constructor] Building ${json.Oracles ? "group " : json._template ? "from template " : ""}${this.$id}...`);
    this.Name = json.Name;
    this.Aliases = json.Aliases;
    this["Member of"] = memberOf ?? undefined;
    this.Category = category;

    this.Description = json.Description;
    this.Source = new Source(json.Source, ..._.compact(ancestorsJson.map(item => item.Source)));
    this.Display = new OracleInfoDisplay((json.Display ?? {}) as Partial<ITableDisplay>, this.Name, this.$id);
    if (json.Usage) {
      this.Usage = isOracleUsage(json.Usage) ? new OracleUsage(json.Usage) : undefined;
    }
    if (json.Content) {
      this.Content = new OracleContent(json.Content);
    }
    if (json.Table && isOracleTable(json.Table as IRowData[])) {
      let tableData = json.Table as IRowData[];
      if (json._template) {
        const newRanges = tableData.reverse() as IRowRollData[];
        // reverses both arrays because SF's convention is for the bottom of tables to match (see planetside peril/opportunity for an example)
        const templateData = json._template.map(row => {
          row[0] = 0;
          row[1] = 0;
          return row;
        }).reverse();
        newRanges.forEach((newRow, index) => {
          const templateRow = templateData[index];
          if (!templateRow) {
            throw new Error("Ran out of rows when templating table.");
          }
          templateRow[0] = newRow[0];
          templateRow[1] = newRow[1];
        });
        // tableData = templateData.filter(row => row[0] != 0 && row[1] != 0).reverse();
        tableData = templateData.reverse();
      }
      this.Table = tableData.map(row => {
        let newRow = new OracleTableRow(this.$id, ...row);
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
      this.Oracles = isOracles(json.Oracles) ? json.Oracles.map(oracleInfo => {
        if (this.Usage) {
          propagateObject(this.Usage, "Usage", oracleInfo);
        }
        if (this.Content) {
          propagateObject(this.Content, "Content", oracleInfo);
        }
        return new OracleInfo(oracleInfo, this.Category, this.$id, json, ...ancestorsJson)
      }) : undefined;
    }
  }
}
