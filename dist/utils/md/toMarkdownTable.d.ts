import type { Row } from "../../../dist/classes/oracles/Row.js";
export declare function toSummaryColumnArray(label: string, rows: Row[], minimumRows: number): string[];
export declare function toResultColumnArray(label: string, rows: Row[], minimumRows: number): string[];
export declare function toRollColumnArray(label: string, rows: Row[], minimumRows: number): string[];
export declare function toMdTable(...columnArrays: string[][]): string;
//# sourceMappingURL=toMarkdownTable.d.ts.map