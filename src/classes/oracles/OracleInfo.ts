

import _ from "lodash";
import { ISource, Source } from "../general/Source";
import IOracleData, { IOracle } from "./IOracle";
import { IOracleContent, OracleContent } from "./OracleContent";
import { IOracleDisplay, OracleTableDisplay } from "./OracleDisplay";
import { OracleCategoryId, OracleTableId } from "./OracleId";
import { IRowData, IRowRollData, OracleTableRow } from "./OracleTableRow";
import { IOracleUsage, OracleUsage } from "./OracleUsage";
import { isOracles, isOracleTable, isOracleUsage } from "../typeguards";
import buildOracleId from "../../utilities/buildOracleId";

export interface IOracleInfo extends IOracleData {
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: string | undefined;
  Source: ISource;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
  Display?: IOracleDisplay | undefined;
  Oracles?: IOracleInfo[] | undefined;
  Table?: IRowData[] | IRowRollData[] | OracleTableRow[] | undefined;
}

export interface IOracleInfoData extends IOracleInfo {
  Table?: IRowData[] | IRowRollData[] | undefined;
  Oracles?: IOracleInfoData[] | undefined;
  _template?: IRowData[] | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
/**
 * Represents an Oracle, including associated metadata in addition to tables (as opposed to a Table, which contains only the table data).
 *
 * @class

 */
export class OracleInfo implements IOracleInfo, IOracle {
  $id: OracleTableId;
  "Name": string;
  Aliases?: string[] | undefined;
  "Member of"?: OracleTableId | undefined;
  Category: OracleCategoryId;
  Description?: string | undefined;
  Source: Source;
  Display: OracleTableDisplay;
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
    this.Source = new Source(json.Source, ...ancestorsJson);
    this.Display = new OracleTableDisplay(json);
    if (json.Usage) {
      this.Usage = isOracleUsage(json.Usage) ? new OracleUsage(json.Usage) : undefined;
    }
    if (json.Content) {
      this.Content = new OracleContent(json.Content);
    }
    if (json.Table && isOracleTable(json.Table)) {
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
        tableData = templateData.filter(row => row[0] != 0 && row[1] != 0);
      }
      this.Table = tableData.map(row => new OracleTableRow(this.$id, ...row));
    }

    if (this.Table?.find(row => row.Summary) && this.Display["Column labels"].length < 3) {
      this.Display["Column labels"].push("Summary");
    }

    if (json.Oracles) {
      // cascades Content data to subtables
      if (json.Content) {
        json.Oracles = json.Oracles.map(oracleInfo => {
          const override = oracleInfo.Content ?? {};
          const newContent = _.merge(json.Content, override)
          oracleInfo.Content = newContent;
          return oracleInfo;
        });
        delete json.Content;
      }

      this.Oracles = isOracles(json.Oracles) ? json.Oracles.map(info => new OracleInfo(info, this.Category, this.$id, json, ...ancestorsJson)) : undefined;
    }
  }
}
