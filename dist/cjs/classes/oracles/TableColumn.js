"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollColumn = exports.TextColumn = void 0;
/**
 * @internal
 */
class TextColumn {
    constructor(content, label = "Result", key = "Result") {
        this.Label = label;
        this["Use content from"] = content;
        this.Key = key;
    }
}
exports.TextColumn = TextColumn;
/**
 * @internal
 */
class RollColumn {
    constructor(content, label = "Roll") {
        this.Label = "Roll";
        this.Label = label;
        this["Use content from"] = content;
    }
}
exports.RollColumn = RollColumn;
//# sourceMappingURL=TableColumn.js.map