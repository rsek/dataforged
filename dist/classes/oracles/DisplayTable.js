import { ResultColumn, RollColumn } from "../index.js";
import { getNameFromId } from "../../utils/getNameFromId.js";
import { badJsonError } from "../../utils/logging/badJsonError.js";
export class DisplayTable {
    constructor(json, parentId) {
        if (json["Result columns"]) {
            const resultColData = json["Result columns"];
            if (resultColData.length > 1) {
                resultColData.forEach(col => {
                    if (!col.Label) {
                        if (!col["Use content from"]) {
                            throw badJsonError(this.constructor, json["Result columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
                        }
                        col.Label = getNameFromId(col["Use content from"]);
                    }
                });
            }
            this["Result columns"] = resultColData.map(col => { var _a, _b, _c; return new ResultColumn((_a = col["Use content from"]) !== null && _a !== void 0 ? _a : parentId, (_b = col.Label) !== null && _b !== void 0 ? _b : undefined, (_c = col.Key) !== null && _c !== void 0 ? _c : "Result"); });
        }
        else {
            this["Result columns"] = [new ResultColumn(parentId)];
        }
        if (json["Roll columns"]) {
            const rollColData = json["Roll columns"];
            if (rollColData.length > 1) {
                rollColData.forEach(col => {
                    if (!col.Label) {
                        if (!col["Use content from"]) {
                            throw badJsonError(this.constructor, json["Roll columns"], "There are multiple result columns, but one is missing both Label and Content - Label could not be inferred.");
                        }
                        col.Label = getNameFromId(col["Use content from"]);
                    }
                });
            }
            this["Roll columns"] = rollColData.map(col => { var _a, _b; return new RollColumn((_a = col["Use content from"]) !== null && _a !== void 0 ? _a : parentId, (_b = col.Label) !== null && _b !== void 0 ? _b : undefined); });
        }
        else {
            this["Roll columns"] = [new RollColumn(parentId)];
        }
    }
}
//# sourceMappingURL=DisplayTable.js.map