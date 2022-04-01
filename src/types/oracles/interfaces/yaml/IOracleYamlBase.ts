
import type IOracleUsageYaml from "./IOracleUsageYaml.js";
import type IDisplay from "../../../general/IDisplay.js";
import type ISource from "../../../general/interfaces/ISource.js";
import type MdString from "../../../general/MdString.js";
import type OracleCategoryId from "../../OracleCategoryId.js";
import type OracleTableId from "../../OracleTableId.js";
import type IOracleContent from "../IOracleContent.js";

export default interface IOracleYamlBase {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: MdString | undefined;
  Source?: ISource | undefined;
  Display?: IDisplay | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Content?: IOracleContent | undefined;
}

