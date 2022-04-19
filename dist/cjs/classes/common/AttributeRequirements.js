"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeRequirements = void 0;
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class AttributeRequirements extends Array {
    constructor(json) {
        super();
        lodash_es_1.default.forEach(json, (value, key) => {
            let values;
            if (Array.isArray(value)) {
                values = value;
            }
            else if (value !== null) {
                values = [value];
            }
            const Key = key;
            const Values = values;
            this.push({ Key, Values });
        });
    }
}
exports.AttributeRequirements = AttributeRequirements;
//# sourceMappingURL=AttributeRequirements.js.map