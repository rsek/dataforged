import { ISource, Source } from "../generic/Source";
import { IOracleContent } from "./OracleContent";
import { IOracleDisplay } from "./OracleDisplay";
import { OracleTableId, OracleCategoryId } from "./OracleId";
import { IOracleUsage } from "./OracleUsage";


export default interface IOracleData {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: string | undefined;
  Source?: ISource | undefined;
  Display?: IOracleDisplay | undefined;
  Usage?: IOracleUsage | undefined;
  Content?: IOracleContent | undefined;
}
export interface IOracle extends IOracleData {
  $id: OracleTableId | OracleCategoryId;
  Source: Source;
}
