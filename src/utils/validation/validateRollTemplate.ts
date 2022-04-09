import type { IHasRollTemplate, MdString, OracleTableId, RollTemplate, RollTemplateString } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import _ from "lodash-es";
import { TypedRegEx } from "typed-regex";
import { is } from "typescript-is";

// eslint-disable-next-line no-useless-escape
const rollTplPattern = TypedRegEx("\$\{\{(?<id>.*?)\}\}", "g");

/**
 * It validates that the RollTemplate object has the same keys as the parent object, and validates each individual roll template string.
 * @param parent - The parent object that the template is being validated against.
 * @param templateObj - RollTemplate<T>
 * @returns The original object as the validated type.
 */
export function validateRollTemplate<T extends IHasRollTemplate<string>>(parent: T, templateObj: RollTemplate<string & keyof T>) {
  // FIXME: smarted subtable template handling.
  _.forEach(templateObj, (rollTplData, key) => {
    if (!parent[key as keyof T]) {
      // console.info(parent);
      throw badJsonError(validateRollTemplate, templateObj, `RollTemplate key '${key}' doesn't exist on its parent object. This is necessary so that a placeholder string is provided.`);
    }
    if (rollTplData) {
      // console.log("validating template data", rollTplData);
      _.forEach(rollTplData, (v, k) =>{
        // console.log("validating string", v);
        validateRollTemplateString(v);
      });
    }
  });
  return templateObj;
}

/**
 * It takes a string and returns true if it's a valid roll template string
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is valid.
 */
export function validateRollTemplateString(str: MdString) {
  if (typeof str !== "string") {
    throw badJsonError(validateRollTemplateString, str, "Expected a string");
  }
  const captures = _.compact(rollTplPattern.captureAll(str).map(capture => capture?.id));
  captures.forEach(capture => {
    if (!is<OracleTableId>(capture)) {
      throw badJsonError(validateRollTemplateString, capture, "Doesn't appear to be a valid OracleTableId");
    }
  });
  return str as RollTemplateString;
}