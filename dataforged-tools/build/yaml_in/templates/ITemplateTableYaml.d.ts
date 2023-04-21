import type { IRowContentYaml, IRowRollYaml } from "../index.js";
import type { IRowYaml } from "../oracles/IRowYaml.js";
/**
 * @internal
 */
export interface ITemplateTable {
    rolls: (IRowYaml | IRowRollYaml)[];
    content: (IRowYaml | IRowContentYaml | string)[];
}
//# sourceMappingURL=ITemplateTableYaml.d.ts.map