import type { OracleCategory } from "../../classes/index.js";
/**
 * It replaces all the links to the moves.md file with the correct link.
 * @param md - The markdown string to be transformed.
 * @param localLinks - If true, the links will be relative to the current file.
 * @returns The original string with the links replaced.
 */
export declare function transformMoveLinks(md: string, localLinks?: boolean, pathPrefix?: string): string;
/**
 * It replaces all the links in the markdown with the replacement string.
 * @param md - The markdown string to be transformed.
 * @returns The original string with the links transformed.
 */
export declare function transformOracleLinks(data: OracleCategory[], md: string, currentFile: `${string}.md`): string;
//# sourceMappingURL=transformHyperlink.d.ts.map