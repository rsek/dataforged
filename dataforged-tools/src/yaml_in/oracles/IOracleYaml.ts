import type { IOracle, IOracleCategory , IOracleMatch, IRow } from "@json_out/index.js";
import type { IRequirementsYaml } from "@yaml_in/common/IRequirementsYaml.js";
import type { YamlStubTitle } from "@yaml_in/index.js";
import type { IOracleDisplayYaml } from "@yaml_in/oracles/IOracleDisplayYaml.js";
import type { IOracleUsageYaml } from "@yaml_in/oracles/IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "@yaml_in/oracles/IRowYaml.js";
import type { ITemplateOracleYaml } from "@yaml_in/templates/ITemplateOracleYaml.js";
import type { ITemplateTable } from "@yaml_in/templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "@yaml_in/templates/ITemplateYamlBase.js";

/**
 * @internal
 */
export interface IOracleYaml extends ITemplateYamlBase, YamlStubTitle<IOracle, "Category", "Oracles"|"Table"|"Usage"|"Display"|"On a Match"> {
  Usage?: IOracleUsageYaml | undefined;
  Oracles?: IOracleYaml[] | undefined;
  Requires?: IRequirementsYaml | undefined;
  Display?: IOracleDisplayYaml | undefined;
  Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
  "On a Match"?: Omit<IOracleMatch, "$id">;
  _templateInfo?: ITemplateOracleYaml | undefined;
  _templateTable?: ITemplateTable | undefined;
  _childOf?: IOracleCategory["$id"] | undefined;
  _parentOf?: string[] | undefined;
}