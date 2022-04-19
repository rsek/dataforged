"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeSetter = void 0;
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * @internal
 */
class AttributeSetter extends Array {
    constructor(json) {
        if (Object.values(json).some(item => Array.isArray(item) && item.length > 1)) {
            throw new Error("[AttributeSetter] attribute hash can't be converted to attribute setter if it contains arrays longer than 1");
        }
        const attributes = lodash_es_1.default.map(json, (value, key) => {
            let newValue;
            if (Array.isArray(value)) {
                newValue = value[0];
            }
            else {
                newValue = value;
            }
            return { Key: key, Value: newValue };
        });
        super(...attributes);
    }
}
exports.AttributeSetter = AttributeSetter;
//# sourceMappingURL=AttributeSetter.js.map