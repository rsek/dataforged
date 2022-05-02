import type { IDisplayTable, IDisplayWithTitle, IOracle } from "../index.js";
/**
 * Information on displaying Oracles, including their table(s) are rendered in the original text. Useful if you want your project's rendering of the tables to correspond with the book.
 * @public
 */
export interface ITableDisplay extends IDisplayWithTitle {
    Title: string;
    /**
     * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
     *
     * If `undefined`, this table is rendered as a standalone table.
     *
     * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
     */
    "Column of"?: IOracle["$id"] | undefined;
    /**
     * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
     *
     * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
     */
    Table: IDisplayTable;
}
//# sourceMappingURL=IOracleDisplay.d.ts.map