import type { IOracle, IOracleContent, IRow, ITableDisplay, OracleCategoryId, OracleTableId } from "../../json_out/index.js";
import type { IRequirementsYaml } from "../common/IRequirementsYaml.js";
import type { IOracleUsageYaml } from "./IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "./IRowYaml.js";
import type { ITemplateOracleYaml } from "../templates/ITemplateOracleYaml.js";
import type { ITemplateTable } from "../templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "../templates/ITemplateYamlBase.js";
export interface IOracleYaml extends ITemplateYamlBase, Omit<Partial<IOracle>, "Oracles" | "Table" | "Usage"> {
    Name: string;
    Usage?: IOracleUsageYaml | undefined;
    Oracles?: IOracleYaml[] | undefined;
    Requires?: IRequirementsYaml | undefined;
    $id?: OracleTableId;
    Category: OracleCategoryId;
    "Member of"?: IOracle["$id"] | undefined;
    Description?: string | undefined;
    Content?: IOracleContent | undefined;
    Display?: ITableDisplay | undefined;
    Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
    _templateInfo?: ITemplateOracleYaml | undefined;
    _templateTable?: ITemplateTable | undefined;
    _childOf?: OracleCategoryId | undefined;
    _parentOf?: string[] | undefined;
}
//# sourceMappingURL=IOracleYaml.d.ts.map