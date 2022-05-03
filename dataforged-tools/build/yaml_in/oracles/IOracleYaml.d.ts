import type { IDisplayOracle, IOracle, IOracleCategory, IRow } from "../../json_out/index.js";
import type { IRequirementsYaml } from "../common/IRequirementsYaml.js";
import type { ITableDisplayInfoYaml, YamlStub } from "../index.js";
import type { IOracleUsageYaml } from "./IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "./IRowYaml.js";
import type { ITemplateOracleYaml } from "../templates/ITemplateOracleYaml.js";
import type { ITemplateTable } from "../templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "../templates/ITemplateYamlBase.js";
/**
 * @internal
 */
export interface IOracleYaml extends ITemplateYamlBase, YamlStub<IOracle, "Category", "Oracles" | "Table" | "Usage" | "Display"> {
    Usage?: IOracleUsageYaml | undefined;
    Oracles?: IOracleYaml[] | undefined;
    Requires?: IRequirementsYaml | undefined;
    Display?: IOracleDisplayYaml | undefined;
    Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
    _templateInfo?: ITemplateOracleYaml | undefined;
    _templateTable?: ITemplateTable | undefined;
    _childOf?: IOracleCategory["$id"] | undefined;
    _parentOf?: string[] | undefined;
}
/**
 * @internal
 */
export interface IOracleDisplayYaml extends YamlStub<IDisplayOracle, "Title", "Table"> {
    Table?: ITableDisplayInfoYaml | undefined;
}
//# sourceMappingURL=IOracleYaml.d.ts.map