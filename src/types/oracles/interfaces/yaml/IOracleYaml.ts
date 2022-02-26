import ISource from "../../../general/interfaces/ISource";
import OracleCategoryId from "../../OracleCategoryId";
import OracleTableId from "../../OracleTableId";
import IOracleYamlBase from "./IOracleYamlBase";
import IOracleContent from "../IOracleContent";
import ITableDisplay from "../IOracleDisplay";
import IRow from "../IRow";
import IRowYaml, { IRowRollYaml } from "./IRowYaml";
import IOracleUsageYaml from "./IOracleUsageYaml";
import ITemplateTable from "./ITemplateTableYaml";
import ITemplateYamlBase from "./ITemplateYamlBase";
import ITemplateOracleYaml from "./ITemplateOracleYaml";
import IRequirementsData from "../../../general/interfaces/IRequirementsData";

export default interface IOracleYaml extends IOracleYamlBase, ITemplateYamlBase {

  $id?: OracleTableId;
  Category: OracleCategoryId;
  "Member of"?: OracleTableId | undefined;
  Description?: string | undefined;
  Source: ISource;
  Usage?: IOracleUsageYaml | undefined;
  Content?: IOracleContent | undefined;
  Display?: ITableDisplay | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  Requires?: IRequirementsData | undefined;
  _templateInfo?: ITemplateOracleYaml | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: OracleCategoryId | undefined;
  _parentOf?: string[] | undefined;
}
