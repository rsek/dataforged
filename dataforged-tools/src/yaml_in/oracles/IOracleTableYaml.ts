import type { IOracleMatch, IOracleSet , IOracleTable, IRow } from "@json_out/index.js";
import type { IRequirementsYaml } from "@yaml_in/common/IRequirementsYaml.js";
import type { YamlStubTitle } from "@yaml_in/index.js";
import type { IOracleTableDisplayYaml } from "@yaml_in/oracles/IOracleDisplayYaml.js";
import type { IOracleUsageYaml } from "@yaml_in/oracles/IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "@yaml_in/oracles/IRowYaml.js";
import type { ITemplateOracleTableYaml } from "@yaml_in/templates/ITemplateOracleTableYaml.js";
import type { ITemplateTable } from "@yaml_in/templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "@yaml_in/templates/ITemplateYamlBase.js";

/**
 * @internal
 */
export interface IOracleTableYaml extends ITemplateYamlBase, YamlStubTitle<IOracleTable, "", "Tables"|"Table"|"Usage"|"Display"|"On a Match"> {
  Usage?: IOracleUsageYaml | undefined;
  Requires?: IRequirementsYaml | undefined;
  Display?: IOracleTableDisplayYaml | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  "On a Match"?: Omit<IOracleMatch, "$id">;
  _templateOracleTable?: ITemplateOracleTableYaml | undefined;
  _templateTableRows?: ITemplateTable | undefined;
  _childOf?: IOracleSet["$id"] | undefined;
}