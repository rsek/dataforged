import type IOracleUsageYaml from "./IOracleUsageYaml.js";
import type IOracleYamlBase from "./IOracleYamlBase.js";
import type { IRowRollYaml } from "./IRowYaml.js";
import type IRowYaml from "./IRowYaml.js";
import type ITemplateOracleYaml from "./ITemplateOracleYaml.js";
import type ITemplateTable from "./ITemplateTableYaml.js";
import type ITemplateYamlBase from "./ITemplateYamlBase.js";
import type IRequirementsYaml from "../../../general/interfaces/IRequirementsYaml.js";
import type ISource from "../../../general/interfaces/ISource.js";
import type { ParagraphsString } from "../../../general/StringTypes.js";
import type OracleCategoryId from "../../OracleCategoryId.js";
import type OracleTableId from "../../OracleTableId.js";
import type IOracleContent from "../IOracleContent.js";
import type ITableDisplay from "../IOracleDisplay.js";
import type IRow from "../IRow.js";

export default interface IOracleYaml extends IOracleYamlBase, ITemplateYamlBase {

  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: ParagraphsString | undefined;
  Source: ISource;
  Usage?: IOracleUsageYaml | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  Requires?: IRequirementsYaml | undefined;
  _templateInfo?: ITemplateOracleYaml | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
