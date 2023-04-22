/**
 * @internal
 */
export class TextColumn {
    Label;
    ["Use content from"];
    Key;
    constructor(content, label = "Result", key = "Result") {
        this.Label = label;
        this["Use content from"] = content;
        this.Key = key;
    }
}
/**
 * @internal
 */
export class RollColumn {
    Label = "Roll";
    ["Use content from"];
    constructor(content, label = "Roll") {
        this.Label = label;
        this["Use content from"] = content;
    }
}
//# sourceMappingURL=TableColumn.js.map