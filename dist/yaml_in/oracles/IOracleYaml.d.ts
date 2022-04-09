import type { IOracle, IOracleContent, IRow, ITableDisplay, OracleCategoryId, OracleTableId, ParagraphsString } from "@dataforged/json_out/index.js";
import type { IRequirementsYaml } from "../../../dist/yaml_in/common/IRequirementsYaml.js";
import type { IOracleUsageYaml } from "../../../dist/yaml_in/oracles/IOracleUsageYaml.js";
import type { IRowRollYaml, IRowYaml } from "../../../dist/yaml_in/oracles/IRowYaml.js";
import type { ITemplateOracleYaml } from "../../../dist/yaml_in/templates/ITemplateOracleYaml.js";
import type { ITemplateTable } from "../../../dist/yaml_in/templates/ITemplateTableYaml.js";
import type { ITemplateYamlBase } from "../../../dist/yaml_in/templates/ITemplateYamlBase.js";
export interface IOracleYaml extends ITemplateYamlBase, Omit<Partial<IOracle>, "Oracles" | "Table" | "Usage"> {
    Name: string;
    Usage?: IOracleUsageYaml | undefined;
    Oracles?: IOracleYaml[] | undefined;
    Requires?: IRequirementsYaml | undefined;
    $id?: OracleTableId;
    Category: OracleCategoryId;
    "Member of"?: OracleTableId | undefined;
    Description?: ParagraphsString | undefined;
    Content?: IOracleContent | undefined;
    Display?: ITableDisplay | undefined;
    Table?: IRowYaml[] | IRowRollYaml[] | IRow[] | undefined;
    _templateInfo?: ITemplateOracleYaml | undefined;
    _templateTable?: ITemplateTable | undefined;
    _childOf?: OracleCategoryId | undefined;
    _parentOf?: string[] | undefined;
}
//# sourceMappingURL=IOracleYaml.d.ts.map