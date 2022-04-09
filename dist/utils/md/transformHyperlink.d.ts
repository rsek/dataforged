import type { OracleCategory } from "../../classes/index.js";
import type { MdString } from "../../json_out/index.js";
export declare function transformMoveLinks(md: MdString, localLinks?: boolean, pathPrefix?: string): string;
export declare function transformOracleLinks(data: OracleCategory[], md: MdString, currentFile: `${string}.md`): string;
//# sourceMappingURL=transformHyperlink.d.ts.map