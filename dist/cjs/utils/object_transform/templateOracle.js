"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateOracle = void 0;
const buildLog_js_1 = require("../logging/buildLog.js");
const replaceInAllStrings_js_1 = require("./replaceInAllStrings.js");
const lodash_es_1 = __importDefault(require("lodash-es"));
/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
function templateOracle(json, template) {
    // buildLog(templateOracle, "Building oracle from template...");
    let jsonClone = lodash_es_1.default.cloneDeep(json);
    const templateClone = lodash_es_1.default.cloneDeep(template);
    jsonClone = lodash_es_1.default.merge(templateClone, jsonClone);
    if (jsonClone._templateVars) {
        lodash_es_1.default.forEach(jsonClone._templateVars, (replaceValue, key) => {
            const searchValue = "${{" + key + "}}";
            (0, buildLog_js_1.buildLog)(templateOracle, `Replacing "${searchValue}" with "${replaceValue}"`);
            jsonClone = (0, replaceInAllStrings_js_1.replaceInAllStrings)(jsonClone, searchValue, replaceValue);
        });
        return jsonClone;
    }
    return jsonClone;
}
exports.templateOracle = templateOracle;
//# sourceMappingURL=templateOracle.js.map