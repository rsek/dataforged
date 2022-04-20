/**
 * @internal
 */
export class TextColumn {
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
    constructor(content, label = "Roll") {
        this.Label = "Roll";
        this.Label = label;
        this["Use content from"] = content;
    }
}
