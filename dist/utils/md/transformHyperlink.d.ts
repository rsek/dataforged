import type { OracleCategory } from "../../../dist/classes/oracles/OracleCategory.js";
import type { MdString } from "../../../dist/json_out/index.js";
export declare function transformMoveLinks(md: MdString, localLinks?: boolean, pathPrefix?: string): string;
export declare function transformOracleLinks(data: OracleCategory[], md: MdString, currentFile: `${string}.md`): string;
//# sourceMappingURL=transformHyperlink.d.ts.map