import type { IDisplay, IDisplayTable, OracleTableId } from "../index.js";
export interface ITableDisplay extends IDisplay {
    Title: string;
    "Column of"?: OracleTableId | undefined;
    Table: IDisplayTable;
}
//# sourceMappingURL=IOracleDisplay.d.ts.map