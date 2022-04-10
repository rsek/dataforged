import type { IHasRollTemplate, MdString, RollTemplate, RollTemplateString } from "../../json_out/index.js";
/**
 * It validates that the RollTemplate object has the same keys as the parent object, and validates each individual roll template string.
 * @param parent - The parent object that the template is being validated against.
 * @param templateObj - RollTemplate<T>
 * @returns The original object as the validated type.
 */
export declare function validateRollTemplate<T extends IHasRollTemplate<string>>(parent: T, templateObj: RollTemplate<string & keyof T>): RollTemplate<string & keyof T>;
/**
 * It takes a string and returns true if it's a valid roll template string
 * @param str - The string to validate.
 * @returns A boolean indicating whether the string is valid.
 */
export declare function validateRollTemplateString(str: MdString): RollTemplateString;
//# sourceMappingURL=validateRollTemplate.d.ts.map