
import type IOracleUsageYaml from "./IOracleUsageYaml.js";
import type IDisplay from "../../../general/IDisplay.js";
import type ISource from "../../../general/interfaces/ISource.js";
import type IRules from "../../../general/IRules.js";
import type { ParagraphsString } from "../../../general/StringTypes.js";
import type OracleCategoryId from "../../OracleCategoryId.js";
import type OracleTableId from "../../OracleTableId.js";
import type IOracleContent from "../IOracleContent.js";

export default interface IOracleYamlBase extends IRules {
  $id?: OracleTableId | OracleCategoryId | undefined;
  Name: string;
  Aliases?: string[] | undefined;
  Category?: OracleCategoryId | undefined;
  "Member of"?: OracleTableId | undefined;
  Description?: ParagraphsString | undefined;
  Source?: ISource | undefined;
  Display?: IDisplay | undefined;
  Usage?: IOracleUsageYaml | undefined;
  Content?: IOracleContent | undefined;
}

