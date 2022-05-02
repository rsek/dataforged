import type { IOracle, ITextColumn } from "../../json_out/index.js";
import type { IRollColumn } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class TextColumn implements ITextColumn {
    Label: ITextColumn["Label"];
    ["Use content from"]: ITextColumn["Use content from"];
    Key: ITextColumn["Key"];
    constructor(content: IOracle["$id"], label?: string, key?: ITextColumn["Key"]);
}
/**
 * @internal
 */
export declare class RollColumn implements IRollColumn {
    Label: string;
    ["Use content from"]: IOracle["$id"];
    constructor(content: IOracle["$id"], label?: string);
}
//# sourceMappingURL=TableColumn.d.ts.map