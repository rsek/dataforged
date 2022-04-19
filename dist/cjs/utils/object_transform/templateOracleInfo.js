"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateOracleInfo = void 0;
const replaceInAllStrings_js_1 = require("./replaceInAllStrings.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * Builds Oracle metadata from a template, replacing template string values where appropriate.
 * @param json - The object to be mutated.
 * @returns The original object with the template info removed.
 */
function templateOracleInfo(json) {
    // cloning so that the original object isn't mutated
    let jsonClone = lodash_es_1.default.cloneDeep(json);
    if (jsonClone._templateInfo) {
        jsonClone = lodash_es_1.default.merge(jsonClone._templateInfo, jsonClone);
        if (jsonClone._templateVars) {
            const templateVars = lodash_es_1.default.cloneDeep(jsonClone._templateVars);
            lodash_es_1.default.forEach(templateVars, (replaceValue, key) => {
                const searchValue = "${{" + key + "}}";
                jsonClone = (0, replaceInAllStrings_js_1.replaceInAllStrings)(jsonClone, searchValue, replaceValue);
            });
            delete jsonClone._templateInfo;
        }
    }
    return jsonClone;
}
exports.templateOracleInfo = templateOracleInfo;
//# sourceMappingURL=templateOracleInfo.js.map