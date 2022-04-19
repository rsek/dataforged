"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayTable = void 0;
const index_js_1 = require("../index.js");
const getNameFromId_js_1 = require("../../utils/getNameFromId.js");
const badJsonError_js_1 = require("../../utils/logging/badJsonError.js");
/**
 * @internal
 */
class DisplayTable {
    constructor(json, parentId) {
        if (json["Result columns"]) {
            const resultColData = json["Result columns"];
            if (resultColData.length > 1) {
                resultColData.forEach(col => {
                    if (!col.Label) {
                        if (!col["Use content from"]) {
                            throw (0, badJsonError_js_1.badJsonError)(this.constructor, json["Result columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
                        }
                        col.Label = (0, getNameFromId_js_1.getNameFromId)((col["Use content from"]));
                    }
                });
            }
            this["Result columns"] = resultColData.map(col => { var _a, _b, _c; return new index_js_1.TextColumn(((_a = col["Use content from"]) !== null && _a !== void 0 ? _a : parentId), (_b = col.Label) !== null && _b !== void 0 ? _b : undefined, (_c = col.Key) !== null && _c !== void 0 ? _c : "Result"); });
        }
        else {
            this["Result columns"] = [new index_js_1.TextColumn(parentId)];
        }
        if (json["Roll columns"]) {
            const rollColData = json["Roll columns"];
            if (rollColData.length > 1) {
                rollColData.forEach(col => {
                    if (!col.Label) {
                        if (!col["Use content from"]) {
                            throw (0, badJsonError_js_1.badJsonError)(this.constructor, json["Roll columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
                        }
                        col.Label = (0, getNameFromId_js_1.getNameFromId)((col["Use content from"]));
                    }
                });
            }
            this["Roll columns"] = rollColData.map(col => { var _a, _b; return new index_js_1.RollColumn(((_a = col["Use content from"]) !== null && _a !== void 0 ? _a : parentId), (_b = col.Label) !== null && _b !== void 0 ? _b : undefined); });
        }
        else {
            this["Roll columns"] = [new index_js_1.RollColumn(parentId)];
        }
    }
}
exports.DisplayTable = DisplayTable;
//# sourceMappingURL=DisplayTable.js.map