import { badJsonError } from "../logging/badJsonError.js";
import _ from "lodash-es";
import { TypedRegEx } from "typed-regex";
import { is } from "typescript-is";
const rollTplPattern = TypedRegEx("\$\{\{(?<id>.*?)\}\}", "g");
export function validateRollTemplate(parent, templateObj) {
    _.forEach(templateObj, (rollTplData, key) => {
        if (!parent[key]) {
            throw badJsonError(validateRollTemplate, templateObj, `RollTemplate key '${key}' doesn't exist on its parent object. This is necessary so that a placeholder string is provided.`);
        }
        if (rollTplData) {
            _.forEach(rollTplData, (v, k) => {
                validateRollTemplateString(v);
            });
        }
    });
    return templateObj;
}
export function validateRollTemplateString(str) {
    if (typeof str !== "string") {
        throw badJsonError(validateRollTemplateString, str, "Expected a string");
    }
    const captures = _.compact(rollTplPattern.captureAll(str).map(capture => capture?.id));
    captures.forEach(capture => {
        if (!is(capture)) {
            throw badJsonError(validateRollTemplateString, capture, "Doesn't appear to be a valid OracleTableId");
        }
    });
    return str;
}
//# sourceMappingURL=validateRollTemplate.js.map